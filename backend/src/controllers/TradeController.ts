import * as Express from 'express';

import ErrorHandler from "../models/ErrorHandler";
import { verifyTokenAndGetEmail } from '../lib/auth';


export class TradeController {
  private _pool: any;

  constructor(pool: any) {
    this._pool = pool;
  }

  defaultMethod() {
    throw new ErrorHandler(501, 'Not implemented method');
  }

  public async deposit(req: Express.Request, res: Express.Response) {
    const { value } = req.body;

    // Check if the user exists
    const token = req.headers.authorization?.split(' ')[1];
    const user = await verifyTokenAndGetEmail(token, this._pool);
    if (!user) {
      res.status(401).json({ message: 'invalid token' });
      return;
    }

    this._pool.query('INSERT INTO trade.deposits (user_id, amount) VALUES ($1, $2) RETURNING id', [user.user_id, value], (error, results) => {
      if (error) {
        throw error
      }
      res.status(200).json({ message: 'Deposit Successfull' })
      return;
    });
  }

  public async deposits(req: Express.Request, res: Express.Response) {
    // Check if the user exists
    const token = req.headers.authorization?.split(' ')[1];
    const user = await verifyTokenAndGetEmail(token, this._pool);

    if (!user) {
      res.status(401).json({ message: 'invalid token' });
      return;
    }

    const fixed_apr = 0.07;
    this._pool.query(`select id, ROUND(amount::NUMERIC, 2) as amount, created_at, ROUND((amount * (1 + (DATE_PART('day', NOW() - updated_at)) * $1 / 365))::NUMERIC, 2) as total_amount, ROUND((amount * DATE_PART('day', NOW() - updated_at) * $1 / 365)::NUMERIC, 2) as earnings from trade.deposits where user_id=$2 and amount!=0 order by created_at DESC`, [fixed_apr, user.user_id], (error, results) => {
      if (error) {
        throw error
      }
      res.status(200).json({ data: results.rows })
      return;
    });
  }

  public async lent(req: Express.Request, res: Express.Response) {
    const { value, duration, collateral } = req.body;

    // Check if the user exists
    const token = req.headers.authorization?.split(' ')[1];
    const user = await verifyTokenAndGetEmail(token, this._pool);
    if (!user) {
      res.status(401).json({ message: 'invalid token' });
      return;
    }

    // First Check if enough supply
    this._pool.query(`
    SELECT
      ROUND
        (
          (
            (select coalesce(SUM(amount), 0) as amount from trade.deposits)
            -
            (select coalesce(SUM(current_amount_wint), 0) as amount from trade.loans)
          )::NUMERIC, 2
        )
    as s`, [], (error, results) => {
      if (error) {
        throw error
      }

      if (+results.rows[0].s < +value) {
        res.status(400).json({ message: 'Not enough supply' });
        return;
      }

      const fixed_interest = 0.10;
      const current_lent_amount_wint = value * (1 + fixed_interest * duration / 12);
      this._pool.query(`INSERT INTO trade.loans (user_id, lent_amount_wint, current_amount_wint, lent_duration_month, collateral, created_at) VALUES ($1, $2, $2, $3, $4, NOW()) RETURNING id`, [user.user_id, current_lent_amount_wint, duration, collateral], (error, results) => {
        if (error) {
          throw error
        }
        res.status(200).json({ message: 'Lent Successfull' })
        return;
      });
      return;
    });
  }

  public async loans(req: Express.Request, res: Express.Response) {
    // Check if the user exists
    const token = req.headers.authorization?.split(' ')[1];
    const user = await verifyTokenAndGetEmail(token, this._pool);

    if (!user) {
      res.status(401).json({ message: 'invalid token' });
      return;
    }

    this._pool.query(`select * from trade.loans where user_id=$1 and current_amount_wint <> 0 order by created_at DESC`, [user.user_id], (error, results) => {
      if (error) {
        throw error
      }
      res.status(200).json({ data: results.rows })
      return;
    });
  }

  public async supply(req: Express.Request, res: Express.Response) {
    this._pool.query(`
      SELECT
        ROUND
          (
            (
              (select coalesce(SUM(amount), 0) as amount from trade.deposits)
              -
              (select coalesce(SUM(current_amount_wint), 0) as amount from trade.loans)
            )::NUMERIC, 2
          )
      as s`, [], (error, results) => {
      if (error) {
        throw error
      }
      res.status(200).json({ supply: results.rows[0].s })
      return;
    });
  }

  public async repay(req: Express.Request, res: Express.Response) {
    const { loan_id, value_dollar } = req.body;

    // Check if the user exists
    const token = req.headers.authorization?.split(' ')[1];
    const user = await verifyTokenAndGetEmail(token, this._pool);

    // Check if given loan exists and is attached to the user
    this._pool.query(`
      SELECT * from trade.loans where user_id=$1 and id=$2`, [user.user_id, loan_id], (error, results) => {
      if (error) {
        throw error
      }

      if (results.rows.length === 0) {
        res.status(400).json({ message: 'Loan does not exist' });
        return;
      }

      if (+results.rows[0].current_amount_wint < +value_dollar) {
        res.status(400).json({ message: `Value provided is too high, max is ${+results.rows[0].current_amount_wint.toFixed}` });
        return;
      }

      this._pool.query(`UPDATE trade.loans SET current_amount_wint = current_amount_wint - $1 WHERE id = $2`, [value_dollar, loan_id], (error, results) => {
        res.status(200).json({ message: 'Debt successfully repaid' })
        return;
      });
    });
  }

  public async withdraw(req: Express.Request, res: Express.Response) {
    const { deposit_id, value_dollar } = req.body;

    // Check if the user exists
    const token = req.headers.authorization?.split(' ')[1];
    const user = await verifyTokenAndGetEmail(token, this._pool);

    // Check if given loan exists and is attached to the user
    this._pool.query(`
      SELECT * from trade.deposits where user_id=$1 and id=$2`, [user.user_id, deposit_id], (error, results) => {
      if (error) {
        throw error
      }

      if (results.rows.length === 0) {
        res.status(400).json({ message: 'Deposit does not exist' });
        return;
      }

      if (+results.rows[0].amount < +value_dollar) {
        res.status(400).json({ message: `Value provided is too high, max is ${results.rows[0].amount}` });
        return;
      }

      const fixed_apr = 0.07;
      this._pool.query(`UPDATE trade.deposits SET amount = ROUND((amount + (amount * DATE_PART('day', NOW() - updated_at) * $1 / 365) - $2)::numeric, 2), updated_at=NOW() WHERE id = $3`, [fixed_apr, value_dollar, deposit_id], (error, results) => {
        res.status(200).json({ message: 'Debt successfully repaid' })
        return;
      });
    });
  }
}