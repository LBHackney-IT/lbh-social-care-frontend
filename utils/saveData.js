export const windowGlobal = typeof window !== 'undefined' && window;

export const saveData = (formPath, data, step) => {
  const savedData = {
    step: step,
    data: data,
  };
  try {
    windowGlobal.localStorage.setItem(formPath, JSON.stringify(savedData));
  } catch {
    deleteData(formPath);
  }
};

export const getData = (formPath) => {
  try {
    return JSON.parse(windowGlobal.localStorage.getItem(formPath));
  } catch {
    deleteData(formPath);
  }
};

export const deleteData = (formPath) => {
  windowGlobal.localStorage.removeItem(formPath);
};
