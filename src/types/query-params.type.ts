import { CategoriesEnum, LevelsEnum } from '../enums';

export type QueryParams = {
    category: CategoriesEnum,
    level: LevelsEnum,
    tag: string
}
