import { Router } from 'express';

import { TradeController } from '../../controllers/TradeController';

export class TradeRouter {
  private _router = Router();
  private _controller;
  private _pool: any;

  constructor(pool: any) {
    this._pool = pool;
    this._controller = new TradeController(pool);
    this._configure();
  }

  get router() {
    return this._router;
  }

  private _configure() {
    this._router.get('/deposits', this._controller.deposits.bind(this._controller));
    this._router.post('/deposit', this._controller.deposit.bind(this._controller));
    this._router.post('/withdraw', this._controller.withdraw.bind(this._controller));
    this._router.get('/loans', this._controller.loans.bind(this._controller));
    this._router.post('/lent', this._controller.lent.bind(this._controller));
    this._router.post('/repay', this._controller.repay.bind(this._controller));
    this._router.get('/supply', this._controller.supply.bind(this._controller));
  }
}
