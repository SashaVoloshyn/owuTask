import { ICommonFieldModel } from './common-field.model.interface';
import { CategoriesEnum, LevelsEnum } from '../../enums';

export interface IPositionModel extends ICommonFieldModel{
    category: CategoriesEnum,
    level: LevelsEnum,
    company: string,
    description?: string,
    japaneseRequired: boolean
}
