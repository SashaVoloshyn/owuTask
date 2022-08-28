import { Router } from 'express';

import { applicantController } from '../controllers';
import { applicantMiddleware } from '../middlewares';

export const applicantsRouter = Router();

applicantsRouter.post(
    '/',
    applicantMiddleware.createValidate,
    applicantMiddleware.checkUniqueEmail,
    applicantController.createOne,
);
applicantsRouter.put(
    '/:applicant_id',
    applicantMiddleware.checkParamsOnId,
    applicantMiddleware.validateOnFullUpdate,
    applicantMiddleware.checkExistsById,
    applicantMiddleware.checkUniqueEmail,
    applicantController.updateOne,
);
applicantsRouter.delete(
    '/:applicant_id',
    applicantMiddleware.checkParamsOnId,
    applicantMiddleware.checkExistsById,
    applicantController.deleteOne,
);
