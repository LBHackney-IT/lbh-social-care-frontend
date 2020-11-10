import { useForm } from 'react-hook-form';
import { useState } from 'react';
import Router from 'next/router';

import ErrorSummary from 'components/ErrorSummary/ErrorSummary';
import { Button, DateInput, Radios, TextInput } from 'components/Form';
import { postResidentCase } from 'utils/api/residents';

const CaseNotes = (props) => {
  const [error, setError] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { register, errors, handleSubmit, control } = useForm({
    defaultValues: props.formData,
  });

  const sendData = async (formData) => {
    const stringData = JSON.stringify({ ...props.formData, ...formData });
    const formattedData = { caseFormData: stringData };
    try {
      setSubmitting(true);
      await postResidentCase(props.formData.mosaic_id, formattedData);
    } catch (e) {
      setSubmitting(false);
      setError(e.message);
    }
  };
  const onSubmit = async (formData) => {
    try {
      await sendData(formData);
      Router.replace({
        pathname: '/form/adult-referral/confirmation',
      });
    } catch {
      setSubmitting(false);
      setError(true);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="govuk-form-group">
          <TextInput
            name="summariseInfo"
            width="30"
            register={register}
            label="Please summarise the information provided by the contact"
          />
          <Radios
            name="subjectAware"
            label="Is the subject aware of the contact?"
            options={['Yes', 'No', 'Not Known']}
            register={register}
          />
          <Radios
            name="adviceOffered"
            label="Was information and advice offered?"
            register={register}
          />
          <TextInput
            name="categoryInfo"
            width="30"
            register={register}
            label="a. Information and advice offered (Category)"
          />
          <TextInput
            name="detailInfo"
            width="30"
            register={register}
            label="b. Information and advice offered (Details)"
          />
          <TextInput
            name="referredAgencies"
            width="30"
            register={register}
            label="Please identify any other agencies that the person making contact has been referred to."
          />
          <h3>
            Please note information from this assessment may be shared
            regardless of your consent where there is a 'Vital Interest' i.e.
            where it is critical to prevent serious harm, distress or in life
            threatening situations
          </h3>
          <Radios
            name="infoShared"
            label="If client has not agreed consent, has information still to be shared?"
            options={['Yes, under duty of care', 'No']}
            register={register}
          />
          <TextInput
            name="justification"
            width="30"
            register={register}
            label="Justification for information to be shared outside of client consent"
          />
          <DateInput
            control={control}
            name="dateAgreed"
            label="Date Agreed"
            rules={{ required: false }}
            hint="For example, 31 03 1980"
          />
          <Radios
            name="nextAction"
            label="Next Actions"
            options={[
              'Community Care Assessment - Occupational Therapy',
              'No Further Action',
              'Close Case',
            ]}
            register={register({ required: true })}
            error={errors && errors.nextAction}
            required={true}
          />
          <Radios
            name="infoShared"
            label={`If 'No Further Action' please pick one of the following`}
            options={[
              'Universal Services/ Signposted to other services',
              'No Services Provided - Deceased',
              'No Services Provided - other reason',
            ]}
            register={register}
          />
        </div>
        <Button
          className="govuk-button"
          label="Next"
          type="submit"
          disabled={submitting}
        />
      </form>
      {error && (
        <ErrorSummary
          title="Unfortunately there was a problem with your submission."
          body="Please try again."
        />
      )}
    </>
  );
};

export default CaseNotes;
