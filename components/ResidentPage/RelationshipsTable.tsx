import Link from 'next/link';
import { RELATIONSHIP_TYPES } from 'data/relationships';
import { prettyResidentName } from 'lib/formatters';
import { ExistingRelationship, RelationshipData } from 'types';
import s from './RelationshipsTable.module.scss';
import RemoveRelationshipDialog from 'components/Relationships/RemoveRelationshipDialog/RemoveRelationshipDialog';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { removeRelationship } from 'utils/api/relationships';

interface Props {
  relationships: RelationshipData;
}

const RelationshipsTable = ({ relationships }: Props): React.ReactElement => {
  const [open, setOpen] = useState<boolean>(false);
  const [relationshipToRemove, setRelationshipToRemove] =
    useState<ExistingRelationship>();

  const { reload } = useRouter();

  return (
    <>
      <RemoveRelationshipDialog
        person={relationshipToRemove}
        isOpen={open}
        onDismiss={() => setOpen(false)}
        onFormSubmit={async () => {
          setOpen(false);
          if (relationshipToRemove) {
            await removeRelationship(relationshipToRemove.id.toString());
            reload();
          }
        }}
      />

      <table className={`govuk-table lbh-table lbh-body-s ${s.table}`}>
        <tbody className="govuk-table__body">
          {relationships.personalRelationships.map((r) => (
            <tr className="govuk-table__row lbh-body-s" key={r.type}>
              <th scope="row" className="govuk-table__header">
                {RELATIONSHIP_TYPES[r.type]}
              </th>
              <td className="govuk-table__cell ">
                <ul className="lbh-list lbh-body-s">
                  {r.relationships.map((rr) => (
                    <li key={rr.id} className={s.item}>
                      <Link href={`/residents/${rr.personId}`}>
                        {prettyResidentName(rr)}
                      </Link>

                      {(rr.details || rr.isMainCarer) && (
                        <p className="lbh-body-xs">
                          {rr.details} {rr.isMainCarer && 'Main carer'}
                        </p>
                      )}

                      <button
                        onClick={() => {
                          setRelationshipToRemove(rr);
                          setOpen(true);
                        }}
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Link href={`/people/${relationships.personId}/relationships/add`}>
        <a className="govuk-button lbh-button lbh-button--secondary lbh-button--add">
          <svg width="12" height="12" viewBox="0 0 12 12">
            <path d="M6.94 0L5 0V12H6.94V0Z" />
            <path d="M12 5H0V7H12V5Z" />
          </svg>
          Add a relationship
        </a>
      </Link>
    </>
  );
};

export default RelationshipsTable;
