import s from './Contact.module.scss';
import Link from 'next/link';
import React, { useState } from 'react';
import { updateMashResident } from 'utils/api/mashResident';
import { MashResident, Resident, UpdateMashResidentData } from 'types';

const dummyArray = [
  {
    socialID: '67823',
    firstName: 'Jeff',
    lastName: 'Dummy-Search',
    dateOfBirth: '19/01/1968',
    address: '90 Sesame Street, Hackney, London',
    postcode: 'E9 6EY',
  },
  {
    socialID: '33311',
    firstName: 'Sam',
    lastName: 'Brown',
    dateOfBirth: '12/11/1970',
    address: '10 Popcorn Avenue, Hackney, London',
    postcode: 'E10 9TU',
  },
  {
    socialID: '12345',
    firstName: 'Apple',
    lastName: 'Pie',
    dateOfBirth: '11/07/1958',
    address: '12 Example Lane, Hackney, London',
    postcode: 'E12 7RT',
  },
];
interface Props {
  potentialMatch: Resident;
  mashResident: MashResident;
}

const ContactTable = ({
  potentialMatch,
  mashResident,
}: Props): React.ReactElement => {
  const [person, setPerson] = useState(false);

  const linkPerson = async () => {
    setPerson(true);

    const matchRequest: UpdateMashResidentData = {
      id: mashResident.id,
      socialCareId: potentialMatch.id,
      updateType: null,
    };

    await updateMashResident(matchRequest, matchRequest.id);
  };

  const unLinkPerson = async () => {
    setPerson(false);

    const removeMatchRequest: UpdateMashResidentData = {
      id: mashResident.id,
      updateType: 'UNLINK-PERSON',
    };

    await updateMashResident(removeMatchRequest, removeMatchRequest.id);
  };

  if (person === false)
    return (
      <div className={s.banner}>
        <h3>Potential matches</h3>
        <p className={s.text}>
          The client details in this referral appears to match pre-existing
          record/s in the system. Please double check to make sure this client
          does not already exist. If the records match you can link the referral
          to this pre-existing client.
        </p>
        <table className={`govuk-table ${s.tableHeading}`}>
          <thead>
            <tr>
              <th className="govuk-table__header">Social care ID</th>
              <th className="govuk-table__header">Client Name</th>
              <th className="govuk-table__header">Date of birth</th>
              <th className="govuk-table__header">Address</th>
              <th className="govuk-table__header">Postcode</th>
              <th className="govuk-table__header">Action</th>
            </tr>
          </thead>
          <tbody className={s.tableText}>
            {dummyArray.map((info) => {
              return (
                <tr key={info.socialID} className="govuk-table__row">
                  <td key={'Social care ID'} className="govuk-table__cell">
                    {info.socialID}
                  </td>
                  <td key={'Client Name'} className="govuk-table__cell">
                    {info.firstName} {info.lastName}
                  </td>
                  <td key={'Date of birth'} className="govuk-table__cell">
                    {info.dateOfBirth}
                  </td>
                  <td key={'Address'} className="govuk-table__cell">
                    {info.address}
                  </td>
                  <td key={'Postcode'} className="govuk-table__cell">
                    {info.postcode}
                  </td>
                  <td key={'Action'} className="govuk-table__cell">
                    <a onClick={linkPerson}>Link person </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  else
    return (
      <div className={s.confirmationBanner}>
        Records for {`${dummyArray[0].firstName} ${dummyArray[0].lastName}`}{' '}
        have been linked.{' '}
        <Link href="#">
          <a onClick={unLinkPerson}>Undo linking. </a>
        </Link>
      </div>
    );
};

export default ContactTable;
