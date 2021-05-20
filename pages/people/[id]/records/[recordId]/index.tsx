import { useRouter } from 'next/router';

import Seo from 'components/Layout/Seo/Seo';
import CaseNote from 'components/Cases/CaseRecap/CaseNote';
import HistoricNote from 'components/Cases/CaseRecap/HistoricNote';
import PersonView from 'components/PersonView/PersonView';

const CaseView = (): React.ReactElement => {
  const {
    query: { id, recordId, is_historical },
  } = useRouter();
  return (
    <>
      <Seo title={`#${recordId} record`} />
      <h1 className="govuk-fieldset__legend--l gov-weight-lighter">
        Case note for
      </h1>
      <PersonView personId={Number(id as string)} expandView>
        <div className="govuk-!-margin-top-7">
          {is_historical && <HistoricNote recordId={recordId as string} />}
          {!is_historical && (
            <CaseNote
              personId={Number(id as string)}
              recordId={recordId as string}
            />
          )}
        </div>
      </PersonView>
    </>
  );
};

CaseView.goBackButton = true;

export default CaseView;
