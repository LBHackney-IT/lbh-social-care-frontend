import { Resident, LegacyResident } from './../../types';
import { useState, useEffect } from 'react';
import PersonWidget from './../PersonWidget/PersonWidget';
import Dialog from './../Dialog/Dialog';
import s from './GroupRecordingWidget.module.scss';
import PersonSelect from './../PersonSelect/PersonSelect';
import axios from 'axios';
import { tokenFromMeta } from 'lib/csrfToken';
import { useResidents as useIDSearch } from 'utils/api/residents';
import { useResidents as useFirstNameSearch } from 'utils/api/residents';
import { useResidents as useLastNameSearch } from 'utils/api/residents';

interface Props {
  initialPeople: Resident[];
  submissionId: string;
}

const safeId = (person: { id?: number; mosaicId?: string }): number =>
  person?.id ? person.id : parseInt(String(person.mosaicId));

const GroupRecordingWidget = ({
  initialPeople,
  submissionId,
}: Props): React.ReactElement => {
  const [people, setPeople] =
    useState<(Resident | LegacyResident)[]>(initialPeople);
  const [open, setOpen] = useState<number | false>(0);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [idToAdd, setIdToAdd] = useState<number>(-1);

  const [searchQuery, setSearchQuery] = useState('');

  const { data: idResults } = useIDSearch({
    mosaic_id: searchQuery,
  });
  const { data: firstNameResults } = useFirstNameSearch({
    first_name: searchQuery,
  });
  const { data: lastNameResults } = useLastNameSearch({
    last_name: searchQuery,
  });

  const results: (Resident | LegacyResident)[] = [
    ...((lastNameResults?.[0]?.residents || []) as (
      | Resident
      | LegacyResident
    )[]),
    ...((idResults?.[0]?.residents || []) as (Resident | LegacyResident)[]),
    ...((firstNameResults?.[0]?.residents || []) as (
      | Resident
      | LegacyResident
    )[]),
  ]
    // remove duplicates
    .reduce((unique, p1) => {
      if (!unique.some((p2) => safeId(p1) === safeId(p2))) unique.push(p1);
      return unique;
    }, [] as (Resident | LegacyResident)[])
    // don't show anyone already on the list
    .filter((person) => {
      if ('id' in person) {
        return !people
          .map((existingPerson) => {
            if ('id' in existingPerson) {
              return existingPerson.id;
            } else {
              return parseInt(String(existingPerson.mosaicId));
            }
          })
          .includes(person.id);
      } else {
        return !people
          .map((existingPerson) => {
            if ('id' in existingPerson) {
              return existingPerson.id;
            } else {
              return parseInt(String(existingPerson.mosaicId));
            }
          })
          .includes(parseInt(String(person.mosaicId)));
      }
    })
    // only show nine max
    .slice(0, 9);

  function mapPeopleToIds(person: LegacyResident | Resident) {
    if ('id' in person) {
      return person.id;
    } else {
      return parseInt(String(person.mosaicId));
    }
  }

  useEffect(() => {
    const residents = people.map((person) => mapPeopleToIds(person));

    axios.patch(
      `/api/submissions/${submissionId}`,
      {
        residents,
      },
      {
        headers: {
          'XSRF-TOKEN': tokenFromMeta(),
        },
      }
    );
  }, [people, submissionId]);

  const handleAdd = (): void => {
    if (idToAdd) {
      const result =
        results &&
        results.find((resident) => {
          if ('id' in resident) {
            return resident.id === idToAdd;
          } else {
            return resident.mosaicId === String(idToAdd);
          }
        });

      if (result !== undefined) {
        setPeople([...people, result]);
      } else {
        setPeople([...people]);
      }
      setOpen(people.length);
      setDialogOpen(false);
      setSearchQuery('');
    }
  };

  const handleRemove = (idToRemove: number): void => {
    function filterPeople(person: Resident | LegacyResident) {
      if ('id' in person) {
        return person.id !== idToRemove;
      } else {
        return person.mosaicId !== String(idToRemove);
      }
    }

    const newPeople: (Resident | LegacyResident)[] = people.filter((person) =>
      filterPeople(person)
    );

    setPeople(newPeople);
    setOpen(newPeople.length - 1);
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
            Search by name or social care ID
          </label>
          <div className="lbh-search-box" style={{ marginTop: 0 }}>
            <input
              className="govuk-input lbh-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
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

        {searchQuery && results ? (
          <PersonSelect
            people={results}
            label="Matching people"
            idToAdd={idToAdd}
            setIdToAdd={setIdToAdd}
          />
        ) : (
          <></>
        )}

        <button
          className="govuk-button lbh-button"
          onClick={handleAdd}
          disabled={idToAdd === -1}
        >
          Add person
        </button>
      </Dialog>
    </section>
  );
};

export default GroupRecordingWidget;
