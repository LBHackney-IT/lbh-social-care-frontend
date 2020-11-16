const windowGlobal = typeof window !== 'undefined' && window;

export const saveData = (formPath, formData, step) => {
  const data = {
    step: step,
    formData: formData,
  };
  windowGlobal.localStorage.setItem(formPath, JSON.stringify(data));
};

export const getData = (path) => {
  return JSON.parse(windowGlobal.localStorage.getItem(path));
};

export const deleteData = (formPath) => {
  windowGlobal.localStorage.removeItem(formPath);
};
