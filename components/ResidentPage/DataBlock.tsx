import Dialog from 'components/Dialog/Dialog';
import React, { HTMLInputTypeAttribute, useState } from 'react';
import { Resident } from 'types';
import Collapsible from './Collapsible';
import s from './DataBlock.module.scss';
import ss from './SummaryList.module.scss';
import DefaultInlineEditor, { InlineEditorOption } from './InlineEditor';
import { useResident } from 'utils/api/residents';
import get from 'lodash.get';

type SaveableData =
  | boolean
  | string
  | number
  | Record<string, unknown>[]
  | Record<string, unknown>;

/** an active, inline-editable row of data */
export interface DataRow {
  /** what shows up in readable state? */
  label: string;
  name: keyof Resident;
  readOnly?: boolean;
  /** show on the dialog only, or in the summary? */
  showInSummary?: boolean;
  /** provide a set of selectable options rather than an input field */
  options?: InlineEditorOption[];
  /** override the input type eg. number, date, email */
  type?: HTMLInputTypeAttribute;
  required?: boolean;
  /** provide a custom component to render when the display or edit state is activated **/
  customEditor?: React.ReactElement;
  /** HOOKS */
  /** pretty up a saved value before showing it to the user */
  beforeDisplay?: (value: SaveableData) => React.ReactElement | string;
  /** transform or format a saved value before passing it to the editor */
  beforeEdit?: (value: SaveableData | undefined) => string;
  /** transform or format the edited value before passing it back to the api */
  beforeSave?: (value: unknown) => SaveableData;
}

type EditingState = number | null;

interface DataCellProps {
  i: number;
  row: DataRow;
  resident?: Resident;
  editing: EditingState;
  setEditing: (i: EditingState) => void;
}

const DataCellSkeleton = () => (
  <div className={s.skeleton} aria-label="Loading..."></div>
);

const PrettyValue = ({ value }: { value: string | React.ReactElement }) => (
  <>{value || <span className={s.notKnown}>Not known</span>}</>
);

const DataCell = ({ row, editing, setEditing, resident, i }: DataCellProps) => {
  const rawValue = get(resident, row.name);
  const value = row.beforeDisplay ? row.beforeDisplay(rawValue) : rawValue;

  if (resident) {
    if (row.readOnly) return <PrettyValue value={value} />;

    return editing === i ? (
      row.customEditor || (
        <DefaultInlineEditor
          value={value}
          onClose={() => setEditing(null)}
          resident={resident}
          {...row}
        />
      )
    ) : (
      <>
        <PrettyValue value={value} />
        <button className={s.editButton} onClick={() => setEditing(i)}>
          Edit
        </button>
      </>
    );
  }

  return <DataCellSkeleton />;
};

interface DataListProps {
  list: DataRow[];
  resident?: Resident;
}

const DataList = ({ list, resident }: DataListProps) => {
  const [editing, setEditing] = useState<EditingState>(null);
  return (
    <dl className={`govuk-summary-list lbh-summary-list ${ss.summaryList}`}>
      {list.map((row, i) => (
        <div key={row.name} className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key">
            {row.label}
            {row.required && (
              <span className={s.required} aria-label="required">
                *
              </span>
            )}
          </dt>
          <dd className={`govuk-summary-list__value ${s.value}`}>
            <DataCell
              i={i}
              resident={resident}
              row={row}
              editing={editing}
              setEditing={setEditing}
            />
          </dd>
        </div>
      ))}
    </dl>
  );
};

interface Props {
  title: string;
  list: DataRow[];
  socialCareId: number;
}

/** a component to render information about a resident, or a subset of it, and allow in-place editing */
const DataBlock = ({
  title,
  list,
  socialCareId,
}: Props): React.ReactElement => {
  const { data } = useResident(socialCareId);

  const [open, setOpen] = useState<boolean>(false);

  const truncatedList = list.filter((row) => row.showInSummary);

  return (
    <>
      <Dialog title={title} isOpen={open} onDismiss={() => setOpen(false)}>
        <DataList list={list} resident={data} />
      </Dialog>

      <Collapsible
        title={title}
        link={
          <button className={s.button} onClick={() => setOpen(true)}>
            See all/edit
          </button>
        }
      >
        <DataList list={truncatedList} resident={data} />
        <button onClick={() => setOpen(true)} className={s.footerButton}>
          See all {list.length} field{list.length !== 1 && 's'}
        </button>
      </Collapsible>
    </>
  );
};

export default DataBlock;
