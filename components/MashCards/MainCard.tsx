import { MashReferral } from 'types';
import ContactCard from './ContactCard';
import InitialDecisionCard from './InitialDecisionCard';
import ScreeningCard from './ScreeningCard';
import FinalDecisionCard from './FinalDecisionCard';

interface Props {
  filter: string;
  mashReferrals: MashReferral | any;
}

const MainCard = ({ filter, mashReferrals }: Props): React.ReactElement => {
  if (filter === 'contact') {
    return (
      <div>
        {mashReferrals.map((referral: any) => (
          <div key={referral.id}>
            <ContactCard
              clientName={referral.clients[0]}
              timeLeft="4 hours"
              dateTime={referral.createdAt}
              referrer={referral.referrer}
              requestedSupport={referral.requestedSupport}
            ></ContactCard>
          </div>
        ))}{' '}
      </div>
    );
  } else if (filter === 'initial-decision') {
    return (
      <div>
        {mashReferrals.map((referral: any) => (
          <div key={referral.id}>
            <InitialDecisionCard
              clientname={referral.clients[0]}
              timeleft="4 hours"
              datetime={referral.createdAt}
              screeningDecision={referral.screeningDecision}
              referralCategory={referral.referralCategory}
            ></InitialDecisionCard>
          </div>
        ))}{' '}
      </div>
    );
  } else if (filter === 'screening') {
    return (
      <div>
        {mashReferrals.map((referral: any) => (
          <div key={referral.id}>
            <ScreeningCard
              clientname={referral.clients[0]}
              timeleft="4 hours"
              datetime={referral.createdAt}
              initialDecision={referral.initialDecision}
              referralCategory={referral.referralCategory}
            ></ScreeningCard>
          </div>
        ))}{' '}
      </div>
    );
  } else {
    return (
      <div>
        {mashReferrals.map((referral: any) => (
          <div key={referral.id}>
            <FinalDecisionCard
              clientname={referral.clients[0]}
              timeleft="4 hours"
              datetime={referral.createdAt}
              screeningDecision={referral.screeningDecision}
              referralCategory={referral.referralCategory}
            ></FinalDecisionCard>
          </div>
        ))}{' '}
      </div>
    );
  }
};

export default MainCard;

///.map - key on card id value.
// pass down full referral
