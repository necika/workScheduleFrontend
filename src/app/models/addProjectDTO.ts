export class AddProjectDTO{
    name:string;
    description: string;
    users: Array<number>;
    teamLeader: number;
    startDate:string;
    endDate:string;
}