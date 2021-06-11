import { Resident } from './../../types';
import { useState } from 'react';
import PersonWidget from './../PersonWidget/PersonWidget';
import Dialog from './../Dialog/Dialog';
import s from '../styles/PersonWidget.module.scss';
import PersonSelect from './../PersonSelect/PersonSelect';

interface Props {
  initialPerson: Resident;
}

const GroupRecordingWidget = ({ initialPerson }: Props): React.ReactElement => {
  const [people, setPeople] = useState([].concat(initialPerson));
  const [open, setOpen] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);

  const [query, setQuery] = useState('');

  const handleAdd = () => {
    setPeople(people.concat(people[0]));
    setOpen(people.length);
    setDialogOpen(false);
    setQuery('');
  };

  const handleRemove = () => {
    const newArray = people.slice();
    newArray.pop();
    setPeople(newArray);
    setOpen(people.length - 1);
  };

  return (
    <section>
      <h3 className="govuk-visually-hidden">People</h3>
      {people.map((person, i) => (
        <PersonWidget
          person={person}
          key={i}
          index={i}
          grouped={people.length > 1}
          onRemove={handleRemove}
          open={open === i}
          setOpen={setOpen}
        />
      ))}
      <button
        className={`lbh-link ${s.addPersonLink}`}
        onClick={() => setDialogOpen(true)}
      >
        <svg
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="7" width="1" height="15" fill="#025EA6" />
          <rect
            x="15"
            y="7"
            width="1"
            height="15"
            transform="rotate(90 15 7)"
            fill="#025EA6"
          />
        </svg>
        Link another person
      </button>

      <Dialog
        title="Link a person"
        isOpen={dialogOpen}
        onDismiss={() => setDialogOpen(false)}
      >
        <div className="govuk-form-group lbh-form-group">
          <label className="govuk-label lbh-label" htmlFor="query">
            {/* Search by name, contact detail or social care ID */}
            Search by social care ID
          </label>
          <div className="lbh-search-box" style={{ marginTop: 0 }}>
            <input
              className="govuk-input lbh-input"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              id="query"
              name="query"
              type="search"
              placeholder="eg. 123456"
            />
            <button className="lbh-search-box__action">
              <span className="govuk-visually-hidden">Search</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M9.6999 10.6C12.0747 10.6 13.9999 8.67482 13.9999 6.3C13.9999 3.92518 12.0747 2 9.6999 2C7.32508 2 5.3999 3.92518 5.3999 6.3C5.3999 8.67482 7.32508 10.6 9.6999 10.6ZM9.6999 12.6C13.1793 12.6 15.9999 9.77939 15.9999 6.3C15.9999 2.82061 13.1793 0 9.6999 0C6.22051 0 3.3999 2.82061 3.3999 6.3C3.3999 9.77939 6.22051 12.6 9.6999 12.6Z"
                  fill="#0B0C0C"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M6.70706 10.7071L1.70706 15.7071L0.292847 14.2929L5.29285 9.29289L6.70706 10.7071Z"
                  fill="#0B0C0C"
                />
              </svg>
            </button>
          </div>
        </div>

        {query && (
          <PersonSelect
            name="person"
            label="Matching people"
            people={[
              {
                mosaicId: '0',
                firstName: 'Firstname',
                lastName: 'Surname',
                dateOfBirth: '1990-04-10T00:00:00.0000000',
                addressList: [
                  {
                    addressLine1: '123 Town St, Citythorpe, AB1 23C',
                  },
                ],
              },
            ]}
          />
        )}

        <PersonSelect
          name="person"
          label="Or choose a relative"
          people={[
            {
              mosaicId: '1',
              firstName: 'Bart',
              lastName: 'Simpson',
              dateOfBirth: '1990-04-10T00:00:00.0000000',
              addressList: [
                {
                  addressLine1: '123 Town St, Citythorpe, AB1 23C',
                },
              ],
            },
            {
              mosaicId: '2',
              firstName: 'Lisa',
              lastName: 'Simpson',
              dateOfBirth: '1990-04-10T00:00:00.0000000',
              addressList: [
                {
                  addressLine1: '123 Town St, Citythorpe, AB1 23C',
                },
              ],
            },
            {
              mosaicId: '3',
              firstName: 'Maggie',
              lastName: 'Simpson',
              dateOfBirth: '1990-04-10T00:00:00.0000000',
              addressList: [
                {
                  addressLine1: '123 Town St, Citythorpe, AB1 23C',
                },
              ],
            },
          ]}
        />

        <button className="govuk-button lbh-button" onClick={handleAdd}>
          Add person
        </button>
      </Dialog>
    </section>
  );
};

export default GroupRecordingWidget;
