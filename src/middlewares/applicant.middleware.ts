import { NextFunction, Response } from 'express';

import { IRequestExtended } from '../interfaces';
import { ApplicantToAdd, ApplicantToSet } from '../types';
import { applicantToAddSchema, applicantToSetSchema, paramsIdSchema } from '../utils';
import { ErrorHandler } from '../errors';
import { HttpMessageEnum, HttpStatusEnum } from '../enums';
import { errorsMessagesConstant } from '../constants';
import { applicantRepository } from '../repositories';

class ApplicantMiddleware {
    public createValidate(req: IRequestExtended, res: Response, next: NextFunction): void {
        try {
            const applicant = req.body as ApplicantToAdd;

            const { error, value } = applicantToAddSchema.validate(applicant);

            if (error) {
                next(new ErrorHandler(
                    errorsMessagesConstant.badRequest,
                    HttpStatusEnum.BAD_REQUEST,
                    HttpMessageEnum.BAD_REQUEST,
                ));
                return;
            }

            req.applicantToAdd = value;
            req.email = value.email;

            next();
        } catch (e) {
            next(e);
        }
    }

    public async checkUniqueEmail(req: IRequestExtended, res: Response, next: NextFunction): Promise<void> {
        try {
            const email = req.email!;

            const applicant = await applicantRepository.getOneByEmail(email);

            if (applicant) {
                next(new ErrorHandler(
                    errorsMessagesConstant.conflict,
                    HttpStatusEnum.CONFLICT,
                    HttpMessageEnum.CONFLICT,
                ));
                return;
            }

            next();
        } catch (e) {
            next(e);
        }
    }

    public checkParamsOnId(req: IRequestExtended, _: Response, next: NextFunction): void {
        try {
            const { applicant_id } = req.params;

            const { error } = paramsIdSchema.validate({ _id: applicant_id });

            if (error) {
                next(new ErrorHandler(
                    errorsMessagesConstant.missingParams,
                    HttpStatusEnum.BAD_REQUEST,
                    HttpMessageEnum.BAD_REQUEST,
                ));
                return;
            }

            req._id = applicant_id;
            next();
        } catch (e) {
            next(e);
        }
    }

    public async checkExistsById(req: IRequestExtended, res: Response, next: NextFunction): Promise<void> {
        try {
            const applicant_id = req._id as string;

            const applicant = await applicantRepository.getOneById(applicant_id);

            if (!applicant) {
                next(new ErrorHandler(
                    errorsMessagesConstant.notFoundApplicant,
                    HttpStatusEnum.NOT_FOUND,
                    HttpMessageEnum.NOT_FOUND,
                ));
                return;
            }

            next();
        } catch (e) {
            next(e);
        }
    }

    public validateOnFullUpdate(req: IRequestExtended, res: Response, next: NextFunction): void {
        try {
            const applicant = req.body as ApplicantToSet;

            const { error, value } = applicantToSetSchema.validate(applicant);

            if (error) {
                next(new ErrorHandler(
                    errorsMessagesConstant.badRequest,
                    HttpStatusEnum.BAD_REQUEST,
                    HttpMessageEnum.BAD_REQUEST,
                ));
                return;
            }

            req.applicantToSet = value;
            req.email = value.email;

            next();
        } catch (e) {
            next(e);
        }
    }
}

export const applicantMiddleware = new ApplicantMiddleware();
