import { render, fireEvent } from '@testing-library/react';
import * as caseStatusApi from 'utils/api/caseStatus';
import CaseStatusDetails from './CaseStatusDetails';
import { mockedAPIservererror } from 'factories/APIerrors';
import {
  mockedCaseStatusFactory,
  mockedPersonCaseStatusFactory,
} from 'factories/caseStatus';
import { mockedResident } from 'factories/residents';

jest.mock('next/router', () => ({
  useRouter: () => ({
    asPath: 'path',
    push: jest.fn(),
  }),
  reload: jest.fn(),
}));

describe('CaseStatusDetail component', () => {
  it("displays nothing if there's no case status", async () => {
    jest.spyOn(caseStatusApi, 'GetCaseStatus').mockImplementation(() => ({
      data: mockedPersonCaseStatusFactory.build({
        personId: mockedResident.id,
        caseStatuses: [],
      }),
      isValidating: false,
      mutate: jest.fn(),
      revalidate: jest.fn(),
    }));

    const { queryByText } = render(
      <CaseStatusDetails person={mockedResident} />
    );

    expect(queryByText('Child in need')).not.toBeInTheDocument();
  });

  it('displays correctly the start date', async () => {
    jest.spyOn(caseStatusApi, 'GetCaseStatus').mockImplementation(() => ({
      data: mockedPersonCaseStatusFactory.build({
        personId: mockedResident.id,
        caseStatuses: [
          mockedCaseStatusFactory.build({
            type: 'CIN',
            startDate: '2021-09-09',
          }),
        ],
      }),
      isValidating: false,
      mutate: jest.fn(),
      revalidate: jest.fn(),
    }));

    const { getByTestId } = render(
      <CaseStatusDetails person={mockedResident} />
    );

    const elements = getByTestId('start_date');
    expect(elements).not.toBeNull();
  });

  it('displays correctly the end date', async () => {
    jest.spyOn(caseStatusApi, 'GetCaseStatus').mockImplementation(() => ({
      data: mockedPersonCaseStatusFactory.build({
        personId: mockedResident.id,
        caseStatuses: [
          mockedCaseStatusFactory.build({
            type: 'CIN',
            startDate: '2021-09-09',
            endDate: '2021-12-09',
          }),
        ],
      }),
      isValidating: false,
      mutate: jest.fn(),
      revalidate: jest.fn(),
    }));

    const { getByTestId } = render(
      <CaseStatusDetails person={mockedResident} />
    );
    const startDate = getByTestId('start_date');
    const endDate = getByTestId('end_date');

    expect(startDate).not.toBeNull();
    expect(endDate).not.toBeNull();
  });

  it('displays the notes of a person when the detail panel is expanded', async () => {
    jest.spyOn(caseStatusApi, 'GetCaseStatus').mockImplementation(() => ({
      data: mockedPersonCaseStatusFactory.build({
        personId: mockedResident.id,
        caseStatuses: [
          mockedCaseStatusFactory.build({
            type: 'CIN',
            notes: 'This is a note',
          }),
        ],
      }),
      isValidating: false,
      mutate: jest.fn(),
      revalidate: jest.fn(),
    }));

    const { getByTestId, queryByText } = render(
      <CaseStatusDetails person={mockedResident} />
    );

    fireEvent.click(getByTestId('expand_details'));

    expect(queryByText('Child in need')).toBeInTheDocument();
    expect(queryByText('This is a note')).toBeInTheDocument();
  });

  it('displays multiple CIN in case they exist', async () => {
    jest.spyOn(caseStatusApi, 'GetCaseStatus').mockImplementation(() => ({
      data: mockedPersonCaseStatusFactory.build({
        personId: mockedResident.id,
        caseStatuses: [
          mockedCaseStatusFactory.build({
            type: 'CIN',
            notes: 'first note',
          }),
          mockedCaseStatusFactory.build({
            type: 'CIN',
            notes: 'second note',
          }),
        ],
      }),
      isValidating: false,
      mutate: jest.fn(),
      revalidate: jest.fn(),
    }));

    const { getAllByTestId } = render(
      <CaseStatusDetails person={mockedResident} />
    );

    const elements = getAllByTestId('expand_details');
    expect(elements.length).toBe(2);
  });

  it('displays an error if API error', async () => {
    jest.spyOn(caseStatusApi, 'GetCaseStatus').mockImplementation(() => ({
      data: undefined,
      error: mockedAPIservererror,
      revalidate: jest.fn(),
      mutate: jest.fn(),
      isValidating: false,
    }));

    const { queryByText } = render(
      <CaseStatusDetails person={mockedResident} />
    );

    expect(
      queryByText(/There was a problem with getting case status./)
    ).toBeInTheDocument();
  });
});
