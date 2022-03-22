import { render } from '@testing-library/react';
import DeallocateTeamWorker from './DeallocateTeamWorker';
import { mockedResident } from 'factories/residents';

jest.mock('next/router', () => ({
  useRouter: () => ({
    id: 12,
    allocationId: 123,
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
    teamName: 'TEAMNAME',
  };

  it('should load the page correctly', async () => {
    const { getByText, queryByText } = render(
      <DeallocateTeamWorker {...props} />
    );

    expect(getByText('Deallocation details')).toBeInTheDocument();
    expect(getByText('Reason for deallocation')).toBeInTheDocument();
    expect(getByText('Select a deallocation date')).toBeInTheDocument();
    expect(
      getByText('TEAMNAME Team, allocated 31/12/1969')
    ).toBeInTheDocument();
  });

  it('should load the worker page correctly', async () => {
    props.type = 'worker';

    const { getByText } = render(<DeallocateTeamWorker {...props} />);

    expect(
      getByText(
        `Foo Bar, social worker (TEAMNAME Team), allocated ${allocationDate.toLocaleDateString()}`
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
});
