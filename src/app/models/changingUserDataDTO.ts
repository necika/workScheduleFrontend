export class ChangingUserDataDTO {
    public id: number;
    public projectId: number;
    public title: string;

    constructor(id:number,projectId:number,title:string){
        this.id = id;
        this.projectId = projectId;
        this.title = title;
    }
}