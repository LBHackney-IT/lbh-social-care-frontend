import { render, fireEvent } from '@testing-library/react';

import SavedDataTable from './SavedDataTable';

describe('DetailedTable component', () => {
  const props = {
    tableHeader: ['Foo', 'Bar'],
    savedData: [
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
        timestamp: '22/12/2020',
        title: 'Foo Bar',
        data: { id: '12345' },
      },
    ],
    deleteForm: jest.fn(),
  };

  it('should call deleteForm with path', () => {
    const { getByRole } = render(<SavedDataTable {...props} />);
    fireEvent.click(getByRole('button'));
    expect(props.deleteForm).toHaveBeenCalled();
    expect(props.deleteForm).toHaveBeenCalledWith('/form/foo-bar/');
  });
});

describe('StandardTable component', () => {
  const props = {
    tableHeader: ['Foo', 'Bar'],
    savedData: [
      {
        data: { id: 'foo' },
        formPath: '/form/foo-bar/',
        step: '/form/foo-bar/',
        timestamp: '22/12/2020',
        title: 'Foo Bar',
      },
    ],
    deleteForm: jest.fn(),
  };

  it('should render properly', () => {
    const { asFragment } = render(<SavedDataTable {...props} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should delete row', () => {
    const { getByRole } = render(<SavedDataTable {...props} />);
    fireEvent.click(getByRole('button'));
    expect(props.deleteForm).toHaveBeenCalled();
    expect(props.deleteForm).toHaveBeenCalledWith('/form/foo-bar/');
  });
});
