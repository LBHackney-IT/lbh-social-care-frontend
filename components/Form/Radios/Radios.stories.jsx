import Radios from './Radios';

export default {
  title: 'Form/Radios',
  component: Radios,
};

const Template = (args) => <Radios {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: 'Radios',
  hint: 'I am a hint text',
  name: 'default',
};

export const withOptions = Template.bind({});
withOptions.args = {
  label: 'Radios',
  name: 'withOptions',
};

export const withError = Template.bind({});
withError.args = {
  label: 'Radios',
  name: 'withError',
  error: { message: 'Ops! There was an error!' },
};

export const withRadioInNewline = Template.bind({});
withRadioInNewline.args = {
  label: 'Radios',
  name: 'withRadioInNewline',
  isRadiosInline: false,
};

export const withChildren = Template.bind({});
withChildren.args = {
  label: 'Radios',
  hint: 'you can add a children element, that is going to be shown 👇',
  name: 'withChildren',
  children: (
    <details
      className="govuk-details  govuk-!-margin-bottom-3"
      data-module="govuk-details"
    >
      <summary className="govuk-details__summary">
        <span className="govuk-details__summary-text">click to expand</span>
      </summary>
      <div className="govuk-details__text">Hello :)</div>
    </details>
  ),
};
