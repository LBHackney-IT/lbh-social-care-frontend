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
        {mashReferrals.map((referral, idx) => (
          <div key={referral.id}>
            <ContactCard mashReferrals={mashReferrals[idx]}></ContactCard>
          </div>
        ))}{' '}
      </div>
    );
  } else if (filter === 'initial-decision') {
    return (
      <div>
        {mashReferrals.map((referral, idx) => (
          <div key={referral.id}>
            <InitialDecisionCard
              mashReferrals={mashReferrals[idx]}
            ></InitialDecisionCard>
          </div>
        ))}{' '}
      </div>
    );
  } else if (filter === 'screening') {
    return (
      <div>
        {mashReferrals.map((referral, idx) => (
          <div key={referral.id}>
            <ScreeningCard mashReferrals={mashReferrals[idx]}></ScreeningCard>
          </div>
        ))}{' '}
      </div>
    );
  } else {
    return (
      <div>
        {mashReferrals.map((referral, idx) => (
          <div key={referral.id}>
            <FinalDecisionCard
              mashReferrals={mashReferrals[idx]}
            ></FinalDecisionCard>
          </div>
        ))}{' '}
      </div>
    );
  }
};

export default MainCard;
