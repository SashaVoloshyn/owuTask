import { CategoriesEnum, LevelsEnum } from '../enums';

export interface IQueryParamsPositions {
    category?: CategoriesEnum,
    level?: LevelsEnum,
    tag?: string
}
