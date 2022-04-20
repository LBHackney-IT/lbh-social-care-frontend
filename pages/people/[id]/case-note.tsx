import { Formik, Form, FormikValues, FormikHelpers } from 'formik';
import FlexibleField from 'components/FlexibleForms/FlexibleFields';
import CHILD_CASE_NOTE from 'data/flexibleForms/childCaseNote';
import ADULT_CASE_NOTE from 'data/flexibleForms/adultCaseNote';
import { generateInitialValues } from 'lib/utils';
import { generateFlexibleSchema } from 'lib/validators';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import { isAuthorised } from 'utils/auth';
import { getSubmissionById, startSubmission } from 'lib/submissions';
import { Submission } from 'data/flexibleForms/forms.types';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Head from 'next/head';
import Banner from 'components/FlexibleForms/Banner';
import GroupRecordingWidget from 'components/GroupRecording/GroupRecordingWidget';
import PersonWidget from 'components/PersonWidget/PersonWidget';
import s from 'stylesheets/Sidebar.module.scss';
import {
  AutosaveProvider,
  AutosaveTrigger,
  AutosaveIndicator,
} from 'contexts/autosaveContext';
import { useState } from 'react';
import { getResident } from 'lib/residents';
import { User } from 'types';

interface Props extends Submission {
  params: {
    id: string;
  };
}

const CaseNote = ({
  params,
  submissionId,
  formAnswers,
  residents,
}: Props): React.ReactElement => {
  const form =
    residents[0].ageContext === 'A' ? ADULT_CASE_NOTE : CHILD_CASE_NOTE;
  const fields = form.steps[0].fields;

  const router = useRouter();
  const [finished, setFinished] = useState<boolean>(false);

  // put the submission id on the url if it doesn't already exist
  useEffect(() => {
    if (!router.query.submissionId)
      router.replace({
        pathname: router.asPath,
        query: { submissionId },
      });
  }, [router, submissionId, params.id]);

  const handleSubmit = async (
    values: FormikValues,
    { setStatus }: FormikHelpers<FormikValues>
  ) => {
    try {
      if (finished) {
        await axios.post(`/api/case-note/${submissionId}`, values);
        router.push(`/residents/${params.id}/case-notes`);
      } else {
        await axios.patch(`/api/case-note/${submissionId}`, {
          values,
          dateOfEventId: form.dateOfEvent?.associatedId,
          titleId: form.title?.associatedId,
        });
      }
    } catch (e) {
      setStatus((e as Error).toString());
    }
  };

  return (
    <>
      <Head>
        <title>Add a case note | Social care | Hackney Council</title>
      </Head>
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-two-thirds">
          <h1 className="lbh-heading-h1 govuk-!-margin-bottom-8">
            Add a case note
          </h1>
        </div>
      </div>

      <AutosaveProvider>
        <div className={`govuk-grid-row ${s.outer}`}>
          <div className="govuk-grid-column-two-thirds">
            <Formik
              initialValues={
                formAnswers.singleStep || generateInitialValues(fields)
              }
              validationSchema={generateFlexibleSchema(fields)}
              onSubmit={handleSubmit}
            >
              {({ touched, errors, values, isSubmitting, status, isValid }) => (
                <Form>
                  {status && (
                    <Banner
                      title="There was a problem finishing the submission"
                      className="lbh-page-announcement--warning"
                    >
                      <p>Please refresh the page or try again later.</p>
                      <p className="lbh-body-xs">{status}</p>
                    </Banner>
                  )}

                  <AutosaveTrigger />

                  {fields.map((field) => (
                    <FlexibleField
                      key={field.id}
                      field={field}
                      values={values}
                      errors={errors}
                      touched={touched}
                    />
                  ))}

                  <button
                    onClick={() => isValid && setFinished(true)}
                    className="govuk-button lbh-button"
                    disabled={isSubmitting}
                  >
                    Save and finish
                  </button>
                </Form>
              )}
            </Formik>
          </div>
          <div className="govuk-grid-column-one-third">
            <div className={s.sticky}>
              <AutosaveIndicator />

              <p className="lbh-body">This is for:</p>
              {form.groupRecordable ? (
                <GroupRecordingWidget
                  initialPeople={residents}
                  submissionId={submissionId}
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

CaseNote.goBackButton = true;

export const getServerSideProps: GetServerSideProps = async ({
  req,
  params,
  query,
}) => {
  let submission: Submission;

  if (query.submissionId) {
    submission = await getSubmissionById(query.submissionId as string);

    if (submission.submissionState !== 'In progress')
      return {
        props: {},
        redirect: {
          destination: `/people/${params?.id}/submissions/${query.submissionId}`,
        },
      };
  } else {
    const user = isAuthorised(req);
    const resident = await getResident(Number(params?.id), user as User);
    const form =
      resident.contextFlag === 'A' ? ADULT_CASE_NOTE : CHILD_CASE_NOTE;

    submission = await startSubmission(
      form.id,
      Number(params?.id),
      String(user?.email)
    );
  }

  return {
    props: {
      params,
      ...submission,
    },
  };
};

export default CaseNote;
