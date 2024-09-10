
const daysoftheWeek:String[] = ["M", "T", "W", "R", "F", "S", "U"];
function daytodate(day:String) {
  const indexOf = daysoftheWeek.indexOf(day);
  if (indexOf === -1) 
    return -1;
    return indexOf + 3;
}

function dateToDay(date:number) {
  const indexOfDate = date - 3;
  if (indexOfDate < 0 || indexOfDate > daysoftheWeek.length) return -1;

  return daysoftheWeek[indexOfDate];
}
export 
class TimeRange {
 
  private start: Date;
  private end: Date;
 

  constructor(day: string, StartTime: string, EndTime: string) {
    if(!daysoftheWeek.includes(day)){
      throw new Error("Unknown Day:'M' for Monday, 'T' for Tuesday, 'W' for Wednesday, 'R' for Thursday, 'F' for Friday, 'S' for Saturday, and 'U' for Sunday")
    }
    const sHour: number = parseInt(StartTime.substring(0, 2));
    const sMin: number = parseInt(StartTime.substring(3, 5));
    const eHour: number = parseInt(EndTime.substring(0, 2));
    const eMin: number = parseInt(EndTime.substring(3, 5));
    this.start = new Date(2022, 0, daytodate(day), sHour, sMin, 0);
    this.end = new Date(2022, 0, daytodate(day), eHour, eMin, 0);
  }
  public sameAs(otherTime: TimeRange): Boolean {
    return otherTime.start.getTime()  === this.start.getTime() && otherTime.end.getTime()  === this.end.getTime();
  }

  public overlap(otherTime: TimeRange): Boolean {
    return this.start <= otherTime.end && otherTime.start <= this.end;
  }
  public overlapArray(otherTimeArray: TimeRange[]):TimeRange[] {
   return otherTimeArray.filter((otherTime) => {
      this.overlap(otherTime);
    });
  }
  private getTime(date:Date) {
    const hours = (date.getHours() + "").padStart(2, "0");
    const minutes =
      date.getMinutes() > 10
        ? (date.getMinutes() + "").padEnd(2, "0")
        : (date.getMinutes() + "").padStart(2, "0");

    return `${hours}:${minutes}`;
  }
  public render(): string {
    return this.getTime(this.start) + "->" + this.getTime(this.end);
  }
}
