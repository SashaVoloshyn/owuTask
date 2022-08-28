import { ApplicantToSet } from '../types';
import { LevelsEnum } from '../enums';

export interface IApplicantToSet {
    _id: string;
    applicantToSet: ApplicantToSet;
}

export interface IApplicantInteresting {
    level?: LevelsEnum,
    japaneseKnowledge?: boolean
}
