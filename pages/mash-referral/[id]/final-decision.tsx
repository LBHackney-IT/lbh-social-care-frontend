import FinalDecisionForm from 'components/MashForms/FinalDecisionForm';
import { MashReferral } from 'types';

interface Props {
  mashReferral: MashReferral;
}

const FinalDecision = ({ mashReferral }: Props): React.ReactElement => {
  return <FinalDecisionForm mashReferral={mashReferral} />;
};
export default FinalDecision;
