import { ICommonFieldModel } from './common-field.model.interface';
import { CategoriesEnum, LevelsEnum } from '../../enums';

export interface IApplicantModel extends ICommonFieldModel{
    email: string,
    categories: CategoriesEnum[],
    japaneseKnowledge: boolean,
    level: LevelsEnum
}
