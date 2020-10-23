import ErrorSummary from './ErrorSummary';

export default {
  title: 'ErrorSummary',
  component: ErrorSummary,
};

const Template = (args) => <ErrorSummary {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: 'Error Summary',
  body: 'i am an error summary box',
  links: [
    { href: 'foo', text: 'foo' },
    { href: 'bar', text: 'bar' },
  ],
};
