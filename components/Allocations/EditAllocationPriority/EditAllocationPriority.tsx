import React, { useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import Button from 'components/Button/Button';
import { Resident } from 'types';
import ErrorMessage from 'components/ErrorMessage/ErrorMessage';
import Radios from 'components/Form/Radios/Radios';

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

    console.log('priorityRating', priorityRating);
    console.log('allocationId', allocationId);

    // try {
    //   // await deallocateTeamWorker(resident.id, {
    //   //   id: Number(allocationId),
    //   //   priorityRating: priorityRating,
    //   // });
    //
    //   push(`/people/${resident.id}`);
    // } catch (e) {
    //   setPostError(true);
    // }
    setPostLoading(false);
  }, [priorityRating, push]);

  if (postError) {
    return <ErrorMessage />;
  }

  return (
    <>
      <form role="form" onSubmit={handleSubmit(editAllocationPriority)}>
        <Radios
          name="priority"
          label="Choose a priority rating"
          options={[
            { value: 'purple', text: 'Urgent priority' },
            { value: 'red', text: 'High priority' },
            { value: 'amber', text: 'Medium priority' },
            { value: 'green', text: 'Low priority' },
            { value: 'white', text: 'No priority' },
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
