import Router from 'next/router';
import { useForm } from 'react-hook-form';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import { Button, DateInput, Radios, TextInput } from 'components/Form';

const ClientDetails = () => {
  const { register, errors, handleSubmit, control } = useForm();
  const onSubmit = () => {
    window.scrollTo(0, 0);
    Router.push('/steps/referral-details');
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
                link="/steps/client-details"
                state="current"
              />
              <Breadcrumbs
                label="Referral Details"
                link="/steps/referral-details"
              />
              <Breadcrumbs label=" Case Notes" link="/steps/case-notes" />
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
            name="mosaicId"
            width="30"
            label="Mosaic ID Number"
            hint="For example 0123456789"
            register={register({ required: true })}
            error={errors && errors.mosaicId}
            control={control}
            required={true}
          />
          <TextInput
            name="nhsNumber"
            width="30"
            label="NHS Number"
            hint="For example 0123456789"
            register={register()}
          />
          <TextInput
            name="title"
            width="30"
            label="Title"
            register={register()}
          />
          <TextInput
            name="surname"
            width="30"
            label="Surname"
            required={true}
            control={control}
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
            register={register()}
          />
          <DateInput
            control={control}
            name="dateOfBirth"
            label="Date of Birth"
            rules={{ required: true }}
            hint="For example, 31 03 1980"
            error={errors && errors.dateOfBirth}
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
            name="address"
            width="30"
            label="Primary Address"
            required={true}
            register={register({ required: true })}
            error={errors && errors.address}
          />
          <TextInput
            name="postcode"
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
            register={register()}
          />
        </fieldset>
      </div>
      <Button className="govuk-button" label="Next" type="submit" />
    </form>
  );
};

export default ClientDetails;
