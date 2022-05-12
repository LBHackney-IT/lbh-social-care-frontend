import React, { useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import Button from 'components/Button/Button';
import { Resident } from 'types';
import ErrorMessage from 'components/ErrorMessage/ErrorMessage';
import Radios from 'components/Form/Radios/Radios';
import { patchAllocation } from 'utils/api/allocatedWorkers';

interface Props {
  resident: Resident;
  allocationId: number;
}

const EditAllocationPriority = ({
  resident,
  allocationId,
}: Props): React.ReactElement => {
  const [postError, setPostError] = useState<boolean | null>();
  const [postLoading, setPostLoading] = useState<boolean>(false);
  const [priorityRating, setPriority] = useState<string>();

  const { query, push } = useRouter();
  const { handleSubmit } = useForm({
    defaultValues: query,
  });

  const editAllocationPriority = useCallback(async () => {
    setPostLoading(true);
    setPostError(null);

    try {
      await patchAllocation(resident.id, {
        id: Number(allocationId),
        ragRating: priorityRating,
      });

      push(`/residents/${resident.id}/allocations`);
    } catch (e) {
      setPostError(true);
    }
    setPostLoading(false);
  }, [priorityRating, push]);

  if (postError) {
    return <ErrorMessage label="Error during POST operation" />;
  }

  return (
    <>
      <form role="form" onSubmit={handleSubmit(editAllocationPriority)}>
        <Radios
          name="priority"
          label="Choose a priority rating"
          options={[
            { value: 'urgent', text: 'Urgent priority' },
            { value: 'high', text: 'High priority' },
            { value: 'medium', text: 'Medium priority' },
            { value: 'low', text: 'Low priority' },
            { value: 'none', text: 'No priority' },
          ]}
          onChange={(elm) => {
            setPriority(elm.target.value);
          }}
          required
        />

        <Button
          label="Continue"
          type="submit"
          data-testid="submitbutton"
          disabled={!priorityRating || postLoading}
        />
      </form>
    </>
  );
};

export default EditAllocationPriority;
