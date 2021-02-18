/* eslint-disable react/prop-types */
import { render } from '@testing-library/react';

import { UserContext } from 'components/UserContext/UserContext';
import FormCasesWrapper from './FormCasesWrapper';

import { useResident } from 'utils/api/residents';
import { addCase } from 'utils/api/cases';

let mockOnFormSubmit;

jest.mock('next/router', () => ({
  events: { on: jest.fn() },
  useRouter: () => ({
    replace: jest.fn(),
  }),
}));

jest.mock('utils/api/residents', () => ({
  useResident: jest.fn(),
}));

jest.mock('utils/api/cases', () => ({
  addCase: jest.fn(),
}));

jest.mock('components/FormWizard/FormWizard', () => ({ onFormSubmit }) => {
  mockOnFormSubmit = onFormSubmit;
  return <div>mockFormWizard</div>;
});

describe(`FormCasesWrapper`, () => {
  const props = {
    personId: '123',
    title: 'I am a title',
    form: { title: '', path: '', steps: [] },
    formNameOverall: 'i am the form_name_overall',
  };

  it('should work properly if the user exist', async () => {
    useResident.mockImplementation(() => ({
      data: {
        firstName: 'i am the user',
        lastName: '',
        mosaicId: '123',
        dateOfBirth: '2020-11-11',
        ageContext: 'A',
      },
    }));
    const { findByText } = render(
      <UserContext.Provider
        value={{
          user: { name: 'foo', email: 'i am the email' },
        }}
      >
        <FormCasesWrapper {...props} />
      </UserContext.Provider>
    );
    await findByText('i am the user');
    mockOnFormSubmit({ foo: 'bar' });
    expect(addCase).toHaveBeenCalledWith({
      mosaicId: '123',
      firstName: 'i am the user',
      lastName: '',
      ageContext: 'A',
      workerEmail: 'i am the email',
      caseFormData:
        '{"form_name_overall":"i am the form_name_overall","foo":"bar"}',
    });
  });
});
