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
      <div>
        {mashReferrals.map((referral) => (
          <ContactCard key={referral.id} mashReferral={referral} />
        ))}
      </div>
    );
  } else if (filter === 'initial-decision') {
    return (
      <div>
        {mashReferrals.map((referral) => (
          <InitialDecisionCard key={referral.id} mashReferral={referral} />
        ))}
      </div>
    );
  } else if (filter === 'screening-decision') {
    return (
      <div>
        {mashReferrals.map((referral) => (
          <ScreeningCard key={referral.id} mashReferral={referral} />
        ))}
      </div>
    );
  } else {
    return (
      <div>
        {mashReferrals.map((referral) => (
          <FinalDecisionCard key={referral.id} mashReferral={referral} />
        ))}
      </div>
    );
  }
};

export default MainCard;
