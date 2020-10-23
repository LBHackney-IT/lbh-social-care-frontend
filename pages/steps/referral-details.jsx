import Router from 'next/router';
import { useForm } from 'react-hook-form';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import { Button, DateInput, Radios, Select, TextInput } from 'components/Form';

const ReferralDetails = () => {
  const { register, handleSubmit, control } = useForm();
  const onSubmit = () => {
    window.scrollTo(0, 0);
    Router.push('/steps/case-notes');
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
                state="completed"
              />
              <Breadcrumbs
                label="Referral Details"
                link="/steps/referral-details"
                state="current"
              />
              <Breadcrumbs label=" Case Notes" link="/steps/case-notes" />
            </ol>
          </div>
          <legend className="govuk-fieldset__legend govuk-fieldset__legend--m">
            <h1 className="govuk-fieldset__heading">Referral Details</h1>
          </legend>
          <TextInput
            name="referrerName"
            width="30"
            label="Referrer Name"
            register={register()}
          />
          <TextInput
            name="referrerRelationship"
            width="30"
            label="Referrer relationship"
            register={register()}
          />
          <TextInput
            name="referrerOrganisation"
            width="30"
            label="Referrer Organisation"
            register={register()}
          />
          <TextInput
            name="referrerEmail"
            width="30"
            label="Referrer Email"
            register={register()}
          />
          <TextInput
            name="referrerTelephone"
            width="30"
            label="Referrer Telephone"
            register={register()}
          />
          <TextInput
            name="referrerRole"
            width="30"
            label="Referrer Role"
            register={register()}
          />
          <DateInput
            control={control}
            name="contactDate"
            label="Contact Date"
            rules={{ required: false }}
            hint="For example, 31 03 1980"
            register={register()}
          />
          <Select
            name="contactMethod"
            label="Contact Method"
            register={register()}
            options={['Email', 'Phone', 'Mail', 'Face to Face']}
          />
          <Select
            name="contactType"
            label="Contact Type"
            register={register()}
            options={[
              'Self-referral',
              'Professional referral',
              'Third party referral',
              'Other',
            ]}
          />
          <TextInput
            name="otherContact"
            width="30"
            label="Detail if Other"
            register={register()}
          />
          <Radios
            name="routeAccess"
            label="Route of Access"
            options={[
              'Planned Entry (Transition)',
              'Discharge from Hospital',
              'Diversion from Hospital Services',
              'Self-funder with depleted funds',
              'Self-funder with depleted funds (of which previously provided with 12-week disregard or deferred payment)',
              'Community/Other route',
            ]}
            register={register()}
          />
          <Radios
            name="presentingIssue"
            label="Presenting Issue"
            options={['Female', 'Male', 'Unknown', 'Other']}
            register={register()}
          />
          <Radios
            name="presentingIssue"
            label="Presenting Issue"
            options={[
              'Information and advice',
              'Hospital discharge',
              'Temporary illness',
              'Simple services',
              'Assessment',
              'Test/Investigations',
            ]}
            register={register()}
          />
        </fieldset>
      </div>
      <Button className="govuk-button" label="Next" type="submit" />
    </form>
  );
};

export default ReferralDetails;
