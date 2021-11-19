import s from './Contact.module.scss';
import Link from 'next/link';
import Button from 'components/Button/Button';
import React, { useState } from 'react';

// const clientMatches = [
//   {
//     id: '#786288',
//     clientName: 'Sally Samuels',
//     dateOfBirth: '09/12/1972',
//     address: '90 Narford Rd, Hackney, London',
//     postcode: 'E9 6EY',
//   },
//   {
//     id: '#786288',
//     clientName: 'Sally Samuels',
//     dateOfBirth: '09/12/1972',
//     address: '90 Narford Rd, Hackney, London',
//     postcode: 'E9 6EY',
//   },
//   {
//     id: '#786288',
//     clientName: 'Sally Samuels',
//     dateOfBirth: '09/12/1972',
//     address: '90 Narford Rd, Hackney, London',
//     postcode: 'E9 6EY',
//   },
// ];

const clientDetails = [
  '#786288',
  'Jan Smith',
  '09/12/1972',
  '90 Narford Rd, Hackney, London',
  'E9 6EY',
];

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
            </tr>
          </thead>
          <tbody>
            <tr className="govuk-table__row">
              {clientDetails.map((cell) => (
                <td key={cell} className="govuk-table__cell">
                  {cell}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
        <Button
          label="Link person"
          type="submit"
          onClick={() => setPerson(true)}
        />
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
