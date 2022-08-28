import { PositionToAdd, PositionToPatch } from '../types';

export interface IPositionToAdd {
    position: PositionToAdd
}

export interface IPositionToPatch {
    position_id: string;
    updatesFields: PositionToPatch
}
