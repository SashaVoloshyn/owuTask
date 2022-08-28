import { ApplicantModel } from '../models/Applicant.model';
import {
    IApplicantInteresting, IApplicantModel, IApplicantToSet, IDeleteFromDb,
} from '../interfaces';
import { ApplicantToAdd } from '../types';
import { CategoriesEnum } from '../enums';

class ApplicantRepository {
    public async getOneById(applicant_id : string): Promise<IApplicantModel | null> {
        return ApplicantModel.findById(applicant_id);
    }

    public async getOneByEmail(email: string): Promise<IApplicantModel | null> {
        return ApplicantModel.findOne({ email });
    }

    public async addOne(applicationToAdd: ApplicantToAdd): Promise<IApplicantModel> {
        return ApplicantModel.create(applicationToAdd);
    }

    public async deleteOne(applicant_id : string): Promise<IDeleteFromDb> {
        return ApplicantModel.deleteOne({ _id: applicant_id });
    }

    public async updateOne({ _id, applicantToSet }: IApplicantToSet): Promise<IApplicantModel | null> {
        return ApplicantModel.findByIdAndUpdate(_id, applicantToSet);
    }

    public async getAllByFilters(filters: IApplicantInteresting, category: CategoriesEnum)
        : Promise<IApplicantModel[] | null> {
        return ApplicantModel.find({
            ...filters,
            categories: { $in: [category] },
        });
    }
}
export const applicantRepository = new ApplicantRepository();
