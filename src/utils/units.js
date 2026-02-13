export const UNIT_METRIC = "metric";
export const UNIT_IMPERIAL = "imperial";

export const getWeightUnitLabel = (unit) =>
  unit === UNIT_IMPERIAL ? "lbs" : "kg";
export const getLengthUnitLabel = (unit) =>
  unit === UNIT_IMPERIAL ? "in" : "cm";

export const convertWeightToDisplay = (weightKg, unit) => {
  if (!weightKg) return "";
  if (unit === UNIT_IMPERIAL) {
    return (parseFloat(weightKg) * 2.20462).toFixed(1);
  }
  return weightKg;
};

export const convertWeightToStorage = (weightDisplay, unit) => {
  if (!weightDisplay) return 0;
  if (unit === UNIT_IMPERIAL) {
    return (parseFloat(weightDisplay) / 2.20462).toFixed(1);
  }
  return weightDisplay;
};

export const convertLengthToDisplay = (lengthCm, unit) => {
  if (!lengthCm) return "";
  if (unit === UNIT_IMPERIAL) {
    return (parseFloat(lengthCm) * 0.393701).toFixed(1);
  }
  return lengthCm;
};

export const convertLengthToStorage = (lengthDisplay, unit) => {
  if (!lengthDisplay) return 0;
  if (unit === UNIT_IMPERIAL) {
    return (parseFloat(lengthDisplay) / 0.393701).toFixed(1);
  }
  return lengthDisplay;
};
