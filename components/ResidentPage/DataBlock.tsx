import Dialog from 'components/Dialog/Dialog';
import { useState } from 'react';
import { Resident } from 'types';
import Collapsible from './Collapsible';
import s from './DataBlock.module.scss';
import InlineEdit from './InlineEdit';

interface ListProps {
  list: {
    [key: string]: string | React.ReactElement;
  };
  resident: Resident;
}

const List = ({ list, resident }: ListProps) => {
  const [editing, setEditing] = useState<number | null>(null);

  return (
    <dl className="govuk-summary-list lbh-summary-list">
      {Object.entries(list).map(([key, value], i) => (
        <div key={key} className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key">{key}</dt>
          <dd className="govuk-summary-list__value">
            {editing === i ? (
              <InlineEdit
                fieldName={key}
                value={value}
                onClose={() => setEditing(null)}
                resident={resident}
              />
            ) : (
              <>
                {JSON.stringify(value)}
                <button onClick={() => setEditing(i)}>Edit</button>
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
  list: {
    [key: string]: string | React.ReactElement;
  };
}

const DataBlock = ({ title, list }: Props): React.ReactElement => {
  const [open, setOpen] = useState<boolean>(false);

  const listArray = Object.entries(list);
  const truncatedList = Object.fromEntries(listArray.slice(0, 6));

  return (
    <>
      <Dialog title={title} isOpen={open} onDismiss={() => setOpen(false)}>
        <List list={list} resident={list} />
      </Dialog>

      <Collapsible
        title={title}
        link={
          <button className={s.button} onClick={() => setOpen(true)}>
            See all
          </button>
        }
      >
        <List list={truncatedList} resident={list} />
        <button onClick={() => setOpen(true)} className={s.button}>
          See all {listArray.length} fields
        </button>
      </Collapsible>
    </>
  );
};

export default DataBlock;
