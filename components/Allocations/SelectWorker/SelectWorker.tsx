import cx from 'classnames';
import { Worker } from 'types';

const ResultEntry = ({
  worker,
  callback,
}: {
  worker: Worker;
  callback: (workerId: string) => void;
}): React.ReactElement => {
  const { id, firstName, lastName, allocationCount } = worker;

  const styleBlock = { verticalAlign: 'middle', padding: '0px 20px 0px 0' };

  return (
    <>
      <tr className={cx('govuk-table__row')}>
        <td className="govuk-table__cell" style={styleBlock}>
          <div className="govuk-radios__item" style={{ marginTop: '5px' }}>
            <input
              id={String(id)}
              name="workerId"
              type="radio"
              data-testid={`select_${firstName}_${lastName}`}
              value={id}
              onChange={(e) => {
                callback(e.target.value);
              }}
              className={`govuk-radios__input`}
            />
            <label
              className="govuk-label govuk-radios__label"
              htmlFor={String(id)}
            >
              <span className="govuk-visually-hidden">
                {`${firstName} ${lastName}`}
              </span>
            </label>
          </div>
        </td>
        <td
          data-testid="workerName"
          className="govuk-table__cell"
          style={styleBlock}
        >
          {`${firstName} ${lastName}`}
        </td>
        <td className="govuk-table__cell" style={styleBlock}>
          <label data-testid="allocationCount" htmlFor={String(id)}>
            {allocationCount}
          </label>
        </td>
      </tr>
    </>
  );
};

const SelectWorker = ({
  records,
  callback,
}: {
  records: Worker[];
  callback: any;
}): React.ReactElement => {
  return (
    <table className="govuk-table lbh-table" data-testid="residents-table">
      <thead className="govuk-table__head">
        <tr className="govuk-table__row">
          <th scope="col" className="govuk-table__header">
            Select
          </th>
          <th scope="col" className="govuk-table__header">
            Name
          </th>
          <th scope="col" className="govuk-table__header">
            Total allocations
          </th>
          <th scope="col" className="govuk-table__header" />
        </tr>
      </thead>

      <tbody className="govuk-table__body">
        {records.map((result) => (
          <ResultEntry key={result.id} worker={result} callback={callback} />
        ))}
      </tbody>
    </table>
  );
};

export default SelectWorker;
