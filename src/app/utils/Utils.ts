import { dayType } from '../types';

export default class Utils {
  public static calcDaysAmount(date: Date): number {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  }

  public static getDaysOfMonth(date: Date, daysAmount: number): dayType[] {
    let monthDays: dayType[] = [];
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
      //   monthDays.push(
      //     new Date(
      //       date.getFullYear(),
      //       date.getMonth(),
      //       dayCounter
      //     ).toLocaleDateString('en-US', {
      //       weekday: 'short',
      //     })
      //   );
    }
    return monthDays;
  }
}
