import allForms from './forms.json';
import review3c from './review3C.json';
import { Form } from './forms.types';

const formData: Form[] = [];

for (let i = 0; i < allForms.length; i++) {
  const form = allForms[i] as unknown as Form;
  formData.push(form);
}

formData.push(review3c as unknown as Form);

export default formData;
