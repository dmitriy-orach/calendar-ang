export interface MonthDay {
  weekDay: string;
  dayNumber: string;
  isWeekend: boolean;
}

export interface ResultVacation extends Object {
  startDay: number;
  vacationLength: number;
  vacationType: string;
}

export interface TeamsData extends Object {
  teams: Team[];
  id: number;
}

export interface Team extends Object {
  name: string;
  percentageOfAbsent: number[];
  members: User[];
}

export interface User extends Object {
  name: string;
  vacations: UserVacation[];
}

export interface UserVacation extends Object {
  startDate: string;
  endDate: string;
  type: string;
}
