export interface DayType {
  weekDay: string;
  dayNumber: string;
  isWeekend: boolean;
}

export interface VacationType extends Object {
  startDay: number;
  startMonth: number;
  endDay: number;
  endMonth: number;
  type: string;
}

export interface SingleVacationType extends Object {
  vacationLength: number;
  vacationType: string;
  labelDirection: string;
}

export interface TeamsDataType extends Object {
  teams: Team[];
  id: number;
}

interface Team extends Object {
  name: string;
  percentageOfAbsent: number[];
  members: User[];
}

interface User extends Object {
  name: string;
  vacations: UserVacation[];
}

interface UserVacation extends Object {
  startDate: string;
  endDate: string;
  type: string;
}
