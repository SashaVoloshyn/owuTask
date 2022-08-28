import { NextFunction, Response } from 'express';

import { IRequestExtended } from '../interfaces';
import { applicantRepository } from '../repositories';
import { ErrorHandler } from '../errors';
import { HttpMessageEnum, HttpStatusEnum } from '../enums';
import { errorsMessagesConstant } from '../constants';

class ApplicantController {
    public async createOne(req: IRequestExtended, res: Response, next: NextFunction): Promise<void> {
        try {
            const applicantToAdd = req.applicantToAdd!;

            const applicantCreated = await applicantRepository.addOne(applicantToAdd);

            if (!applicantCreated) {
                next(new ErrorHandler(
                    errorsMessagesConstant.notImplemented,
                    HttpStatusEnum.NOT_IMPLEMENTED,
                    HttpMessageEnum.NOT_IMPLEMENTED,
                ));
                return;
            }

            res.status(HttpStatusEnum.CREATED).location(`${applicantCreated._id}`).end();
        } catch (e) {
            next(e);
        }
    }

    public async updateOne(req: IRequestExtended, res: Response, next: NextFunction): Promise<void> {
        try {
            const _id = req._id as any;
            const applicantToSet = req.applicantToSet!;

            const applicantUpdated = await applicantRepository.updateOne({ _id, applicantToSet });

            if (!applicantUpdated) {
                next(new ErrorHandler(
                    errorsMessagesConstant.notUpdated,
                    HttpStatusEnum.NOT_IMPLEMENTED,
                    HttpMessageEnum.NOT_IMPLEMENTED,
                ));
                return;
            }

            res.status(HttpStatusEnum.OK).end();
        } catch (e) {
            next(e);
        }
    }

    public async deleteOne(req: IRequestExtended, res: Response, next: NextFunction): Promise<void> {
        try {
            const applicant_id = req._id as string;

            const applicantDeleted = await applicantRepository.deleteOne(applicant_id);

            if (!applicantDeleted) {
                next(new ErrorHandler(
                    errorsMessagesConstant.notUpdated,
                    HttpStatusEnum.NOT_IMPLEMENTED,
                    HttpMessageEnum.NOT_IMPLEMENTED,
                ));
                return;
            }

            res.status(HttpStatusEnum.NO_CONTENT).end();
        } catch (e) {
            next(e);
        }
    }
}

export const applicantController = new ApplicantController();
