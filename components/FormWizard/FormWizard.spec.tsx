import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Router from 'next/router';
import { useBeforeunload } from 'react-beforeunload';
import FormWizard from './FormWizard';

const query: {
  stepId: string[];
  redirectUrl?: string;
} = {
  stepId: ['1'],
};

jest.mock('react-beforeunload', () => ({
  useBeforeunload: jest.fn(),
}));

jest.mock('next/router', () => ({
  __esModule: true,
  default: {
    events: {
      on: jest.fn(),
    },
    push: jest.fn(),
  },
  useRouter: () => ({
    query,
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

const handleProgressStep = jest.fn();

describe('<FormWizard />', () => {
  it("should call the 'onStepProgress' callback prop with the current form data when the step is progressed", async () => {
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

  it('passes the redirect parameter to the next step, if it exists', async () => {
    query.redirectUrl = 'foooooo';

    render(
      <FormWizard
        formPath="/form/path"
        title="Form title"
        onProgressStep={handleProgressStep}
        formSteps={formSteps}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: 'Continue' }));

    await waitFor(() =>
      expect(Router.push).toBeCalledWith({
        pathname: '/form/pathstep-two',
        query: { redirectUrl: 'foooooo' },
      })
    );
  });

  it('copes if there is no redirect url', async () => {
    query.redirectUrl = undefined;

    render(
      <FormWizard
        formPath="/form/path"
        title="Form title"
        onProgressStep={handleProgressStep}
        formSteps={formSteps}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: 'Continue' }));

    await waitFor(() =>
      expect(Router.push).toBeCalledWith({
        pathname: '/form/pathstep-two',
        query: {},
      })
    );
  });

  it('uses the beforeunload hook', () => {
    render(
      <FormWizard
        formPath="/form/path"
        title="Form title"
        onProgressStep={handleProgressStep}
        formSteps={formSteps}
      />
    );

    expect(useBeforeunload).toBeCalledTimes(1);
  });
});
