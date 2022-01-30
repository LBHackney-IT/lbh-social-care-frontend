import Dialog from 'components/Dialog/Dialog';
import React, { useState } from 'react';
import { Resident } from 'types';
import Collapsible from './Collapsible';
import s from './DataBlock.module.scss';
import ss from './SummaryList.module.scss';
import InlineEdit from './InlineEdit';

export interface Row {
  displayLabel: string;
  displayValue: React.ReactElement | string | number;
  editableName: string;
  editableValue: string | number;
  editable?: boolean;
  highlight?: boolean;
}

interface ListProps {
  list: Row[];
  resident: Resident;
}

const List = ({ list, resident }: ListProps) => {
  const [editing, setEditing] = useState<number | null>(null);

  return (
    <dl className={`govuk-summary-list lbh-summary-list ${ss.summaryList}`}>
      {list.map((row, i) => (
        <div key={row.editableName} className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key">{row.displayLabel}</dt>
          <dd className={`govuk-summary-list__value ${s.value}`}>
            {editing === i ? (
              <InlineEdit
                fieldName={row.editableName}
                value={row.editableValue}
                onClose={() => setEditing(null)}
                resident={resident}
              />
            ) : (
              <>
                {row.displayValue}
                <button className={s.editButton} onClick={() => setEditing(i)}>
                  Edit
                </button>
              </>
            )}
          </dd>
        </div>
      ))}
    </dl>
  );
};

interface Props {
  title: string;
  list: Row[];
  resident: Resident;
}

const DataBlock = ({ title, list, resident }: Props): React.ReactElement => {
  const [open, setOpen] = useState<boolean>(false);

  const truncatedList = list.filter((row) => row.highlight);

  return (
    <>
      <Dialog title={title} isOpen={open} onDismiss={() => setOpen(false)}>
        <List list={list} resident={resident} />
      </Dialog>

      <Collapsible
        title={title}
        link={
          <button className={s.button} onClick={() => setOpen(true)}>
            See all/edit
          </button>
        }
      >
        <List list={truncatedList} resident={resident} />
        <button onClick={() => setOpen(true)} className={s.button}>
          See all {list.length} fields
        </button>
      </Collapsible>
    </>
  );
};

export default DataBlock;
