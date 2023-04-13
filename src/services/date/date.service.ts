/**
 * Работа с временем и датой
 */
export const dateService = {
  convertDateAndTimeToFormatPostPin: (date: string): string => {
    let dayTextFormat;
    // получаем день даты которая пришла
    const currentDay = new Date().getDate();
    // получаем день даты которая пришла
    const inputDate = new Date(date);
    const inputDay = inputDate.getDate();

    // завтра
    switch (inputDay) {
      case currentDay: {
        dayTextFormat = '';
        break;
      }
      case currentDay + 1: {
        dayTextFormat = 'завтра';
        break;
      }
      case currentDay - 1: {
        dayTextFormat = 'вчера';
        break;
      }
      default:
        dayTextFormat = dateService.convertDateToFormat(date);
    }

    return `${dayTextFormat} ${dateService.convertTimeToFormat(date)}`;
  },

  convertDateAndTimeToFormat: (date: string): string => {
    let dayTextFormat;
    // получаем день даты которая пришла
    const currentDay = new Date().getDate();
    // получаем день даты которая пришла
    const inputDate = new Date(date);
    const inputDay = inputDate.getDate();

    if (currentDay === inputDay) dayTextFormat = 'сегодня';
    // вчерашняя дата
    else if (currentDay - 1 === inputDay) dayTextFormat = 'вчера';
    else dayTextFormat = dateService.convertDateToFormat(date);

    return `${dayTextFormat} в ${dateService.convertTimeToFormat(date)}`;
  },
  /**
   * Делаем из даты формат 04.01.2023
   * @param date
   */
  convertDateToFormat: (date: string): string => {
    const inputDate = new Date(date);
    const dayInputDate = inputDate.getDate();
    const monthInputDate = inputDate.getMonth() + 1; // месяцы начинаются с 0
    const yearInputDate = inputDate.getFullYear();

    const convertDate: IConvertDate = {
      year: yearInputDate.toString(),
      day: dayInputDate.toString(),
      month: monthInputDate.toString(),
    };

    if (dayInputDate < 10) convertDate.day = '0' + dayInputDate;
    if (monthInputDate < 10) convertDate.month = '0' + monthInputDate;

    return `${convertDate.day}.${convertDate.month}.${convertDate.year}`;
  },
  /**
   * Приводим время к формату 06:01
   * @param date
   */
  convertTimeToFormat: (date: string): string => {
    const inputDate = new Date(date);
    const minutesInputDate = inputDate.getMinutes();
    const hoursInputDate = inputDate.getHours();

    const convertTime: IConvertTime = {
      minutes: minutesInputDate.toString(),
      hours: hoursInputDate.toString(),
    };

    if (hoursInputDate < 10) convertTime.hours = '0' + hoursInputDate;
    if (minutesInputDate < 10) convertTime.minutes = '0' + minutesInputDate;

    return `${convertTime.hours}:${convertTime.minutes}`;
  },

  /**
   * Прибавить к текущему времени н единиц времени (минут)
   * @param minute
   */
  plusMinuteTimeCurrentDate: (minute: number): string => {
    const currentDate = new Date();
    return new Date(
      currentDate.setMinutes(currentDate.getMinutes() + minute),
    ).toString();
  },
};

interface IConvertDate {
  day: string;
  month: string;

  year: string;
}

interface IConvertTime {
  hours: string;
  minutes: string;
}
