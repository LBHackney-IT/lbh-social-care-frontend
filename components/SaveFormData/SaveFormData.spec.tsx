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
    const { getByText, asFragment } = render(<SavedForms />);
    expect(asFragment()).toMatchSnapshot();
    expect(getByText('You have 2 unfinished forms'));
  });

  it('should display no forms in progress message', () => {
    const { getByText } = render(<SavedForms />);
    expect(getByText(`You have no incomplete forms right now.`));
  });
});
