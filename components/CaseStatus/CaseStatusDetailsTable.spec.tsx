import { render } from '@testing-library/react';
import CaseStatusDetailsTable from './CaseStatusDetailsTable';
import {
  mockedCaseStatusFactory,
  mockedStatusField,
  mockedCaseStatusAnswers,
} from 'factories/caseStatus';
import styles from './CaseStatusDetails.module.scss';

jest.mock('next/router', () => ({
  useRouter: () => ({
    asPath: 'path',
    push: jest.fn(),
  }),
  reload: jest.fn(),
}));

describe('CaseStatusDetailsTable component', () => {
  it('displays the table name if the table name is passed in', async () => {
    const { getByTestId } = render(
      <CaseStatusDetailsTable
        status={mockedCaseStatusFactory.build({})}
        tableName={'Previous version'}
      />
    );
    const elements = getByTestId('case_status_table_title');
    expect(elements).not.toBeNull();
  });

  it('displays the start date, if there is no start date in the answers', async () => {
    const { getByTestId, queryByText } = render(
      <CaseStatusDetailsTable
        status={mockedCaseStatusFactory.build({
          id: 1,
          type: 'CIN',
          startDate: '2021-09-09',
          endDate: '',
          answers: [],
        })}
      />
    );

    const elements = getByTestId('start_date');
    expect(elements).not.toBeNull();
    expect(queryByText('09 Sept 2021')).toBeInTheDocument;
  });
  it('displays the end date, if there is no answers', async () => {
    const { getByTestId, queryByText } = render(
      <CaseStatusDetailsTable
        status={mockedCaseStatusFactory.build({
          id: 1,
          type: 'CIN',
          startDate: '2021-09-09',
          endDate: '2022-09-09',
          answers: [],
        })}
      />
    );

    const elements = getByTestId('end_date');
    expect(elements).not.toBeNull();
    expect(queryByText('09 Sept 2022')).toBeInTheDocument;
  });

  it('displays the start date from the answers, if there is one and no end date in the answers', async () => {
    const { getByTestId, queryByText } = render(
      <CaseStatusDetailsTable
        status={mockedCaseStatusFactory.build({
          id: 1,
          type: 'CIN',
          startDate: '2021-09-09',
          endDate: '',
          answers: [mockedStatusField.build({ startDate: '2021-09-08' })],
        })}
      />
    );

    const elements = getByTestId('start_date');
    expect(elements).not.toBeNull();
    expect(queryByText('08 Sept 2021')).toBeInTheDocument;
  });

  it('displays the start and end date', async () => {
    const { getByTestId } = render(
      <CaseStatusDetailsTable
        status={mockedCaseStatusFactory.build({
          id: 1,
          type: 'CIN',
          startDate: '2021-09-09',
          endDate: '2021-09-10',
          answers: [mockedStatusField.build({ startDate: '2021-09-08' })],
        })}
        answers={mockedCaseStatusAnswers.build()}
      />
    );

    const elements = getByTestId('start_end_date');
    expect(elements).not.toBeNull();
  });

  it('displays the an answers, if there is one', async () => {
    const { getByTestId, queryByText } = render(
      <CaseStatusDetailsTable
        status={mockedCaseStatusFactory.build({
          id: 1,
          type: 'CIN',
          startDate: '2021-09-09',
          endDate: '',
          answers: [mockedStatusField.build()],
        })}
        answers={mockedCaseStatusAnswers.build()}
      />
    );

    const elements = getByTestId('case_status_fields');
    expect(elements).not.toBeNull();
    expect(queryByText('Placement Type')).toBeInTheDocument;
    expect(queryByText('K1: Secure children’s homes')).toBeInTheDocument;
  });

  it('displays multiple answers, if there are multiple', async () => {
    const { getByTestId, queryByText } = render(
      <CaseStatusDetailsTable
        status={mockedCaseStatusFactory.build({
          id: 1,
          type: 'LAC',
          startDate: '2021-09-09',
          endDate: '',
        })}
        answers={
          (mockedCaseStatusAnswers.build(),
          mockedCaseStatusAnswers.build({
            status: [
              mockedStatusField.build({ option: 'legalStatus', value: 'C1' }),
            ],
          }))
        }
      />
    );

    const elements = getByTestId('case_status_fields');
    expect(elements).not.toBeNull();
    expect(queryByText('Placement type')).toBeInTheDocument;
    expect(queryByText('K1: Secure children’s homes')).toBeInTheDocument;
    expect(queryByText('Legal status')).toBeInTheDocument;
    expect(queryByText('C1: Interim care order')).toBeInTheDocument;
  });

  it('displays notes if they exist', async () => {
    const { queryByText } = render(
      <CaseStatusDetailsTable
        status={mockedCaseStatusFactory.build({
          id: 1,
          type: 'CIN',
          startDate: '2021-09-09',
          endDate: '2021-09-10',
          notes: 'this is a note',
        })}
      />
    );

    expect(queryByText('this is a note')).toBeInTheDocument();
  });

  it('displays the table in a different style if a style is passed in', async () => {
    const { getByTestId } = render(
      <CaseStatusDetailsTable
        status={mockedCaseStatusFactory.build({})}
        styleType={styles.scheduledStatusFont}
      />
    );
    const elements = getByTestId('case_status_details_table');
    expect(elements.className.includes('scheduledStatusFont')).toBe(true);
  });
});
