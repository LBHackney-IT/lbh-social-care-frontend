import { isBrowser } from 'utils/ssr';
import { Resident } from 'types';

export const SAVE_KEY = 'social-care-forms_v2';

export interface SavedData {
  data: Record<string, unknown>;
  title: string;
  formPath: string;
  timestamp: string;
  step: string;
  personDetails?: Resident;
}

type DataToSave = Omit<SavedData, 'timestamp'>;

export const saveData = (data: DataToSave): void => {
  try {
    const savedForms = localStorage.getItem(SAVE_KEY) || '{}';
    savedForms &&
      localStorage.setItem(
        SAVE_KEY,
        JSON.stringify({
          ...JSON.parse(savedForms),
          [data.formPath]: {
            ...data,
            timestamp: new Date().toLocaleDateString('en-GB'),
          },
        })
      );
  } catch {
    localStorage.removeItem(SAVE_KEY);
  }
};

export const getFormData = (formPath: string): SavedData | undefined => {
  if (isBrowser()) {
    try {
      const savedForms = localStorage.getItem(SAVE_KEY);
      return savedForms && JSON.parse(savedForms)?.[formPath];
    } catch {
      localStorage.removeItem(SAVE_KEY);
    }
  }
};

export const getData = (): Record<string, SavedData> | undefined => {
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
    const savedForms = JSON.parse(localStorage.getItem(SAVE_KEY) || '');
    if (savedForms) delete savedForms[formPath];
    localStorage.setItem(SAVE_KEY, JSON.stringify(savedForms));
  } catch {
    localStorage.removeItem(SAVE_KEY);
  }
};
