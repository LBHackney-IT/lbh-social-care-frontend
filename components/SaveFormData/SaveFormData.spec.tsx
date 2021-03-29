import { render } from '@testing-library/react';

import { SavedForms } from './SaveFormData';
import * as saveData from 'utils/saveData';
import { mockedResident } from 'factories/residents';

jest.mock('utils/saveData', () => ({
  getData: jest.fn(),
}));

describe('SaveFormData component', () => {
  it('should render both types of forms', async () => {
    jest.spyOn(saveData, 'getData').mockImplementationOnce(() => ({
      first: {
        data: { id: '12345' },
        formPath: '/form/bar-foo/',
        timestamp: '22/12/2020',
        title: 'Foo Bar',
        step: 'foo',
      },
      second: {
        personDetails: mockedResident,
        formPath: '/form/bar-foo/',
        step: 'foo',
        timestamp: '22/12/2020',
        title: 'Foo Bar',
        data: { id: '54321' },
      },
    }));
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
