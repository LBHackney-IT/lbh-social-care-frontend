import { render } from '@testing-library/react';

import { SavedForms } from './SaveFormData';
import * as saveData from 'utils/saveData';

jest.mock('utils/saveData', () => ({
  getData: jest.fn(),
}));

describe('SaveFormData component', () => {
  it('should render both types of forms', async () => {
    jest.spyOn(saveData, 'getData').mockImplementationOnce(() => ({
      first: {
        formPath: '/form/foo-bar/',
        timeStamp: '22/12/2020',
        title: 'Foo Bar',
        step: 'foo',
      } as saveData.BasicData,
      second: {
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
