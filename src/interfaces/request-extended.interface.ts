import { Request } from 'express';

import {
    ApplicantToAdd, ApplicantToSet, PositionToAdd, PositionToPatch,
} from '../types';
import { IQueryParamsPositions } from './query-params.interface';
import {IPositionModel} from "./models/position.model.interface";

export interface IRequestExtended extends Request{
    positionToAdd?: PositionToAdd,
    positionToPatch?: PositionToPatch,
    _id?: string,
    searchParams?: IQueryParamsPositions,
    applicantToAdd?: ApplicantToAdd,
    applicantToSet?: ApplicantToSet,
    email?: string,
    positionModel?: IPositionModel
}
