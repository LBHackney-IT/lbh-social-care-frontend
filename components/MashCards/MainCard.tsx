import { MashReferral } from 'types';
import ContactCard from './ContactCard';
import InitialDecisionCard from './InitialDecisionCard';
import ScreeningCard from './ScreeningCard';
import FinalDecisionCard from './FinalDecisionCard';

interface Props {
  filter: string;
  mashReferrals: MashReferral[];
}

const MainCard = ({ filter, mashReferrals }: Props): React.ReactElement => {
  if (filter === 'contact') {
    return (
      <div data-testid="ContactCard">
        {mashReferrals.map((referral) => (
          <ContactCard
            key={referral.id}
            mashReferral={referral}
            filter={filter}
          />
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
            filter={filter}
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
            filter={filter}
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
            filter={filter}
          />
        ))}
      </div>
    );
  }

  return <></>;
};

export default MainCard;
