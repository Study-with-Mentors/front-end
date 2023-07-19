export type CalculateDifferencesValues = {
  pastDiff: number;
  currentDiff: number;
};

const calculateDifferences = (
  pastValue: number,
  currentValue: number
): number => {
  var returnValue: number = 0;

  returnValue = currentValue - pastValue;

  return returnValue;
};

export const calculateMultipleDifferences = (
  secondPastValue: number,
  pastValue: number,
  currentValue: number
): CalculateDifferencesValues => {
  const pastDiff: number = calculateDifferences(secondPastValue, pastValue);
  const currentDiff: number = calculateDifferences(pastValue, currentValue);
  const returnValue: CalculateDifferencesValues = {
    pastDiff,
    currentDiff,
  };
  return returnValue;
};
