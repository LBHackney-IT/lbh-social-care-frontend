import Router from 'next/router';
import { useForm } from 'react-hook-form';
import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs';
import {
  Button,
  DateInput,
  Radios,
  TextInput,
  NationalityList,
} from 'components/Form';

const ClientDetails = (props) => {
  const { register, errors, handleSubmit, control } = useForm({
    defaultValues: props.formData,
  });
  const onSubmit = (data) => {
    props.saveData(data);
    Router.push(props.stepPath, props.nextStep);
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
            <h1 className="govuk-fieldset__heading">Create new record</h1>
          </legend>
          <div className="govuk-breadcrumbs">
            <ol className="govuk-breadcrumbs__list">
              <Breadcrumbs
                label="Client Details"
                link="/form/adult-referral/client-details"
                state="current"
              />
              <Breadcrumbs
                label="Referral Details"
                link="/form/adult-referral/referral-details"
              />
              <Breadcrumbs
                label=" Case Notes"
                link="/form/adult-referral/case-notes"
              />
            </ol>
          </div>
          <legend className="govuk-fieldset__legend govuk-fieldset__legend--m">
            <h1 className="govuk-fieldset__heading">Client personal details</h1>
          </legend>
          <DateInput
            control={control}
            name="dateOfContact"
            label="Date of contact"
            rules={{ required: true }}
            hint="For example, 31 03 1980"
            error={errors && errors.dateOfContact}
          />

          <TextInput
            name="mosaic_id"
            width="30"
            label="Mosaic ID Number"
            hint="For example 0123456789"
            register={register({ required: true })}
            error={errors && errors.mosaic_id}
            required={true}
          />
          <TextInput
            name="nhsNumber"
            width="30"
            label="NHS Number"
            hint="For example 0123456789"
            register={register}
          />
          <TextInput
            name="title"
            width="30"
            label="Title"
            register={register}
          />
          <TextInput
            name="lastName"
            width="30"
            label="Surname"
            required={true}
            register={register({ required: true })}
            error={errors && errors.surname}
          />
          <TextInput
            name="firstName"
            width="30"
            label="First Name"
            required={true}
            register={register({ required: true })}
            error={errors && errors.firstName}
          />
          <TextInput
            name="otherNames"
            width="30"
            label="Other Names"
            register={register}
          />
          <DateInput
            control={control}
            name="dateOfBirth"
            label="Date of Birth"
            rules={{ required: true }}
            hint="For example, 31 03 1980"
            error={errors && errors.dateOfBirth}
          />
          <NationalityList
            name="nationality"
            label="Nationality"
            required={true}
            register={register()}
          />
          <Radios
            name="gender"
            label="Gender"
            options={['Female', 'Male', 'Unknown', 'Other']}
            register={register({ required: true })}
            error={errors && errors.gender}
            required={true}
          />
          <TextInput
            name="addressLine1"
            width="30"
            label="Primary Address"
            required={true}
            register={register({ required: true })}
            error={errors && errors.address}
          />
          <TextInput
            name="postCode"
            width="30"
            label="Post Code"
            required={true}
            register={register({ required: true })}
            error={errors && errors.postcode}
          />
          <TextInput
            name="phone"
            width="30"
            label="Phone Number"
            register={register}
          />
        </fieldset>
      </div>
      <Button className="govuk-button" label="Next" type="submit" />
    </form>
  );
};

export default ClientDetails;
