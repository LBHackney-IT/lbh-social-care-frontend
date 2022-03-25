import { render, act, fireEvent } from '@testing-library/react';
import DeallocateTeamWorker from './DeallocateTeamWorker';
import { mockedResident } from 'factories/residents';
import * as allocatedWorkerAPI from 'utils/api/allocatedWorkers';

jest.mock('next/router', () => ({
  useRouter: () => ({
    id: 123,
    allocationId: 12,
    asPath: 'path',
    push: jest.fn(),
    replace: jest.fn(),
  }),
}));
jest.mock('components/Spinner/Spinner', () => () => 'MockedSpinner');

describe(`DeallocateTeamWorker`, () => {
  const allocationDate = new Date(-10);
  const props = {
    type: 'team',
    resident: mockedResident,
    allocationId: 12,
    allocationStartDate: allocationDate,
    allocatedWorkerTeam: 'TEAMNAME',
    allocatedWorker: 'John Doe',
  };

  it('should load the page correctly', async () => {
    const { getByText } = render(<DeallocateTeamWorker {...props} />);

    expect(getByText('Deallocation details')).toBeInTheDocument();
    expect(getByText('Reason for deallocation')).toBeInTheDocument();
    expect(getByText('Select a deallocation date')).toBeInTheDocument();
    expect(
      getByText(
        `TEAMNAME Team, allocated ${allocationDate.toLocaleDateString()}`
      )
    ).toBeInTheDocument();
  });

  it('should load the worker page correctly', async () => {
    props.type = 'worker';

    const { getByText } = render(<DeallocateTeamWorker {...props} />);

    expect(
      getByText(
        `John Doe, social worker (TEAMNAME Team), allocated ${allocationDate.toLocaleDateString()}`
      )
    ).toBeInTheDocument();
  });

  it('should load the worker with no team specified', async () => {
    const props = {
      type: 'worker',
      resident: mockedResident,
      allocationId: 12,
      allocatedWorker: 'John Doe',
      allocationStartDate: allocationDate,
    };

    const { getByText } = render(<DeallocateTeamWorker {...props} />);

    expect(
      getByText(
        `John Doe, social worker, allocated ${allocationDate.toLocaleDateString()}`
      )
    ).toBeInTheDocument();
  });

  it('should load the team page correctly', async () => {
    props.type = 'team';

    const { getByText } = render(<DeallocateTeamWorker {...props} />);

    expect(
      getByText(
        `TEAMNAME Team, allocated ${allocationDate.toLocaleDateString()}`
      )
    ).toBeInTheDocument();
  });

  it('should enable the button when the text field is filled in and the date is valid', async () => {
    props.type = 'team';

    const { getByTestId } = render(<DeallocateTeamWorker {...props} />);

    const input = getByTestId('deallocationReason');
    const submitbutton = getByTestId('submitbutton');

    fireEvent.change(input, { target: { value: 'this is some text' } });
    expect(submitbutton).toBeEnabled();
  });

  it('should render and submit correctly', async () => {
    jest.spyOn(allocatedWorkerAPI, 'deallocateTeamWorker');

    const { getByRole, getByTestId } = render(
      <DeallocateTeamWorker {...props} />
    );

    const input = getByTestId('deallocationReason');

    await act(async () => {
      fireEvent.change(input, { target: { value: 'This is the reason' } });
      fireEvent.click(getByTestId('deallocationDate'));
    });
    await act(async () => {
      fireEvent.submit(getByRole('form'));
    });

    expect(allocatedWorkerAPI.deallocateTeamWorker).toHaveBeenCalled();
  });
});
