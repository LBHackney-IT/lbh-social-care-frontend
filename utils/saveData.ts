import { isBrowser } from 'utils/ssr';

export const SAVE_KEY = 'social-care-forms';

export interface BasicData {
  data: {
    id: string;
  };
  title: string;
  timeStamp: string;
  formPath: string;
  step: string;
  includesDetails?: boolean;
  [key: string]: unknown;
}

export interface DetailedData extends BasicData {
  firstName: string;
  lastName: string;
  dateOfBirth?: string;
}

export const saveData = (
  formPath: string,
  data: Record<string, unknown>,
  title: string,
  step: string,
  includesDetails: boolean,
  personDetails: Record<string, unknown>
): void => {
  const timeStamp = new Date().toLocaleDateString('en-GB');
  const savedData = {
    step,
    data,
    title,
    timeStamp,
    formPath,
    includesDetails,
    ...personDetails,
  };
  try {
    const savedForms = localStorage.getItem(SAVE_KEY);
    savedForms &&
      localStorage.setItem(
        SAVE_KEY,
        JSON.stringify({ ...JSON.parse(savedForms), [formPath]: savedData })
      );
  } catch {
    localStorage.removeItem(SAVE_KEY);
  }
};

export const getFormData = (
  formPath: string
): Record<string, unknown> | undefined => {
  if (isBrowser()) {
    try {
      const savedForms = localStorage.getItem(SAVE_KEY);
      return savedForms && JSON.parse(savedForms)?.[formPath];
    } catch {
      localStorage.removeItem(SAVE_KEY);
    }
  }
};

export const getData = ():
  | Record<string, BasicData | DetailedData>
  | undefined => {
  if (isBrowser()) {
    try {
      const savedForms = localStorage.getItem(SAVE_KEY);
      return savedForms && JSON.parse(savedForms);
    } catch {
      localStorage.removeItem(SAVE_KEY);
    }
  }
};

export const deleteData = (formPath: string): void => {
  try {
    const savedForms = localStorage.getItem(SAVE_KEY);
    if (savedForms) delete JSON.parse(savedForms)[formPath];
    localStorage.setItem(SAVE_KEY, JSON.stringify(savedForms));
  } catch {
    localStorage.removeItem(SAVE_KEY);
  }
};
