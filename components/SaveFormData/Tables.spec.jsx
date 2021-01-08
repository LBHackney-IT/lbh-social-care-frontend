import { render, fireEvent } from '@testing-library/react';

import { DetailedTable, StandardTable } from './Tables';

describe('DetailedTable component', () => {
  const props = {
    tableHeader: ['Foo', 'Bar'],
    data: [
      {
        dateOfBirth: '1984-02-12T00:00:00.0000000',
        firstName: 'Foo',
        formPath: '/form/foo-bar/',
        gender: 'M',
        includesDetails: true,
        lastName: 'Bar',
        mosaicId: '1234',
        nhsNumber: '123',
        step: 'foo?id=1234',
        timeStamp: '22/12/2020',
        title: 'Foo Bar',
        data: { id: '12345' },
      },
    ],
    deleteForm: jest.fn(),
  };

  it('should call deleteForm with path', () => {
    const { getByRole } = render(<DetailedTable {...props} />);
    fireEvent.click(getByRole('button'));
    expect(props.deleteForm).toHaveBeenCalled();
    expect(props.deleteForm).toHaveBeenCalledWith('/form/foo-bar/');
  });
});

describe('StandardTable component', () => {
  const props = {
    tableHeader: ['Foo', 'Bar'],
    data: [
      {
        formPath: '/form/foo-bar/',
        timeStamp: '22/12/2020',
        title: 'Foo Bar',
      },
    ],
    deleteForm: jest.fn(),
  };
  it('should render properly', () => {
    const { asFragment } = render(<StandardTable {...props} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should delete row', () => {
    const { getByRole } = render(<StandardTable {...props} />);
    fireEvent.click(getByRole('button'));
    expect(props.deleteForm).toHaveBeenCalled();
    expect(props.deleteForm).toHaveBeenCalledWith('/form/foo-bar/');
  });
});
