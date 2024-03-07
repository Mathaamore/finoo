import { NextFunction, Request, Response, Router } from 'express';

import { AuthController } from '../../controllers/AuthController';

export class AuthRouter {
  private _router = Router();
  private _controller;
  private _pool: any;

  constructor(pool: any) {
    this._pool = pool;
    this._controller = new AuthController(pool);
    this._configure();
  }

  get router() {
    return this._router;
  }

  private _configure() {
    this._router.get('/hello', this._controller.hello.bind(this._controller));
    this._router.get('/whoami', this._controller.whoami.bind(this._controller));
    this._router.post('/login', this._controller.login.bind(this._controller));
    this._router.post('/register', this._controller.register.bind(this._controller));
  }
}
