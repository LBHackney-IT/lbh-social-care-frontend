import { render, act, fireEvent } from '@testing-library/react';

import SelectWorker from './SelectWorker';

import { mockedWorker, userFactory } from 'factories/workers';

describe('SelectWorker component', () => {
  it('should render a worker', () => {
    const { asFragment } = render(
      <SelectWorker
        records={[mockedWorker]}
        callback={(value: any) => console.log(value)}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it('should display headers correctly', () => {
    const { getByText } = render(
      <SelectWorker
        records={[mockedWorker]}
        callback={(value: any) => console.log(value)}
      />
    );
    expect(getByText('Select')).toBeInTheDocument();
    expect(getByText('Name')).toBeInTheDocument();
    expect(getByText('Total allocations')).toBeInTheDocument();
  });
  it('should display name and worker count correctly', () => {
    const { getByTestId, queryAllByText } = render(
      <SelectWorker
        records={[mockedWorker]}
        callback={(value: any) => console.log(value)}
      />
    );
    expect(queryAllByText('Foo Bar')[0]).toBeInTheDocument();
    expect(queryAllByText('Foo Bar')[1]).toBeInTheDocument();
    expect(getByTestId('allocationCount')).toBeInTheDocument();
  });
  it('should display multiple workers correctly', () => {
    const { getByText, queryAllByText } = render(
      <SelectWorker
        records={[
          userFactory.build({
            firstName: 'Roby',
            lastName: 'Robinson',
            allocationCount: 90,
          }),
          userFactory.build({
            firstName: 'Mary',
            lastName: 'Johnson',
            allocationCount: 0,
          }),
        ]}
        callback={(value: any) => console.log(value)}
      />
    );
    expect(queryAllByText('Roby Robinson')[1]).toBeInTheDocument();
    expect(queryAllByText('Mary Johnson')[1]).toBeInTheDocument();
    expect(getByText('90')).toBeInTheDocument();
    expect(getByText('0')).toBeInTheDocument();
  });

  it('should execute the callback on selection', () => {
    const callback = jest.fn();

    const { queryAllByText } = render(
      <SelectWorker
        records={[
          userFactory.build({
            id: 999,
            firstName: 'Roby',
            lastName: 'Robinson',
            allocationCount: 90,
          }),
          userFactory.build({
            firstName: 'Mary',
            lastName: 'Johnson',
            allocationCount: 0,
          }),
        ]}
        callback={callback}
      />
    );

    act(() => {
      fireEvent.click(queryAllByText('Roby Robinson')[0]);
    });

    expect(callback).toHaveBeenCalledWith('999');
  });
});
