import { getModelForClass, prop, ReturnModelType } from '@typegoose/typegoose';

import { CategoriesEnum, LevelsEnum } from '../enums';

class Position {
    @prop({
        require: true,
        trim: true,
        lowercase: true,
        })
    public category!: CategoriesEnum;

    @prop({
        require: true,
        trim: true,
        })
    public company!: string;

    @prop({
        require: false,
        trim: true,
        })
    public description?: string;

    @prop({
        require: true,
        lowercase: true,
        trim: true,
        })
    public level!: LevelsEnum;

    @prop({
        require: true,
        })
    public japaneseRequired!: boolean;
}

export const PositionModel: ReturnModelType<typeof Position> = getModelForClass(Position);
