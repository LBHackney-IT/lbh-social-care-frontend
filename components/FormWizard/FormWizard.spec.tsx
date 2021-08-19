import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import FormWizard from './FormWizard';

jest.mock('next/router', () => ({
  __esModule: true,
  default: {
    events: {
      on: jest.fn(),
    },
    push: jest.fn(),
  },
  useRouter: () => ({
    query: {
      stepId: ['1'],
    },
    asPath: 'path',
    push: jest.fn(),
  }),
}));

const formSteps = [
  {
    id: 'step-1',
    title: 'Step 1',
    components: [
      {
        component: 'TextInput',
        name: 'title-one',
        label: 'Field Title One',
      },
    ],
  },
  {
    id: 'step-two',
    title: 'Step 2',
    components: [
      {
        component: 'TextInput',
        name: 'title-two',
        label: 'Field Title Two',
      },
    ],
  },
];

describe('<FormWizard />', () => {
  it("should call the 'onStepProgress' callback prop with the current form data when the step is progressed", async () => {
    const handleProgressStep = jest.fn();

    render(
      <FormWizard
        formPath="/form/path"
        title="Form title"
        onProgressStep={handleProgressStep}
        formSteps={formSteps}
      />
    );

    fireEvent.change(screen.getByLabelText('Field Title One'), {
      target: {
        value: 'This is my value',
      },
    });

    fireEvent.click(screen.getByRole('button', { name: 'Continue' }));

    await waitFor(() => expect(handleProgressStep).toHaveBeenCalled());
    expect(handleProgressStep).toHaveBeenCalledWith({
      'title-one': 'This is my value',
    });
  });
});
