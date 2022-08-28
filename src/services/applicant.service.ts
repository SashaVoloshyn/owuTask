import { IApplicantModel, IPositionModel } from '../interfaces';
import { applicantRepository } from '../repositories';

export class ApplicantService {
    public async getAllByFiltersForEmailSend({ category, level, japaneseRequired }: IPositionModel)
        : Promise<IApplicantModel[] | null> {
        if (!japaneseRequired) {
            return applicantRepository
                .getAllByFilters({ level }, category);
        }
        return applicantRepository
            .getAllByFilters({ level, japaneseKnowledge: japaneseRequired }, category);
    }
}

export const applicantService = new ApplicantService();