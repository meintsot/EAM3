const getCurrentMonth = () => new Date().getMonth() + 1;

export const getCurrentExamPeriod = (): string => {
    const currentMonth = getCurrentMonth();
    const currentYearLastTwoDigits: number = new Date().getFullYear() % 100;
    return currentMonth >= 9 || currentMonth <= 2 ? `Χειμερινό-${currentYearLastTwoDigits}` : `Εαρινό-${currentYearLastTwoDigits}`
};

export const getLastThreeExamPeriods = (): Array<string> => {
  const currentMonth = getCurrentMonth();
  const currentYearLastTwoDigits: number = new Date().getFullYear() % 100;

  return currentMonth >= 1 && currentMonth <= 6
    ? [
        `Ιανουάριος ${
          currentYearLastTwoDigits - 1
        }-${currentYearLastTwoDigits}`,
        `Σεπτέμβριος ${currentYearLastTwoDigits - 2}-${
          currentYearLastTwoDigits - 1
        }`,
        `Ιούνιος ${currentYearLastTwoDigits - 2}-${
          currentYearLastTwoDigits - 1
        }`,
      ]
    : currentMonth >= 7 && currentMonth <= 9
    ? [
        `Ιούνιος ${currentYearLastTwoDigits - 1}-${currentYearLastTwoDigits}`,
        `Ιανουάριος ${
          currentYearLastTwoDigits - 1
        }-${currentYearLastTwoDigits}`,
        `Σεπτέμβριος ${currentYearLastTwoDigits - 2}-${
          currentYearLastTwoDigits - 1
        }`,
      ]
    : currentMonth >= 10 && currentMonth <= 12
    ? [
        `Σεπτέμβριος ${
          currentYearLastTwoDigits - 1
        }-${currentYearLastTwoDigits}`,
        `Ιούνιος ${currentYearLastTwoDigits - 1}-${currentYearLastTwoDigits}`,
        `Ιανουάριος ${
          currentYearLastTwoDigits - 1
        }-${currentYearLastTwoDigits}`,
      ]
    : [];
};
