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
          <ContactCard key={referral.id} mashReferrals={referral}></ContactCard>
        ))}{' '}
      </div>
    );
  } else if (filter === 'initial-decision') {
    return (
      <div>
        {mashReferrals.map((referral) => (
          <InitialDecisionCard
            key={referral.id}
            mashReferrals={referral}
          ></InitialDecisionCard>
        ))}{' '}
      </div>
    );
  } else if (filter === 'screening') {
    return (
      <div>
        {mashReferrals.map((referral) => (
          <ScreeningCard
            key={referral.id}
            mashReferrals={referral}
          ></ScreeningCard>
        ))}
      </div>
    );
  } else {
    return (
      <div>
        {mashReferrals.map((referral) => (
          <FinalDecisionCard
            key={referral.id}
            mashReferrals={referral}
          ></FinalDecisionCard>
        ))}{' '}
      </div>
    );
  }
};

export default MainCard;
