import { useCallback } from 'react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import PersonWidget from 'components/PersonWidget/PersonWidget';
import StepForm from 'components/FlexibleForms/StepForm';
import s from 'stylesheets/Sidebar.module.scss';
import Banner from 'components/FlexibleForms/Banner';
import { Form, Step, Field } from 'data/flexibleForms/forms.types';
import { Resident } from 'types';
import axios from 'axios';
import { getProtocol } from 'utils/urls';
import { FormikValues, FormikHelpers } from 'formik';
import { InitialValues } from 'lib/utils';
import { AutosaveProvider, AutosaveIndicator } from 'contexts/autosaveContext';
import GroupRecordingWidget from 'components/GroupRecording/GroupRecordingWidget';
import { tokenFromMeta } from 'lib/csrfToken';

interface Props {
  params: {
    id: string;
    stepId: string;
  };
  stepAnswers: InitialValues;
  residents: Resident[];
  step: Step;
  form: Form;
}

const StepPage = ({
  params,
  stepAnswers,
  residents,
  step,
  form,
}: Props): React.ReactElement => {
  const handleSubmit = async (
    values: FormikValues,
    { setStatus }: FormikHelpers<FormikValues>
  ): Promise<void> => {
    try {
      const { data } = await axios.patch(
        `/api/submissions/${params.id}/steps/${params.stepId}`,
        values,
        {
          headers: {
            'XSRF-TOKEN': tokenFromMeta(),
          },
        }
      );
      if (data.error) throw data.error;
    } catch (e) {
      setStatus((e as Error).toString());
    }
  };

  const prefillable = useCallback(
    () => step.fields.find((field: Field) => field.prefill),
    [step.fields]
  )();

  return (
    <>
      <Head>
        <title>{step.name} | Social care | Hackney Council</title>
      </Head>

      {!stepAnswers && prefillable && (
        <Banner title="Some answers on this page have been prefilled">
          You can change them if you need.
        </Banner>
      )}

      <div className="govuk-grid-row">
        <div className="govuk-grid-column-two-thirds">
          <h1 className="lbh-heading-h1 govuk-!-margin-bottom-8">
            {step.name}
          </h1>
        </div>
      </div>

      <AutosaveProvider>
        <div className={`govuk-grid-row ${s.outer}`}>
          <div className="govuk-grid-column-two-thirds">
            {step?.intro && <p>{step.intro}</p>}
            {step.fields && (
              <StepForm
                person={residents[0]}
                initialValues={stepAnswers}
                fields={step.fields}
                onSubmit={handleSubmit}
              />
            )}
          </div>
          <div className="govuk-grid-column-one-third">
            <div className={s.sticky}>
              <AutosaveIndicator />
              <p className="lbh-body">This is for:</p>
              {form.groupRecordable ? (
                <GroupRecordingWidget
                  submissionId={params.id}
                  initialPeople={residents}
                />
              ) : (
                <PersonWidget person={residents[0]} />
              )}
            </div>
          </div>
        </div>
      </AutosaveProvider>
    </>
  );
};

StepPage.goBackButton = true;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const protocol = getProtocol();

  const { data } = await axios.get(
    `${protocol}://${process.env.REDIRECT_URL}/api/submissions/${params?.id}/steps/${params?.stepId}`
  );

  // redirect if step doesn't exist
  if (!data.step) {
    return {
      props: {},
      redirect: {
        destination: '/404',
      },
    };
  }

  if (data.submissionState !== 'In progress') {
    return {
      props: {},
      redirect: {
        destination: `/people/${data.residents[0].id}/submissions/${data.submissionId}`,
      },
    };
  }

  return {
    props: {
      params,
      ...data,
    },
  };
};

export default StepPage;
