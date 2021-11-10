import Button from 'components/Button/Button';
import Heading from 'components/MashHeading/Heading';
import NumberedSteps from 'components/NumberedSteps/NumberedSteps';
import { Select } from 'components/Form';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { isAuthorised } from 'utils/auth';
import { getMashReferral } from 'lib/mashReferral';
import { MashReferral, ReferralStage } from 'types';
import { useState } from 'react';
import { submitInitialDecision } from 'utils/api/mashReferrals';
import referralCategories from './../../../data/mashOptions/referralCategories';
import initialDecisionOptions from './../../../data/mashOptions/initialDecisionOptions';

interface Props {
  referral: MashReferral;
  workerEmail: string;
}

const InitialDecision = ({
  referral,
  workerEmail,
}: Props): React.ReactElement => {
  const [decision, setDecision] = useState('CSC Screening required in MASH');
  const [referralCategory, setReferralCategory] = useState(
    'Abuse linked to faith or belief'
  );
  const [urgent, setUrgent] = useState(false);

  const router = useRouter();

  const confirmation = {
    title: `A decision has been submitted for ${referral.clients.join(
      ' and '
    )}`,
    link: referral.referralDocumentURI,
  };

  const submitForm = async () => {
    await submitInitialDecision(
      referral.id,
      workerEmail,
      decision,
      referralCategory,
      urgent
    );

    router.push({
      pathname: `/team-assignments`,
      query: {
        tab: 'initial-decision',
        confirmation: JSON.stringify(confirmation),
      },
    });
  };

  return (
    <>
      <h1>Make initial decision</h1>
      <Heading
        clientname="Jan Smith"
        timeleft="3 hours"
        datetime="2021-11-04T13:50:10.6120000Z"
      />

      <NumberedSteps
        nodes={[
          <>
            <h3 className="lbh-heading-h3">Document the decision</h3>
            <p className="lbh-body">
              Write the rationale for your screening decision.
            </p>
            <p className="lbh-body">
              <a href="#" className="lbh-link lbh-link--no-visited-state">
                See Google document
              </a>
            </p>
          </>,
          <>
            <label htmlFor="screening-decision" className="lbh-heading-h3">
              Select initial decision
            </label>
            <Select
              id="initial-decision"
              name="initial-decision"
              value={decision}
              onChange={(value) => setDecision(value)}
              options={initialDecisionOptions}
            />
          </>,
          <>
            <label htmlFor="referral-category" className="lbh-heading-h3">
              Select referral category
            </label>
            <Select
              id="referral-category"
              name="referral-category"
              value={referralCategory}
              onChange={(value) => setReferralCategory(value)}
              options={referralCategories}
            />
          </>,
          <>
            <fieldset className="govuk-fieldset">
              <legend className="lbh-heading-h3">
                Is this contact urgent?
              </legend>
              <div
                className="govuk-radios lbh-radios govuk-radios--conditional"
                data-module="govuk-radios"
              >
                <div className="govuk-radios__item">
                  <input
                    className="govuk-radios__input"
                    id="no-input"
                    name="urgency"
                    type="radio"
                    onClick={() => setUrgent(false)}
                    checked={!urgent}
                  />
                  <label
                    className="govuk-label govuk-radios__label"
                    htmlFor="no-input"
                  >
                    No
                  </label>
                </div>
                <div className="govuk-radios__item">
                  <input
                    className="govuk-radios__input"
                    id="yes-input"
                    name="urgency"
                    type="radio"
                    onClick={() => setUrgent(true)}
                    checked={urgent}
                  />
                  <label
                    className="govuk-label govuk-radios__label"
                    htmlFor="yes-input"
                  >
                    Yes
                  </label>
                </div>
                {urgent && (
                  <div className="govuk-radios__conditional" id="hint-email">
                    <label className="govuk-label" htmlFor="hint">
                      Please email your MASH manager about the urgent case.
                    </label>
                  </div>
                )}
              </div>
            </fieldset>
          </>,
        ]}
      />
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Button label="Submit" type="submit" onClick={submitForm} />
        <p className="lbh-body">
          <a
            href="#"
            className={`lbh-link lbh-link--no-visited-state govuk-!-margin-left-3`}
          >
            Cancel
          </a>
        </p>
        <p>
          <a
            href="#"
            className={`lbh-link lbh-link--no-visited-state govuk-!-margin-left-3`}
          >
            Return to contact
          </a>
        </p>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  req,
  params,
}) => {
  const user = isAuthorised(req);

  if (!user) {
    return {
      props: {},
      redirect: {
        destination: `/login`,
      },
    };
  }

  const referral = await getMashReferral(params?.id as string);

  if (!referral || referral.stage !== ReferralStage.INITIAL) {
    return {
      props: {},
      redirect: {
        destination: `/404`,
      },
    };
  }

  return {
    props: {
      referral,
      workerEmail: user.email,
    },
  };
};

export default InitialDecision;
