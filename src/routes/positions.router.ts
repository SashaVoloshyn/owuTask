import { Router } from 'express';

import { positionsController } from '../controllers';
import { positionMiddleware } from '../middlewares';

export const positionsRouter = Router();

positionsRouter.get(
    '/',
    positionMiddleware.isQueryParams,
    positionsController.getAll,
);
positionsRouter.get(
    '/:position_id',
    positionMiddleware.checkParamsById,
    positionsController.getOne,
);
positionsRouter.post(
    '/',
    positionMiddleware.createValidate,
    positionsController.createOne,
);
positionsRouter.patch(
    '/:position_id',
    positionMiddleware.checkParamsById,
    positionMiddleware.positionUpdateValidate,
    positionMiddleware.checkPositionExists,
    positionsController.updateOne,
);
positionsRouter.delete(
    '/:position_id',
    positionMiddleware.checkParamsById,
    positionMiddleware.checkPositionExists,
    positionsController.deleteOne,
);
