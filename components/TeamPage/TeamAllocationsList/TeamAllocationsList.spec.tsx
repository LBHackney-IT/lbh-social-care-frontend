import TeamAllocationsList from './TeamAllocationsList';

import { render } from '@testing-library/react';
import { workerAllocationFactory, allocationFactory } from 'factories/teams';
import * as teamWorkersAPI from 'utils/api/allocatedWorkers';
import { AllocationData } from 'types';
import { addDays } from 'date-fns';

import { SWRInfiniteResponse } from 'swr';
jest.mock('utils/api/allocatedWorkers');

describe('TeamAllocationsList component', () => {
  it('displays the waiting list correctly', async () => {
    jest
      .spyOn(teamWorkersAPI, 'useAllocationsByTeam')
      .mockImplementation(() => {
        const response = {
          data: [
            workerAllocationFactory.build({
              allocations: [
                allocationFactory.build({
                  allocationStartDate: addDays(new Date(), 3).toISOString(),
                }),
              ],
            }),
          ],
        } as unknown as SWRInfiniteResponse<AllocationData, Error>;

        return response;
      });

    const { queryByText } = render(
      <TeamAllocationsList teamId={123} type="unallocated" />
    );

    expect(queryByText('Medium')).toBeInTheDocument();
    expect(queryByText('Added to waitlist:')).toBeInTheDocument();
    expect(queryByText('Foo Bar')).toBeInTheDocument();
    expect(queryByText('#1')).toBeInTheDocument();
  });
  it('displays the active cases correctly', async () => {
    jest
      .spyOn(teamWorkersAPI, 'useAllocationsByTeam')
      .mockImplementation(() => {
        const response = {
          data: [
            workerAllocationFactory.build({
              allocations: [
                allocationFactory.build({
                  allocationStartDate: addDays(new Date(), 3).toISOString(),
                }),
              ],
            }),
          ],
        } as unknown as SWRInfiniteResponse<AllocationData, Error>;

        return response;
      });
    const { queryByText } = render(
      <TeamAllocationsList teamId={123} type="allocated" />
    );

    expect(queryByText('Medium')).toBeInTheDocument();
    expect(queryByText('Worker allocation:')).toBeInTheDocument();
    expect(queryByText('#1')).toBeInTheDocument();
    expect(queryByText('Foo Bar')).toBeInTheDocument();
  });
  it('displays the sorting element correctly', async () => {
    jest
      .spyOn(teamWorkersAPI, 'useAllocationsByTeam')
      .mockImplementation(() => {
        const response = {
          data: [
            workerAllocationFactory.build({
              allocations: [
                allocationFactory.build({
                  allocationStartDate: addDays(new Date(), 3).toISOString(),
                }),
              ],
            }),
          ],
        } as unknown as SWRInfiniteResponse<AllocationData, Error>;

        return response;
      });
    const { queryByText } = render(
      <TeamAllocationsList teamId={123} type="allocated" />
    );

    expect(queryByText('Sort by')).toBeInTheDocument();
    expect(queryByText('Priority')).toBeInTheDocument();
    expect(queryByText('Date added to team')).toBeInTheDocument();
  });
  it('displays "No active cases for the selected team" if there are no allocated elements', async () => {
    jest
      .spyOn(teamWorkersAPI, 'useAllocationsByTeam')
      .mockImplementation(() => {
        const response = {
          data: [
            workerAllocationFactory.build({
              allocations: [],
            }),
          ],
        } as unknown as SWRInfiniteResponse<AllocationData, Error>;

        return response;
      });
    const { queryByText } = render(
      <TeamAllocationsList teamId={123} type="allocated" />
    );

    expect(queryByText('Sort by')).toBeInTheDocument();
    expect(
      queryByText('No active cases for the selected team')
    ).toBeInTheDocument();
  });
  it('displays "No elements in the waiting list for the selected team" if there are no elements', async () => {
    jest
      .spyOn(teamWorkersAPI, 'useAllocationsByTeam')
      .mockImplementation(() => {
        const response = {
          data: [
            workerAllocationFactory.build({
              allocations: [],
            }),
          ],
        } as unknown as SWRInfiniteResponse<AllocationData, Error>;

        return response;
      });

    const { queryByText } = render(
      <TeamAllocationsList teamId={123} type="unallocated" />
    );

    expect(queryByText('Sort by')).toBeInTheDocument();
    expect(
      queryByText('No elements in the waiting list for the selected team')
    ).toBeInTheDocument();
  });
  it('displays the correct amount of days in the difference between today and allocation date', async () => {
    jest
      .spyOn(teamWorkersAPI, 'useAllocationsByTeam')
      .mockImplementation(() => {
        const response = {
          data: [
            workerAllocationFactory.build({
              allocations: [
                allocationFactory.build({
                  allocationStartDate: addDays(new Date(), -3).toString(),
                }),
              ],
            }),
          ],
        } as unknown as SWRInfiniteResponse<AllocationData, Error>;

        return response;
      });

    const { getByText } = render(
      <TeamAllocationsList teamId={123} type="allocated" />
    );

    expect(getByText(/3 days ago/i)).toBeInTheDocument();
  });
});
