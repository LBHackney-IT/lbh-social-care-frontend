import { useRouter } from 'next/router';

import Seo from 'components/Layout/Seo/Seo';
import BackButton from 'components/Layout/BackButton/BackButton';
import CaseRecap from 'components/Cases/CaseRecap/CaseRecap';
import PersonView from 'components/PersonView/PersonView';

const CaseView = (): React.ReactElement => {
  const {
    query: { id, recordId, is_historical },
  } = useRouter();
  return (
    <>
      <Seo title={`#${recordId} record`} />
      <BackButton />
      <h1 className="govuk-fieldset__legend--l gov-weight-lighter">
        Case note for
      </h1>
      <PersonView personId={Number(id as string)} expandView>
        <div className="govuk-!-margin-top-7">
          <CaseRecap
            personId={Number(id as string)}
            recordId={recordId as string}
            is_historical={Boolean(is_historical as string)}
          />
        </div>
      </PersonView>
    </>
  );
};

export default CaseView;
