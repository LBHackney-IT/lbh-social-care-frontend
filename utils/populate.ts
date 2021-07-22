const caseNoteFormId =
  '1FAIpQLSchNVVlwgQwwMHNdmweNPSZUtvKt0hOXFi9lj8na3F-MknFyw';

/** apply autopopulation query parameters to child google form urls */
export const populateChildForm = (
  firstName: string,
  lastName: string,
  mosaicId: number,
  userName: string,
  url?: string
): string => {
  const fullName = `${firstName} ${lastName}`;
  return url?.includes(caseNoteFormId)
    ? `?entry.91559572=${fullName}&entry.323945892=${mosaicId}&entry.824752118=${userName}`
    : `?entry.323945892=${mosaicId}&entry.91559572=${firstName}&entry.1999530701=${lastName}&entry.432615953=${firstName}&entry.809765129=${lastName}&entry.1802043044=${mosaicId}&entry.787982027=${firstName}&entry.926422462=${lastName}&entry.2022397649=${mosaicId}&entry.529016216=${userName}&entry.360061230=${userName}`;
};
