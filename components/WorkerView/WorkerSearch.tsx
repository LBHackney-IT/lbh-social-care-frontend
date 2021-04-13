import Button from 'components/Button/Button';
import ErrorMessage from 'components/ErrorMessage/ErrorMessage';
import { EmailInput } from 'components/Form';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useWorker } from 'utils/api/workers';

interface WorkerSearchValues {
  email: string;
}

const WorkerSearch = (): React.ReactElement => {
  const [params, setParams] = useState();
  const { data } = useWorker(params);
  console.log(data);

  const { register, handleSubmit, errors } = useForm();
  const onFormSubmit = (formData) => {
    setParams(formData);
  };
  return (
    <form role="form" onSubmit={handleSubmit(onFormSubmit)}>
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-one-half">
          <EmailInput
            error={errors.email}
            name="email"
            hint="jdsadj"
            label="Uploaded by:"
            labelSize="s"
            placeholder="Email"
            rules={{ required: 'Enter a valid worker email' }}
            register={register}
          />
        </div>
      </div>
      <Button label={'Search for worker'} type="submit" />
      {params?.email}
    </form>
  );
};

export default WorkerSearch;
