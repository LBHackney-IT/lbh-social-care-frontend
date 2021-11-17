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
  'Sally Samuels',
  '09/12/1972',
  '90 Narford Rd, Hackney, London',
  'E9 6EY',
];

const ContactTable = (): React.ReactElement => {
  const [person, setPerson] = useState(false);
  console.log(person);
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
          <th className="govuk-table__header">Social care ID</th>
          <th className="govuk-table__header">Client Name</th>
          <th className="govuk-table__header">Date of birth</th>
          <th className="govuk-table__header">Address</th>
          <th className="govuk-table__header">Postcode</th>
          <tr className="govuk-table__row">
            {clientDetails.map((cell) => (
              <td key={cell} className="govuk-table__cell">
                {cell}
              </td>
            ))}
          </tr>
        </table>

        {/* This was the attempt when we paired but they just show as rows on top of each other
        
        <table className={`govuk-table ${s.tableHeading}`}>
          <th className="govuk-table__header">Social care ID</th>
          <tr>
          <tbody className={`govuk-table__body ${s.text}`}>
            {clientMatches.map((clients) => (
              <tr className="govuk-table__row">
                <td key={clients.id} className="govuk-table__cell">
                  {clients.id}
                </td>
              </tr>
            ))}
          </tbody>
          <th className="govuk-table__header">Client name</th>
          <tbody className={`govuk-table__body ${s.text}`}>
            {clientMatches.map((clients) => (
              <tr className="govuk-table__row">
                <td key={clients.id} className="govuk-table__cell">
                  {clients.clientName}
                </td>
              </tr>
            ))}
          </tbody>
          </tr>
        </table> */}

        {/*  trying to map the subarray of 'clientMatches' here:

{clientMatches.map((obj, idx) => {
   return (
     <td className="govuk-table__cell">
       {obj.map((element) => {
         return <div>{element.id}</div>;
       })}
       ,
     </td>
   );
 })} */}

        {
          //this works when there isn't a subarray
          /* <table className={`govuk-table ${s.tableHeading}`}>
          <thead className="govuk-table__head">
            <tr className="govuk-table__row">
              {header.map((text) => (
                <th key={text} className="govuk-table__header">
                  {text}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className={`govuk-table__body ${s.text}`}>
            <tr className="govuk-table__row">
              {cases.map((cell) => (
                <td key={cell} className="govuk-table__cell">
                  {cell}
                </td>
              ))}
            </tr>
          </tbody>
        </table>{' '}
        <Button
          label="Link person"
          type="submit"
          onClick={() => setPerson(true)}
        />{' '} */
        }

        <Button
          label="Link person"
          type="submit"
          onClick={() => setPerson(true)}
        />
        {/*<h3>Can't find a match?</h3>
         <p className={s.text}>
          Then {''}
          <Link href="#">
            <a>add a new person.</a>
          </Link>
        </p> */}
      </div>
    );
  else
    return (
      <div className={s.confirmationBanner}>
        Records for Sally Samuels have been linked.{' '}
        <Link href="Undo">
          <a>Undo linking. </a>
        </Link>
      </div>
    );
};

export default ContactTable;
