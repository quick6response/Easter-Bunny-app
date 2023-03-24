const intl = new Intl.NumberFormat('ru-RU');

export const utilsService = {
  random: (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },
  numberFormat: (number: number) => {
    return intl.format(number);
  },
  declOfNum: (number: number, titles: string[]): string => {
    const cases = [2, 0, 1, 1, 1, 2];
    return `${number} ${
      titles[
        number % 100 > 4 && number % 100 < 20
          ? 2
          : cases[number % 10 < 5 ? number % 10 : 5]
      ]
    }`;
  },
};
