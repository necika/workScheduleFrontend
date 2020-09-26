export class MorningMeetingDTO {
    id: number;
    problems: string;
    today: string;
    yesterday: string;
    userId : number;
    yesterdayTasks: Array<string>;
    todayTasks: Array<string>;
    problemTasks: Array<string>;

    constructor(){}
  }