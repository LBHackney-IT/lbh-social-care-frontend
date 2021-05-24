import allForms from './forms.json';
import { Form } from './forms.types';

const formData: Form[] = [];

for (let i = 0; i < allForms[0].length; i++) {
  const form = allForms[i][0] as unknown as Form;

  formData.push(form);
}

export default formData;
