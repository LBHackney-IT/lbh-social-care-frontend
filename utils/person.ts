import ETHNICITIES from 'data/ethnicities';

export const getMacroEthnicity = (subEthnicity: string): string | undefined =>
  Object.entries(ETHNICITIES).find(([, subEthnicities]) =>
    subEthnicities.find(({ value }) => value === subEthnicity)
  )?.[0];

export const getEthnicityName = (subEthnicity: string): string | undefined => {
  let ethnicityName;
  Object.values(ETHNICITIES).find((subEthnicities) =>
    subEthnicities.find(
      ({ value, text }) => (ethnicityName = value === subEthnicity && text)
    )
  );
  return ethnicityName || undefined;
};
