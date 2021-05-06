import { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import DynamicInput from 'components/FormWizard/DynamicInput';
import DeleteIcon from 'components/Icons/TimesCircle';

import styles from './DynamicInputMulti.module.scss';

const DynamicInputMulti = ({
  name,
  initialInputData = [],
  currentData,
  onDelete,
  label,
  hint,
  isMultiTrigger = 'Add a new one',
  isMultiInit = true,
  ...otherProps
}) => {
  const multiPresent = initialInputData.length || 0;
  const [counter, setCounter] = useState(
    multiPresent === 0 && isMultiInit ? 1 : 0
  );
  const removeSelected = useCallback(
    (index) => {
      setCounter(counter - 1);
      currentData[name] &&
        onDelete([
          ...currentData[name].slice(0, index),
          ...currentData[name].slice(index + 1, currentData[name].length),
        ]);
    },
    [counter, currentData, name, onDelete]
  );
  return (
    <>
      {Array.apply(null, { length: counter + multiPresent }).map((e, index) => (
        <div
          key={`${name}${index}`}
          className={cx('govuk-!-margin-bottom-5', styles.wrapper)}
        >
          <DynamicInput
            {...otherProps}
            name={`${name}[${index}]`}
            currentData={currentData}
            label={index === 0 ? label : null}
            hint={index === 0 ? hint : null}
          />
          {(!isMultiInit || index !== 0) && (
            <button
              className={styles.delete}
              onClick={(e) => {
                e.preventDefault();
                removeSelected(index);
              }}
            >
              <DeleteIcon />
              <span className="govuk-visually-hidden">
                Remove this {label.toLowerCase()}
              </span>
            </button>
          )}
        </div>
      ))}
      <div className="govuk-!-margin-top-3 govuk-!-margin-bottom-5">
        <button
          className="govuk-link"
          onClick={(e) => {
            e.preventDefault();
            setCounter(counter + 1);
          }}
        >
          {isMultiTrigger}
        </button>
      </div>
    </>
  );
};

DynamicInputMulti.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  hint: PropTypes.string,
  initialInputData: PropTypes.array,
  currentData: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
  isMultiTrigger: PropTypes.string,
  isMultiInit: PropTypes.bool,
};

export default DynamicInputMulti;
