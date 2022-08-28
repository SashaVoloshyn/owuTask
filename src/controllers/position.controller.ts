import { NextFunction, Response } from 'express';

import {IApplicantModel, IRequestExtended} from "../interfaces";
import {applicantService, emailService, positionService} from "../services";
import {ErrorHandler} from "../errors";
import {errorsMessagesConstant} from "../constants";
import {EmailTypeTemplateEnum, HttpMessageEnum, HttpStatusEnum} from "../enums";
import {positionRepository} from "../repositories";
import {PositionToAdd} from "../types";

class PositionController {

    public async getAll(req: IRequestExtended, res: Response, next: NextFunction): Promise<void> {
        try {
            const params = req.searchParams;

            if (params) {
                const allPositionsByFilters = await positionService.searchPositionsByFilters(params);

                if (!allPositionsByFilters?.length) {
                    next(new ErrorHandler(
                        errorsMessagesConstant.notFoundPositions,
                        HttpStatusEnum.NOT_FOUND,
                        HttpMessageEnum.NOT_FOUND,
                    ));
                    return;
                }

                res.status(HttpStatusEnum.OK).json(allPositionsByFilters);
                return;
            }

            const positions = await positionRepository.getAll();

            if (!positions.length) {
                next(new ErrorHandler(
                    errorsMessagesConstant.notFoundPositions,
                    HttpStatusEnum.NOT_FOUND,
                    HttpMessageEnum.NOT_FOUND,
                ));
                return;
            }

            res.status(HttpStatusEnum.OK).json(positions);
        } catch (e) {
            next(e);
        }
    }

    public async getOne(req: IRequestExtended, res: Response, next: NextFunction): Promise<void> {
        try {
            const position_id = req._id as string;

            const position = await positionRepository.getOneById(position_id);

            if (!position) {
                next(new ErrorHandler(
                    errorsMessagesConstant.notFoundPosition,
                    HttpStatusEnum.NOT_FOUND,
                    HttpMessageEnum.NOT_FOUND,
                ));
                return;
            }

            res.status(HttpStatusEnum.OK).json([position]);
        } catch (e) {
            next(e);
        }
    }

    public async createOne(req: IRequestExtended, res: Response, next: NextFunction): Promise<void> {
        try {
            const position = req.positionToAdd as PositionToAdd;
            const positionCreated = await positionRepository.createOne({ position });

            if (!positionCreated) {
                next(new ErrorHandler(
                    errorsMessagesConstant.notImplemented,
                    HttpStatusEnum.NOT_IMPLEMENTED,
                    HttpMessageEnum.NOT_IMPLEMENTED,
                ));
                return;
            }

            const applicants = await applicantService.getAllByFiltersForEmailSend(positionCreated);

            applicants?.forEach((applicant:IApplicantModel) => {
                emailService.sendMessage(applicant.email, EmailTypeTemplateEnum.NEW_POSITION, {
                    position_category: positionCreated.category,
                    position_company: positionCreated.company,
                    position_level: positionCreated.level,
                    position_japaneseRequired: `${positionCreated.japaneseRequired}`,
                    position_description: positionCreated?.description,
                });
            });

            const id = positionCreated._id;
            res.status(HttpStatusEnum.CREATED).location(`${id}`).end();
        } catch (e) {
            next(e);
        }
    }

    public async updateOne(req: IRequestExtended, res: Response, next: NextFunction): Promise<void> {
        try {
            const position_id  = req._id as string;
            const updatesFields = req.positionToPatch!;

            const positionUpdated = await positionRepository.updateField({ position_id, updatesFields });
            if (!positionUpdated) {
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
            const  position_id = req._id as string;
            const position = req.positionModel!;

            const positionDeleted = await positionRepository.deleteOne( position_id );

            if (!positionDeleted.deletedCount) {
                next(new ErrorHandler(
                    errorsMessagesConstant.notDelete,
                    HttpStatusEnum.NOT_IMPLEMENTED,
                    HttpMessageEnum.NOT_IMPLEMENTED,
                ));
                return;
            }

            const applicants = await applicantService.getAllByFiltersForEmailSend(position);

            applicants?.forEach((applicant) => {
                emailService.sendMessage(applicant.email, EmailTypeTemplateEnum.REMOVE_POSITION, {
                    position_category: position.category,
                    position_company: position.company,
                    position_level: position.level,
                    position_japaneseRequired: `${position.japaneseRequired}`,
                    position_description: position?.description,
                });
            });

            res.status(HttpStatusEnum.NO_CONTENT).end();
        } catch (e) {
            next(e);
        }
    }
}

export const positionsController = new PositionController();