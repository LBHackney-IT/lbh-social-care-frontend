import { Factory } from 'fishery';
import { FormValue, FormStatusValue } from 'types';

export const mockedFormValueFactory = Factory.define<FormValue>(() => ({
  name: 'test',
  description: 'description',
  options: [mockedFormStatusValueFactory.build()],
}));

export const mockedFormStatusValueFactory = Factory.define<FormStatusValue>(
  () => ({
    name: 'N1',
    description: 'Noo 1',
  })
);

export const mockedFormValue = [mockedFormValueFactory.build()];
