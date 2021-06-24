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
    const { asFragment } = render(<SavedForms />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should display nothing if there are no forms in progress', () => {
    const { queryByText } = render(<SavedForms />);
    expect(queryByText('Forms saved to this browser')).toBeFalsy();
  });
});
