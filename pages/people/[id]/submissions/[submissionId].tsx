import { GetServerSideProps } from 'next';
import { Submission } from 'data/flexibleForms/forms.types';
import { getSubmissionById } from 'lib/submissions';
import FlexibleAnswers from 'components/FlexibleAnswers/FlexibleAnswers';
import Head from 'next/head';
import s from 'stylesheets/Sidebar.module.scss';
import PersonWidget from 'components/PersonWidget/PersonWidget';
import { Resident, User } from 'types';
import forms from 'data/flexibleForms';
import RevisionTimeline from 'components/RevisionTimeline/RevisionTimeline';
import PanelApprovalWidget from 'components/ApprovalWidget/PanelApprovalWidget';
import ApprovalWidget from 'components/ApprovalWidget/ApprovalWidget';
import RemoveSubmissionDialog from 'components/Submissions/RemoveSubmissionDialog/RemoveSubmissionDialog';
import { useState } from 'react';
import { useAuth } from 'components/UserContext/UserContext';
import { patchSubmissionForStep } from 'lib/submissions';
import { useRouter } from 'next/router';

interface Props {
  submission: Submission;
  person: Resident;
  user: User;
}

const SubmissionPage = ({ submission, person }: Props): React.ReactElement => {
  const form = forms.find((form) => form.id === submission.formId);
  const { user } = useAuth() as { user: User };
  const { push } = useRouter();

  const [isRemoveCaseNoteDialogOpen, setIsRemoveCaseNoteDialogOpen] =
    useState<boolean>(false);

  return (
    <>
      <Head>
        <title>
          {form?.name} | {person.firstName} {person.lastName} | Social care |
          Hackney Council
        </title>
      </Head>

      {form?.approvable && (
        <ApprovalWidget user={user} submission={submission} />
      )}

      {form?.panelApprovable && (
        <PanelApprovalWidget user={user} submission={submission} />
      )}

      <RemoveSubmissionDialog
        isOpen={isRemoveCaseNoteDialogOpen}
        person={person}
        onDismiss={() => setIsRemoveCaseNoteDialogOpen(false)}
        onFormSubmit={async (data: any) => {
          setIsRemoveCaseNoteDialogOpen(false);

          if (data.reason_for_deletion && data.name_of_requester) {
            const titleId = 'titleId';
            const testTitle = 'deletionDetails';

            const mockAnswers = {
              reason_for_deletion: data.reason_for_deletion,
              name_of_requester: data.name_of_requester,
              [titleId]: testTitle,
            };

            console.log('removing stuff!', data);

            try {
              await patchSubmissionForStep(
                submission.formId,
                'deletionDetails',
                user.email,
                mockAnswers
              );

              push(`/people/${person.id}`);
            } catch (e) {
              console.log(e);
            }
          }
        }}
      />

      <div className="govuk-grid-row">
        <div className="govuk-grid-column-two-thirds">
          <h1 className="lbh-heading-h1 govuk-!-margin-bottom-8">
            {form?.name}
          </h1>
        </div>
        <div className="govuk-error-summary__body">
          <ul className="govuk-list govuk-error-summary__list">
            <li>
              <a
                style={{ float: 'right' }}
                className="lbh-link"
                href="#"
                onClick={() => {
                  setIsRemoveCaseNoteDialogOpen(true);
                }}
              >
                Delete record
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className={`govuk-grid-row ${s.outer}`}>
        <div className="govuk-grid-column-two-thirds">
          <FlexibleAnswers answers={submission.formAnswers} />
        </div>
        <div className="govuk-grid-column-one-third">
          <div className={s.sticky}>
            <p className="lbh-body">This is for:</p>
            <PersonWidget person={person} />
            <RevisionTimeline submission={submission} />
          </div>
        </div>
      </div>
    </>
  );
};

SubmissionPage.goBackButton = true;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const submission = await getSubmissionById(String(params?.submissionId));
  const person = submission.residents.find(
    (p) => p.id === parseInt(params?.id as string)
  ) as Resident;

  if (!submission.submissionId || submission.submissionState === 'Discarded') {
    return {
      props: {},
      redirect: {
        destination: `/404`,
      },
    };
  }

  if (submission.submissionState === 'In progress') {
    return {
      props: {},
      redirect: {
        destination: `/submissions/${submission.submissionId}`,
      },
    };
  }

  return {
    props: {
      submission,
      person,
    },
  };
};

export default SubmissionPage;
