import ETHNICITIES from 'data/ethnicities';

export const getMacroEthnicity = (subEthnicity: string): string | undefined =>
  Object.entries(ETHNICITIES).find(([, subEthnicities]) =>
    subEthnicities.find(({ value }) => value === subEthnicity)
  )?.[0];
