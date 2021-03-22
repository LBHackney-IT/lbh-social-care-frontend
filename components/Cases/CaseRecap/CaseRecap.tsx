import CaseNote from 'components/Cases/CaseRecap/CaseNote';
import HistoricNote from 'components/Cases/CaseRecap/HistoricNote';

interface Props {
  personId: number;
  recordId: string;
  is_historical: true | false;
}

const CaseRecap = ({
  personId,
  recordId,
  is_historical,
}: Props): React.ReactElement => {
  if (is_historical) {
    return <HistoricNote recordId={recordId} />;
  }
  return <CaseNote personId={personId} recordId={recordId} />;
};

export default CaseRecap;
