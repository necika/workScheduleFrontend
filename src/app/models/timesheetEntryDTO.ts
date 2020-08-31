export class TimesheetEntryDTO {
  id: number;
  day: number
  task: string;
  description: string;
  startTime: string;
  endTime: string;
  position: number;
  changed: boolean;
}