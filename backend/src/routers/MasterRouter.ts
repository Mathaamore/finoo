import { Request, Response, Router } from 'express';

import { AuthRouter } from './auth/AuthRouter';
import { TradeRouter } from './trade/TradeRouter';

export class MasterRouter {
  private _router = Router();
  private _subrouterAuth;
  private _subrouterTrade;

  constructor(pool: any) {
    this._subrouterAuth = new AuthRouter(pool).router;
    this._subrouterTrade = new TradeRouter(pool).router;
    this._configure();
  }

  get router() {
    return this._router;
  }

  private _configure() {
    this._router.get("/", (req: Request, res: Response) => {
      res.send(
        `
        <body style="width: 100%; height: 100%; overflow: hidden; background-color: #000000;">
          <div style="height: 100%; display: flex; flex-direction: column; align-items:center; justify-content:center; gap: 60px">
            <h1 style="color: #ffffff; font-size: 50px;">Welcome to the API</h1>
            <h2 style="color: #ffffff; font-size: 30px;">Please use the /auth endpoint to authenticate</h2>
          </div>
        </body>
        `
      )
    });

    this._router.use('/auth', this._subrouterAuth);
    this._router.use('/trade', this._subrouterTrade);
  }
}