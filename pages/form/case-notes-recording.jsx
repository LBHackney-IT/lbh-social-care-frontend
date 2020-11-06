import Router from 'next/router';
import { useForm } from 'react-hook-form';

import { Button, DateInput, TextInput, Select } from 'components/Form';

const CaseNotesRecording = () => {
  const { register, errors, handleSubmit, control } = useForm();
  const onSubmit = () => {
    Router.push('/');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="govuk-form-group">
        <fieldset
          className="govuk-fieldset"
          role="group"
          aria-describedby="step-hint"
        >
          <legend className="govuk-fieldset__legend govuk-fieldset__legend--l">
            <h1 className="govuk-fieldset__heading">
              ASC Case Notes Recording
            </h1>
          </legend>
          <TextInput
            name="firstName"
            width="30"
            label="First Name"
            required={true}
            register={register({ required: true })}
            error={errors && errors.firstName}
          />
          <TextInput
            label="Last name:"
            width="30"
            name="last_name"
            required={true}
            register={register({ required: true })}
            error={errors && errors.last_name}
          />
          <DateInput
            control={control}
            name="dateOfBirth"
            label="Date of Birth"
            rules={{ required: true }}
            hint="For example, 31 03 1980"
            error={errors && errors.dateOfBirth}
          />
          <TextInput
            name="address"
            width="30"
            label="Primary Address"
            register={register}
          />
          <TextInput
            name="postcode"
            width="30"
            label="Post Code"
            register={register}
          />
          <TextInput
            name="contactNumber"
            width="30"
            label="Contact Number"
            register={register}
          />
          <TextInput
            name="mosaicId"
            label="Mosaic Person Reference"
            hint="For example 0123456789"
            width="30"
            register={register}
          />
          <TextInput
            name="emergencyIDNumber"
            width="30"
            label="Emergency ID Number"
            hint="For example 0123456789"
            register={register}
          />
          <Select
            name="caseNoteType"
            label="Case Note Type"
            register={register}
            options={[
              'Care Charges',
              'Case Audit',
              'Case Summary',
              'Contact with Health Professional',
              'Correspondence',
              'Death Notification',
              'Discharge Planning - HSWT',
              'Duty Avtion',
              'Home Visit',
              'ILDS Duty Action',
              'Integrated Independence Team Progress',
              'Legacy Adult Assessment',
              "Manager's Decision",
              'No Reply To Home Visit',
              'Office Visit',
              'Record of Meeting',
              'Record of Supervision Discussion',
              'Safeguarding',
              'Telephone Contact',
              'Case Transfer',
              'Additional Hours Requested',
              'Contact Adults',
              'Significant Information on an Open Case',
              'Other',
            ]}
          />
          <TextInput
            name="otherNoteType"
            width="30"
            label="if 'Other', please provide case note type"
            register={register}
          />
          <DateInput
            control={control}
            name="dateOfEvent"
            label="Date of Event"
            hint="For example, 31 03 1980"
            rules={{ required: false }}
          />
          <TextInput
            name="caseNoteDescription"
            width="30"
            register={register}
            label="Case Note Description (please write case notes here)"
          />
        </fieldset>
      </div>
      <Button className="govuk-button" label="Next" type="submit" />
    </form>
  );
};

export default CaseNotesRecording;
