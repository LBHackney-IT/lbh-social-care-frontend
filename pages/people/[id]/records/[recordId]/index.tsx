import { useRouter } from 'next/router';

import Seo from 'components/Layout/Seo/Seo';
import BackButton from 'components/Layout/BackButton/BackButton';
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
      <BackButton />
      <h1 className="lbh-heading-h1 govuk-!-margin-bottom-7">Case note</h1>
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

export default CaseView;
