// import { act, fireEvent, render } from '@testing-library/react';

// jest.mock('next/router', () => ({
//   replace: jest.fn(),
// }));

// import SearchCasesForm from './SearchCasesForm';

// describe(`SearchCasesForm`, () => {
//   const props = {
//     onFormSubmit: jest.fn(),
//     query: {},
//     user: {
//       name: 'i am a user',
//     },
//   };

//   it('should pass to onFormSubmit the form values', async () => {
//     const { getByRole, getByLabelText } = render(
//       <SearchCasesForm {...props} />
//     );

//     const firstNameInput = getByLabelText('First name:');
//     fireEvent.change(firstNameInput, { target: { value: 'foo' } });

//     await act(async () => {
//       fireEvent.submit(getByRole('form'));
//     });
//     expect(props.onFormSubmit).toHaveBeenCalledWith({
//       first_name: 'foo',
//       last_name: '',
//       case_note_type: '',
//       exact_match: false,
//     });
//   });

//   it('should initialise the form with the passed query', async () => {
//     const { getByRole } = render(
//       <SearchCasesForm {...props} query={{ first_name: 'bar' }} />
//     );
//     await act(async () => {
//       fireEvent.submit(getByRole('form'));
//     });
//     expect(props.onFormSubmit).toHaveBeenCalledWith({
//       first_name: 'bar',
//       last_name: '',
//       case_note_type: '',
//       exact_match: false,
//     });
//   });
// });
