import ErrorMessage from 'components/ErrorMessage/ErrorMessage';
import { useCaseStatuses } from 'utils/api/caseStatus';
import { Resident, CaseStatus, CaseStatusMapping } from 'types';
import styles from './CaseStatusDetails.module.scss';
import Link from 'next/link';
import s from 'stylesheets/Section.module.scss';
import CaseStatusDetailsTable from './CaseStatusDetailsTable';

interface Props {
  person: Resident;
}

const CaseStatusDetails = ({ person }: Props): React.ReactElement => {
  const { data: caseStatuses, error } = useCaseStatuses(person.id);

  // const caseStatuses = [
  //   {
  //     id: 1,
  //     notes: 'this is a note',
  //     startDate: '2021-08-12T14:35:37.7023130',
  //     type: 'CIN',
  //   },
  //   {
  //     fields: [
  //       {
  //         name: 'category',
  //         description: 'Category of child protection plan',
  //         selectedOption: { description: 'Neglect', name: 'C1' },
  //       },
  //     ],

  //     endDate: '',
  //     id: 2,
  //     notes: 'this is a note',
  //     startDate: '2021-08-12T14:35:37.7023130',
  //     type: 'CIN',
  //   },
  //   {
  //     fields: [
  //       {
  //         name: 'legalStatus',
  //         description: "What is the child's legal status?",
  //         //update selected option lac_legal_status_options
  //         selectedOption: { description: 'Interim care order', name: 'C1' },
  //       },
  //       {
  //         name: 'placementType',
  //         description: 'What is the placement type?',
  //         //update selected option lac_placement_type_options
  //         selectedOption: {
  //           description:
  //             'Placed for adoption with parental/guardian consent with current foster carer(s) (under Section 19 of the Adoption and Children Act 2002) or with a freeing order where parental/guardian consent has been given (under Section 18(1)(a) of the Adoption Act 1976)',
  //           name: 'A3',
  //         },
  //       },
  //     ],

  //     endDate: '',
  //     id: 3,
  //     notes: 'this is a note',
  //     startDate: '2021-08-12T14:35:37.7023130',
  //     type: 'LAC',
  //   },
  // ];

  // const scheduledCaseStatus: CaseStatus[] = [
  //   {
  //     fields: [
  //       {
  //         name: 'legalStatus',
  //         description: "What is the child's legal status?",
  //         //update selected option lac_legal_status_options
  //         selectedOption: { description: 'Interim care order', name: 'C1' },
  //       },
  //       {
  //         name: 'placementType',
  //         description: 'What is the placement type?',
  //         //update selected option lac_placement_type_options
  //         selectedOption: {
  //           description:
  //             'Placed for adoption with parental/guardian consent with current foster carer(s) (under Section 19 of the Adoption and Children Act 2002) or with a freeing order where parental/guardian consent has been given (under Section 18(1)(a) of the Adoption Act 1976)',
  //           name: 'A3',
  //         },
  //       },
  //     ],
  //     endDate: '2021-08-13T14:35:37.7023130',
  //     id: 3,
  //     notes: 'this is a note',
  //     startDate: '2021-08-12T14:35:37.7023130',
  //     type: 'LAC',
  //   },
  // ];
  // const error = undefined;

  console.log('caseStatus', caseStatuses);
  if (error) {
    return (
      <ErrorMessage label="There was a problem with getting case status." />
    );
  }

  if (!caseStatuses || caseStatuses?.length === 0) {
    return <></>;
  }
  return (
    <>
      {caseStatuses.map((status: CaseStatus) => {
        return (
          <div
            key={status.id}
            className={styles.caseStatusDesign}
            data-testid="case_status_details"
          >
            <section className="govuk-!-margin-bottom-8">
              <div className={s.heading}>
                <h2 className="govuk-!-margin-top-3">
                  {CaseStatusMapping[status.type]}
                </h2>
                <Link
                  href={{
                    pathname: `/people/${person.id}/case-status/${status.id}/edit/`,
                    query: { type: status.type },
                  }}
                >
                  Edit / End
                </Link>
              </div>

              <CaseStatusDetailsTable status={status} />
              <CaseStatusDetailsTable
                tableName="Scheduled changes"
                styleType={styles.scheduledStatusFont}
                status={status}
              />

              <CaseStatusDetailsTable
                tableName="Previous version"
                styleType={styles.previousStatusFont}
                status={status}
              />
            </section>
          </div>
        );
      })}
    </>
  );
};
export default CaseStatusDetails;
