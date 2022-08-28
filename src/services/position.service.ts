import { IPositionModel, IQueryParamsPositions } from '../interfaces';
import { positionRepository } from '../repositories';

export class PositionService {
    public async searchPositionsByFilters(filters: IQueryParamsPositions): Promise<IPositionModel[] | null> {
        if (!filters.tag) {
            return positionRepository.getAllByFiltersWithoutTag(filters);
        }

        return positionRepository.getAllByFiltersWithTag(filters);
    }
}

export const positionService = new PositionService();