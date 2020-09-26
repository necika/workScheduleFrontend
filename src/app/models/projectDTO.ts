import { CompanyDTO } from './companyDTO';
import { UserProfileDTO } from './userProfileDTO';

export class ProjectDTO{
    id: number;
    name: string;
    description: string;
    users: Array<UserProfileDTO>;
    company: CompanyDTO;
    startDate: string;
    endDate:string;

    constructor(){}
}