import {
    Request, Response, NextFunction, Router,
} from 'express';

import { applicantsRouter } from './applicants.router';
import { HttpMessageEnum, HttpStatusEnum } from '../enums';
import { ErrorHandler } from '../errors';
import { positionsRouter } from './positions.router';

export const apiRouter = Router();

apiRouter.use('/positions', positionsRouter);
apiRouter.use('/applicants', applicantsRouter);
// @ts-ignore
apiRouter.use('*', (err: ErrorHandler, req: Request, res: Response, next: NextFunction) => {
    res.status(err.status || HttpStatusEnum.INTERNAL_SERVER_ERROR).json({
        message: err.message,
        error: err?.error || HttpMessageEnum.INTERNAL_SERVER_ERROR,
        status: err?.status || HttpStatusEnum.INTERNAL_SERVER_ERROR,
    });
});
