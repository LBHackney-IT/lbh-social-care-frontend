import { render } from '@testing-library/react';
import { SavedForms } from './SaveFormData';
import { getDataIncludes } from 'utils/saveData';

jest.mock('utils/saveData', () => ({
  getDataIncludes: jest.fn(),
}));

describe('SaveFormData component', () => {
  it('should render both types of forms', async () => {
    getDataIncludes.mockImplementationOnce(() => [
      {
        formPath: '/form/foo-bar/',
        timeStamp: '22/12/2020',
        title: 'Foo Bar',
        deleteForm: jest.fn(),
      },
      {
        dateOfBirth: '1984-02-12T00:00:00.0000000',
        firstName: 'Foo',
        formPath: '/form/bar-foo/',
        gender: 'M',
        includesDetails: true,
        lastName: 'Bar',
        mosaicId: '1234',
        nhsNumber: '123',
        step: 'foo',
        timeStamp: '22/12/2020',
        title: 'Foo Bar',
        data: { id: '12345' },
        deleteForm: jest.fn(),
      },
    ]);
    const { getByRole, asFragment } = render(<SavedForms />);
    expect(asFragment()).toMatchSnapshot();
    expect(getByRole('label')).toHaveTextContent(
      'Displaying 2 unfinished form'
    );
  });

  it('should display no forms in progress message', () => {
    const { getByRole } = render(<SavedForms />);
    expect(getByRole('label')).toHaveTextContent(
      `You don't have any incomplete form, well done!`
    );
  });
});
