import { render } from '@testing-library/react';

import SavedForms from './SaveFormData';
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
    const { queryByText, asFragment } = render(<SavedForms />);
    expect(asFragment()).toMatchSnapshot();
    expect(queryByText('Displaying (2) unfinished forms')).toBeInTheDocument();
  });

  it('should display no forms in progress message', () => {
    const { queryByText } = render(<SavedForms />);
    expect(
      queryByText('You have no incomplete forms right now.')
    ).toBeInTheDocument();
  });
});
