import { MashReferral } from 'types';
import ContactCard from './ContactCard';
import InitialDecisionCard from './InitialDecisionCard';
import ScreeningCard from './ScreeningCard';
import FinalDecisionCard from './FinalDecisionCard';

interface Props {
  mashReferrals: MashReferral[];
  filter: string;
  workerEmail: string;
}

const MainCard = ({
  mashReferrals,
  filter,
  workerEmail,
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
            workerEmail={workerEmail}
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
            workerEmail={workerEmail}
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
            workerEmail={workerEmail}
          />
        ))}
      </div>
    );
  }

  return <></>;
};

export default MainCard;
