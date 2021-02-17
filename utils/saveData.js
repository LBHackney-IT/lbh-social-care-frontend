import { isBrowser } from 'utils/ssr';

export const SAVE_KEY = 'social-care-forms';

export const saveData = (
  formPath,
  data,
  title,
  step,
  includesDetails,
  personDetails
) => {
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
    const savedForms = JSON.parse(localStorage.getItem(SAVE_KEY)) || {};
    localStorage.setItem(
      SAVE_KEY,
      JSON.stringify({ ...savedForms, [formPath]: savedData })
    );
  } catch {
    localStorage.removeItem(SAVE_KEY);
  }
};

export const getFormData = (formPath) => {
  if (isBrowser()) {
    try {
      return JSON.parse(localStorage.getItem(SAVE_KEY))?.[formPath];
    } catch {
      localStorage.removeItem(SAVE_KEY);
    }
  }
};

export const getData = () => {
  if (isBrowser()) {
    try {
      return JSON.parse(localStorage.getItem(SAVE_KEY));
    } catch {
      localStorage.removeItem(SAVE_KEY);
    }
  }
};

export const deleteData = (formPath) => {
  try {
    const savedForms = JSON.parse(localStorage.getItem(SAVE_KEY)) || {};
    delete savedForms[formPath];
    localStorage.setItem(SAVE_KEY, JSON.stringify(savedForms));
  } catch {
    localStorage.removeItem(SAVE_KEY);
  }
};
