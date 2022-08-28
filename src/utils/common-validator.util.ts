import Joi from 'joi';

import { CategoriesEnum, LevelsEnum } from '../enums';

export const commonValidatorUtil = {
    category: Joi.string()
        .trim()
        .lowercase()
        .alphanum()
        .valid(CategoriesEnum.ANGULAR, CategoriesEnum.JAVASCRIPT, CategoriesEnum.NODEJS, CategoriesEnum.REACT),
    level: Joi.string()
        .trim()
        .lowercase()
        .alphanum()
        .valid(LevelsEnum.JUNIOR, LevelsEnum.MIDDLE, LevelsEnum.SENIOR),
};
