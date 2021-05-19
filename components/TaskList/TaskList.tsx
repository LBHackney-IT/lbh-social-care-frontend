import { useCallback } from 'react';
import s from './TaskList.module.scss';
import { groupByTheme } from '../../lib/utils';
import { Form } from '../../data/flexibleForms/forms.types';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface Props {
  form: Form;
  completedSteps: string[];
}

const TaskList = ({ form, completedSteps }: Props): React.ReactElement => {
  const router = useRouter();
  const { id } = router.query;

  const groupByThemeCb = useCallback(groupByTheme, [form]);
  const themes = groupByThemeCb(form);

  return (
    <ol className={s.taskList}>
      {themes.map((theme, i) => (
        <li key={theme.name}>
          <h2 className={s.section}>
            <span className={s.sectionNumber}>{i + 1}.</span> {theme.name}
          </h2>

          <ul className={s.items}>
            {theme.steps.map((step) => (
              <li className={s.item} key={step.id}>
                <span className={s.taskName}>
                  <Link href={`/submissions/${id}/steps/${step.id}`}>
                    <a className="lbh-link">{step.name}</a>
                  </Link>
                </span>

                {completedSteps.includes(step.id) ? (
                  <strong
                    className={`govuk-tag lbh-tag--green app-task-list__tag ${s.tagDone}`}
                  >
                    Done
                  </strong>
                ) : (
                  <strong
                    className={`govuk-tag govuk-tag--grey app-task-list__tag ${s.tag}`}
                  >
                    To do
                  </strong>
                )}
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ol>
  );
};

export default TaskList;
