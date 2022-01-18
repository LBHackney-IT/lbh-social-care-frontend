import s from './Contact.module.scss';
import Link from 'next/link';
import React, { useState } from 'react';

const dummyArray = new Array(3).fill(null).map(() => ({
  socialID: '67823',
  firstName: 'Jeff',
  surName: 'Dummy-Search',
  dateOfBirth: '19/01/1968',
  address: '90 Sesame Street, Hackney, London',
  postcode: 'E9 6EY',
}));

const ContactTable = (): React.ReactElement => {
  const [person, setPerson] = useState(false);
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
                <tr key={3} className="govuk-table__row">
                  <td key={3} className="govuk-table__cell">
                    {info.socialID}
                  </td>
                  <td key={3} className="govuk-table__cell">
                    {info.firstName} {info.surName}
                  </td>
                  <td key={3} className="govuk-table__cell">
                    {info.dateOfBirth}
                  </td>
                  <td key={3} className="govuk-table__cell">
                    {info.address}
                  </td>
                  <td key={3} className="govuk-table__cell">
                    {info.postcode}
                  </td>
                  <td key={3} className="govuk-table__cell">
                    <a onClick={() => setPerson(true)}>Link person </a>
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
        Records for Jan Smith have been linked.{' '}
        <Link href="#">
          <a>Undo linking. </a>
        </Link>
      </div>
    );
};

export default ContactTable;
