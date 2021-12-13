import s from './MashHeading.module.scss';
import { format } from 'date-fns';
import MashTag from 'components/MashTags/MashTags';
import { MashReferral } from 'types';

interface Props {
  mashReferral: MashReferral;
}

const MASHheading = ({ mashReferral }: Props): React.ReactElement => {
  return (
    <section className="govuk-!-margin-bottom-8">
      <div className={s.banner}>
        <div className={s.heading}>
          {mashReferral.mashResidents
            .map((resident) => `${resident.firstName} ${resident.lastName}`)
            .join(', ')}
        </div>
        <div>
          <span className="govuk-!-margin-right-3">
            {' '}
            received at{' '}
            {format(new Date(mashReferral.referralCreatedAt), 'HH:00 dd MMM')}
          </span>
          <MashTag mashReferral={mashReferral} />
        </div>
      </div>
    </section>
  );
};

export default MASHheading;
