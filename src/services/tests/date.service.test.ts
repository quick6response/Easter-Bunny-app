import { dateService } from '@services/date/date.service';

describe('DateService', () => {
  describe('method convertDateAndTimeToFormat', () => {
    test('convertDateAndTimeToFormat for today', () => {
      const today = new Date();
      const formattedDate = dateService.convertDateAndTimeToFormat(
        today.toString(),
      );
      const expectedString = `сегодня в ${dateService.convertTimeToFormat(today.toString())}`;
      expect(formattedDate).toBe(expectedString);
    });

    test('convertDateAndTimeToFormat for yesterday', () => {
      const yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
      const formattedDate = dateService.convertDateAndTimeToFormat(
        yesterday.toString(),
      );
      const expectedString = `вчера в ${dateService.convertTimeToFormat(yesterday.toString())}`;
      expect(formattedDate).toBe(expectedString);
    });

    test('convertDateAndTimeToFormat for other dates', () => {
      const customDate = new Date('2022-01-03T12:00:00');
      const formattedDate = dateService.convertDateAndTimeToFormat(
        customDate.toString(),
      );
      const expectedString = `03.01.2022 в ${dateService.convertTimeToFormat(customDate.toString())}`;
      expect(formattedDate).toBe(expectedString);
    });

    test('convertDateAndTimeToFormat for a date one year ago', () => {
      const oneYearAgo = new Date();
      oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

      const formattedDate = dateService.convertDateAndTimeToFormat(
        oneYearAgo.toString(),
      );
      const expectedString = `${dateService.convertDateToFormat(oneYearAgo)} в ${dateService.convertTimeToFormat(oneYearAgo.toString())}`;

      // Проверяем, что в выводе нет "сегодня в"
      expect(formattedDate).not.toContain('сегодня в');
      // Проверяем, что в выводе нет "вчера в"
      expect(formattedDate).not.toContain('вчера в');
      // Проверяем ожидаемый формат даты и времени
      expect(formattedDate).toBe(expectedString);
    });

    test('convertDateAndTimeToFormat for a date one month ago', () => {
      const oneMonthAgo = new Date();
      oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

      const formattedDate = dateService.convertDateAndTimeToFormat(
        oneMonthAgo.toString(),
      );
      const expectedString = `${dateService.convertDateToFormat(oneMonthAgo)} в ${dateService.convertTimeToFormat(oneMonthAgo.toString())}`;

      // Проверяем, что в выводе нет "сегодня в"
      expect(formattedDate).not.toContain('сегодня в');
      // Проверяем, что в выводе нет "вчера в"
      expect(formattedDate).not.toContain('вчера в');
      // Проверяем ожидаемый формат даты и времени
      expect(formattedDate).toBe(expectedString);
    });

    test('convertDateAndTimeToFormat for a date one month and year ago', () => {
      const oneMonthAndYearAgo = new Date();
      oneMonthAndYearAgo.setMonth(oneMonthAndYearAgo.getMonth() - 1);
      oneMonthAndYearAgo.setFullYear(oneMonthAndYearAgo.getFullYear() - 1);

      const formattedDate = dateService.convertDateAndTimeToFormat(
        oneMonthAndYearAgo.toString(),
      );
      // eslint-disable-next-line max-len
      const expectedString = `${dateService.convertDateToFormat(oneMonthAndYearAgo)} в ${dateService.convertTimeToFormat(oneMonthAndYearAgo.toString())}`;

      // Проверяем, что в выводе нет "сегодня в"
      expect(formattedDate).not.toContain('сегодня в');
      // Проверяем, что в выводе нет "вчера в"
      expect(formattedDate).not.toContain('вчера в');
      // Проверяем ожидаемый формат даты и времени
      expect(formattedDate).toBe(expectedString);
    });
  });
});
