import * as bcrypt from 'bcrypt';
import * as Express from 'express';
import * as jwt from 'jsonwebtoken';

import ErrorHandler from "../models/ErrorHandler";
import { verifyTokenAndGetEmail } from '../lib/auth';


export class AuthController {
  private _pool: any;

  constructor(pool: any) {
    this._pool = pool;
  }

  defaultMethod() {
    throw new ErrorHandler(501, 'Not implemented method');
  }

  public hello(req: Express.Request, res: Express.Response) {
    res.json("Welcome!");
  }

  public async whoami(req: Express.Request, res: Express.Response) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      res.status(401).json({ message: 'missing token' });
      return;
    }
    const token = authHeader.split(' ')[1];
    if (!token || token === 'null') {
      res.status(401).json({ message: 'missing token' });
      return;
    }
    try {
      const user = await verifyTokenAndGetEmail(token, this._pool);
      res.status(200).json(user);
      return;
    } catch (err) {
      res.status(401).json({ message: 'invalid token' });
      return;
    }
  }

  public login(req: Express.Request, res: Express.Response) {
    const { username, password } = req.body;

    // Check if the user exists
    this._pool.query('SELECT id, password FROM auth.users WHERE email=$1', [username], (error, results) => {
      if (error) {
        res.status(400).json({ message: 'Error during sql query' })
        return;
      }
      if (results.rows.length === 0) {
        res.status(401).json({ message: 'User does not exist' })
        return;
      }

      // Check if the password is correct
      bcrypt.compare(password, results.rows[0].password, function (err, isMatch) {
        if (err) {
          res.status(400).json({ message: 'Error password checking' })
          return;
        }
        if (!isMatch) {
          res.status(401).json({ message: 'Invalid credentials' })
          return;
        }

        // Generate a jwt token
        const access_token = jwt.sign({ email: username }, process.env.JWT_SECRET, { expiresIn: '2d' });
        res.status(200).json({ access_token: access_token })
        return;
      });
    });
  }

  public register(req: Express.Request, res: Express.Response) {
    const { username, password } = req.body;
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) {
        throw new ErrorHandler(500, err);
      }

      this._pool.query('INSERT INTO auth.users (email, password, last_login) VALUES ($1, $2, NOW()) RETURNING id', [username, hash], (error, results) => {
        if (error) {
          throw error
        }
        res.status(200).json({ message: 'success' })
        return;
      })
    });
  }
}