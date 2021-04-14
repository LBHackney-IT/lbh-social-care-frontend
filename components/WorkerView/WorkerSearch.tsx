import Button from 'components/Button/Button';
import { EmailInput } from 'components/Form';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useWorker } from 'utils/api/workers';
import WorkerRecap from 'components/WorkerView/WorkerRecap';
import AllocatedCases from 'components/AllocatedCases/AllocatedCases';

interface FormValues {
  email: string;
}

const WorkerSearch = (): React.ReactElement => {
  const [params, setParams] = useState<FormValues>();
  const { data } = useWorker(params);
  console.log(data);

  const { register, handleSubmit, errors } = useForm();

  return (
    <>
      <form
        role="form"
        onSubmit={handleSubmit((formData: FormValues) => setParams(formData))}
      >
        <div className="govuk-grid-row">
          <div className="govuk-grid-column-one-half">
            <EmailInput
              error={errors.email}
              name="email"
              hint="Email address must contain @hackney.gov.uk"
              label="Worker's email address:"
              labelSize="s"
              placeholder="Email"
              rules={{ required: 'Enter a valid worker email' }}
              register={register}
            />
          </div>
        </div>
        <Button label={'Search for worker'} type="submit" />
      </form>
      {data?.[0] && (
        <>
          <WorkerRecap {...data[0]} />{' '}
          <AllocatedCases id={data?.[0].id}></AllocatedCases>{' '}
        </>
      )}
    </>
  );
};

export default WorkerSearch;
