import { useRouter } from 'next/router';

import Seo from 'components/Layout/Seo/Seo';
import BackButton from 'components/Layout/BackButton/BackButton';
import HistoricVisit from 'components/Cases/CaseRecap/HistoricVisit';
import PersonView from 'components/PersonView/PersonView';

const CaseView = (): React.ReactElement => {
  const {
    query: { id, recordId },
  } = useRouter();
  return (
    <>
      <Seo title={`#${recordId} record`} />
      <BackButton />
      <h1 className="govuk-fieldset__legend--l gov-weight-lighter">
        Visit for
      </h1>
      <PersonView personId={Number(id as string)} expandView>
        <div className="govuk-!-margin-top-7">
          <HistoricVisit recordId={recordId as string} />
        </div>
      </PersonView>
    </>
  );
};

export default CaseView;
