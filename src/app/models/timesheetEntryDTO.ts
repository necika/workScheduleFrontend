export class TimesheetEntryDTO {
  id: number;
  day: number
  task: string;
  description: string;
  startTime: string;
  endTime: string;
  position: number;
  changed: boolean;
  userId : number;
  tsMonthId: number;

  constructor(day: number, task: string, description: string, startTime: string,endTime: string, position: number,changed: boolean,userId: number,tsMonthId: number){
    this.day = day;
    this.task = task;
    this.description = description;
    this.startTime = startTime;
    this.endTime = endTime;
    this.position = position;
    this.changed = changed;
    this.userId = userId;
    this.tsMonthId = tsMonthId;
  }
}