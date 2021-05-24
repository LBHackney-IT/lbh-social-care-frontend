import * as Yup from 'yup';

export const startSchema = Yup.object().shape({
  socialCareId: Yup.number()
    .typeError('ID can only contain numbers')
    .integer('ID can only contain numbers')
    .required('Please provide an ID'),
  formId: Yup.string().required('Please choose a form'),
});
