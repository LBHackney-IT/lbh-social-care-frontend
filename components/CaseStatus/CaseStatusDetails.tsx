import ErrorMessage from 'components/ErrorMessage/ErrorMessage';
import { GetCaseStatus } from 'utils/api/caseStatus';
import { Resident } from 'types';
import styles from './CaseStatusDetails.module.scss';
interface Props {
  person: Resident;
}

const CaseStatusDetails = ({ person }: Props): React.ReactElement => {
  const { data: caseStatusData, error } = GetCaseStatus(person.id);

  if (error) {
    return (
      <ErrorMessage label="There was a problem with getting case status." />
    );
  }

  if (!caseStatusData) {
    return <></>;
  }

  return (
    <>
      <div className={styles.container}>
        
        <h2>Case statuses</h2>

        {caseStatusData.caseStatuses.map((status) => (
         status.fields.map((item) => (
          
          <div key={status.id} className={styles.caseStatusDesign}>
            <div className={styles.caseStatusDetails}>
              
              <section className="lbh-collapsible" data-module="lbh-collapsible">
                <dl>
                      <div className={styles.align}>
                          <button
                            aria-expanded="false"
                            data-behavior="lbh-collapsible-toggle"
                            className="lbh-collapsible__button"
                            >
                            {status.type && (
                              <>
                                <dt>
                                  {getTypeString(status.type as keyof typeof valueMapping)}{' '}
                                  -{' '}
                                </dt>
                              </>
                            )}

                            {status.startDate && (
                              <>
                                <dt className={styles.date}>Start</dt>
                                <dd>
                                  {status.startDate
                                    ? new Date(status.startDate).toLocaleDateString('en-GB'): new Date(status.endDate).toLocaleDateString('en-GB')}{' '}-{' '}
                                </dd>
                              </>
                            )}  

                            {status.endDate && (
                              <>
                                <dt className={styles.date}>End</dt>
                                <dd>
                                  {new Date(status.endDate).toLocaleDateString('en-GB')}{' '}
                                </dd>
                              </>
                            )}
                              <svg width="17" height="10" viewBox="0 0 17 10">
                                <path d="M2 1.5L8.5 7.5L15 1.5" strokeWidth="3" />
                              </svg>
                        </button>
                      </div>
                
                  
                    <div className="lbh-collapsible__content" data-behavior="lbh-collapsible-content" hidden>
                      
                      {item.selectedOption.name && (
                        <>
                          <dt className={styles.selectedTitles}>Category of need</dt>
                          <dd>{getTypeString(item.selectedOption.name as keyof typeof valueMapping)}</dd>
                        </>
                      )}

                      {status.notes && (
                        <>
                          <dt className={styles.selectedTitles}> Notes </dt>
                          <dd>{status.notes}</dd>
                        </>
                      )}
                    </div>
                </dl>
              </section>
            
            </div>
        </div>
           ))
        ))}
      </div>
    </>
  );
};

const getTypeString = (type: keyof typeof valueMapping): any => {
  return valueMapping[type];
};
const valueMapping = {
  CIN: 'Child in need',
  N1: 'N1 - Abuse or neglect',
  N2: 'N2- Child\'s diability',
  N3: 'N3 - Parental disability or illness',
  N4: 'N4 - Family in acute stress',
  N5: 'N5 - Family dysfunction',
  N6: 'N6 - Socially unacceptable behaviour',
  N7: 'N7 - Low income',
  N8: 'N8 - Absent Parenting',
  N9: 'N9 - Cases other than children in need',
  NO: 'N0 - Not stated'
};

export default CaseStatusDetails;
