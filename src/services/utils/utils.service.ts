const intl = new Intl.NumberFormat('ru-RU');

export const utilsService = {
  random: (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },
  numberFormat: (number: number) => {
    return intl.format(number);
  },
  declOfNum: (number: number | string, titles: string[]): string => {
    const cases = [2, 0, 1, 1, 1, 2];
    const transformNumber = Number(number);

    return `${number} ${
      titles[
        transformNumber % 100 > 4 && transformNumber % 100 < 20
          ? 2
          : cases[transformNumber % 10 < 5 ? transformNumber % 10 : 5]
      ]
    }`;
  },
  isMobileDevice: () => {
    return !(
      typeof window.orientation !== 'undefined' ||
      navigator.userAgent.includes('IEMobile')
    );
  },
};
