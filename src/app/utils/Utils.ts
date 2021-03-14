import { MonthDay, ResultVacation, UserVacation } from '../types';

type CalcType = {
  startDay: number;
  vacationLength: number;
};

type ParsedVacationType = {
  startDay: number;
  startMonth: number;
  endDay: number;
  endMonth: number;
  type: string;
};

export default class Utils {
  public static calcDaysAmount(date: Date): number {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  }

  public static getDaysOfMonth(date: Date, daysAmount: number): MonthDay[] {
    const monthDays: MonthDay[] = [];
    for (let dayCounter = 1; dayCounter <= daysAmount; dayCounter++) {
      const [dayNumber, weekDay] = new Date(
        date.getFullYear(),
        date.getMonth(),
        dayCounter
      )
        .toLocaleDateString('en-US', {
          weekday: 'short',
          day: 'numeric',
        })
        .split(' ');
      monthDays.push({
        weekDay,
        dayNumber,
        isWeekend: weekDay === 'Sat' || weekDay === 'Sun',
      });
    }
    return monthDays;
  }

  public static getParsedVacations(
    vacations: UserVacation[]
  ): ParsedVacationType[] {
    const userVacations: ParsedVacationType[] = [];
    vacations.forEach((vacation) => {
      userVacations.push({
        startDay: Number.parseInt(vacation.startDate.split('.')[0], 10),
        startMonth: Number.parseInt(vacation.startDate.split('.')[1], 10),
        endDay: Number.parseInt(vacation.endDate.split('.')[0], 10),
        endMonth: Number.parseInt(vacation.endDate.split('.')[1], 10),
        type: vacation.type,
      });
    });
    return userVacations;
  }

  public static vacLengthCalc(
    calcType: string,
    vacationItem: ParsedVacationType,
    currentDate: Date
  ): CalcType {
    let vacationLength = 0;
    let startDay = 0;
    switch (calcType) {
      case 'start':
        vacationLength =
          new Date(
            currentDate.getFullYear(),
            currentDate.getMonth() + 1,
            0
          ).getDate() +
          1 -
          vacationItem.startDay;
        startDay = vacationItem.startDay;
        break;

      case 'end':
        vacationLength = vacationItem.endDay;
        startDay = 1;
        break;

      case 'regular':
        vacationLength = vacationItem.endDay + 1 - vacationItem.startDay;
        startDay = vacationItem.startDay;
        break;

      default:
        break;
    }
    return { startDay, vacationLength };
  }

  public static getCurrentMonthVacation(
    userVacations: UserVacation[],
    currentDate: Date
  ): ResultVacation | undefined {
    let singleVacation: ResultVacation | undefined;
    singleVacation = undefined;
    const parsedUserVacations = this.getParsedVacations(userVacations);

    parsedUserVacations.forEach((vacationItem) => {
      // * START DAY AND END DAY OF VACATION ARE IN DIFFERENT MONTHS
      if (vacationItem.startMonth !== vacationItem.endMonth) {
        // *CALCULATING FROM START DAY TO LAST MONTH DAY
        if (vacationItem.startMonth === currentDate.getMonth() + 1) {
          // tslint:disable-next-line:one-variable-per-declaration
          const { startDay, vacationLength } = this.vacLengthCalc(
            'start',
            vacationItem,
            currentDate
          );
          singleVacation = {
            startDay,
            vacationLength,
            vacationType: vacationItem.type,
          };
        }

        // *CALCULATING FROM FIRST MONTH DAY TO END DAY
        if (vacationItem.endMonth === currentDate.getMonth() + 1) {
          const { startDay, vacationLength } = this.vacLengthCalc(
            'end',
            vacationItem,
            currentDate
          );
          singleVacation = {
            startDay,
            vacationLength,
            vacationType: vacationItem.type,
          };
        }
      }
      // * REGULAR VACATION LENGTH CALCULATING
      else if (vacationItem.startMonth === currentDate.getMonth() + 1) {
        const { startDay, vacationLength } = this.vacLengthCalc(
          'regular',
          vacationItem,
          currentDate
        );
        singleVacation = {
          startDay,
          vacationLength,
          vacationType: vacationItem.type,
        };
      }
    });

    return singleVacation;
  }
}
