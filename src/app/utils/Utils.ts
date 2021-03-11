import {
  DayType,
  SingleVacationType,
  UserVacation,
  VacationType,
} from '../types';

export default class Utils {
  public static calcDaysAmount(date: Date): number {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  }

  public static getDaysOfMonth(date: Date, daysAmount: number): DayType[] {
    const monthDays: DayType[] = [];
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

  public static getParsedVacations(vacations: UserVacation[]): VacationType[] {
    const userVacations: VacationType[] = [];
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
    vacationItem: VacationType,
    currentDate: Date
  ): any {
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
    userVacations: VacationType[],
    currentDate: Date
  ): SingleVacationType | undefined {
    let singleVacation: SingleVacationType | undefined;
    singleVacation = undefined;

    userVacations.forEach((vacationItem) => {
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
            labelDirection: 'left',
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
            labelDirection: 'right',
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
          labelDirection: 'left',
        };
      }
    });

    return singleVacation;
  }
}
