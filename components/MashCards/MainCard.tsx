import { MashReferral } from 'types';
import ContactCard from './ContactCard';
import InitialDecisionCard from './InitialDecisionCard';
import ScreeningCard from './ScreeningCard';
import FinalDecisionCard from './FinalDecisionCard';

interface Props {
  mashReferrals: MashReferral[];
  filter: string;
  assignWorkerToReferral: (referralId: number, workerId: number) => void;
}

const MainCard = ({
  mashReferrals,
  filter,
  assignWorkerToReferral,
}: Props): React.ReactElement => {
  if (filter === 'contact') {
    return (
      <div data-testid="ContactCard">
        {mashReferrals.map((referral) => (
          <ContactCard key={referral.id} mashReferral={referral} />
        ))}
      </div>
    );
  }
  if (filter === 'initial-decision') {
    return (
      <div data-testid="InitialDecisionCard">
        {mashReferrals.map((referral) => (
          <InitialDecisionCard
            key={referral.id}
            mashReferral={referral}
            assignWorkerToReferral={assignWorkerToReferral}
          />
        ))}
      </div>
    );
  }
  if (filter === 'screening-decision') {
    return (
      <div data-testid="ScreeningCard">
        {mashReferrals.map((referral) => (
          <ScreeningCard
            key={referral.id}
            mashReferral={referral}
            assignWorkerToReferral={assignWorkerToReferral}
          />
        ))}
      </div>
    );
  }
  if (filter === 'final-decision') {
    return (
      <div data-testid="FinalDecisionCard">
        {mashReferrals.map((referral) => (
          <FinalDecisionCard
            key={referral.id}
            mashReferral={referral}
            assignWorkerToReferral={assignWorkerToReferral}
          />
        ))}
      </div>
    );
  }

  return <></>;
};

export default MainCard;
