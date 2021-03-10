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
    let monthDays: DayType[] = [];
    for (let dayCounter = 1; dayCounter <= daysAmount; dayCounter++) {
      const [dayNum, weekDay] = new Date(
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
        weekDay: weekDay,
        dayNum: dayNum,
        isWeekend: weekDay === 'Sat' || weekDay === 'Sun' ? true : false,
      });
    }
    return monthDays;
  }

  public static getUserVacations(vacations: UserVacation[]): VacationType[] {
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
  ): number {
    let vacationLength: number = 0;
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
        break;

      case 'end':
        vacationLength = vacationItem.endDay;
        break;

      case 'regular':
        vacationLength = vacationItem.endDay + 1 - vacationItem.startDay;
        break;

      default:
        break;
    }
    return vacationLength;
  }

  public static getSingleVacation(
    cellNumber: number,
    userVacations: VacationType[],
    currentDate: Date
  ): SingleVacationType {
    let singleVacation!: SingleVacationType;

    userVacations.forEach((vacationItem) => {
      //* START DAY AND END DAY OF VACATION ARE IN DIFFERENT MONTHS
      if (vacationItem.startMonth !== vacationItem.endMonth) {
        //*CALCULATING FROM START DAY TO LAST MONTH DAY
        if (vacationItem.startMonth === currentDate.getMonth() + 1) {
          if (cellNumber === vacationItem.startDay) {
            singleVacation = {
              vacationLength: this.vacLengthCalc(
                'start',
                vacationItem,
                currentDate
              ),
              vacationType: vacationItem.type,
              labelDirection: 'left',
            };
          }
        }

        //*CALCULATING FROM FIRST MONTH DAY TO END DAY
        if (vacationItem.endMonth === currentDate.getMonth() + 1) {
          if (cellNumber === vacationItem.endDay) {
            singleVacation = {
              vacationLength: this.vacLengthCalc(
                'end',
                vacationItem,
                currentDate
              ),
              vacationType: vacationItem.type,
              labelDirection: 'right',
            };
          }
        }
      }
      //* REGULAR VACATION LENGTH CALCULATING
      else if (vacationItem.startMonth === currentDate.getMonth() + 1) {
        if (cellNumber === vacationItem.startDay) {
          singleVacation = {
            vacationLength: this.vacLengthCalc(
              'regular',
              vacationItem,
              currentDate
            ),
            vacationType: vacationItem.type,
            labelDirection: 'left',
          };
        }
      }
    });

    return singleVacation;
  }
}
