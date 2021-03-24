import { ReactNode } from 'react';

import {
  createSteps,
  getNextStepPath,
  renderOnCondition,
  filterStepsOnCondition,
  filterDataOnCondition,
  haveStepsChanged,
} from './steps';

import Summary from 'components/Steps/Summary';
import Confirmation from 'components/Steps/Confirmation';

const FakeComponentStep = (): ReactNode => <div>foo</div>;

describe('FormWizard', () => {
  const steps = [
    { id: 'first-step', title: 'First Step', component: FakeComponentStep },
    {
      id: 'second-step',
      title: 'Second Step',
      components: [{ name: 'foo' }, { name: 'bar' }],
    },
    { id: 'third-step', title: 'Third Step', components: [{ name: 'foobar' }] },
  ];
  const customSteps = { confirmation: Confirmation, summary: Summary };

  describe('createSteps', () => {
    it('should initialise properly with default steps', () => {
      expect(createSteps(steps)).toEqual([
        { id: 'first-step', title: 'First Step', component: FakeComponentStep },
        {
          id: 'second-step',
          title: 'Second Step',
          components: [{ name: 'foo' }, { name: 'bar' }],
        },
        {
          id: 'third-step',
          title: 'Third Step',
          components: [{ name: 'foobar' }],
        },
        { id: 'summary', title: 'Summary', component: Summary },
        { id: 'confirmation', title: 'Confirmation', component: Confirmation },
      ]);
    });

    it('should initialise properly with custom steps', () => {
      expect(createSteps(steps, customSteps)).toEqual([
        { id: 'first-step', title: 'First Step', component: FakeComponentStep },
        {
          id: 'second-step',
          title: 'Second Step',
          components: [{ name: 'foo' }, { name: 'bar' }],
        },
        {
          id: 'third-step',
          title: 'Third Step',
          components: [{ name: 'foobar' }],
        },
        { id: 'summary', title: 'Summary', component: customSteps.summary },
        {
          id: 'confirmation',
          title: 'Confirmation',
          component: customSteps.confirmation,
        },
      ]);
    });
  });

  describe('getNextStepPath', () => {
    it('should return the correct step', () => {
      expect(getNextStepPath(1, steps, '/form/', {})).toEqual(
        '/form/third-step'
      );
    });
  });

  describe('renderOnCondition', () => {
    it('should return the component if no render condition', () => {
      expect(
        renderOnCondition(
          {
            id: 'foo',
            title: 'foo',
            components: [],
          },
          {},
          FakeComponentStep
        )
      ).toEqual(FakeComponentStep);
    });
    it('should return the component if render condition "true"', () => {
      expect(
        renderOnCondition(
          {
            id: 'foo',
            title: 'foo',
            components: [],
            conditionalRender: ({ hide }) => hide !== true,
          },
          { hide: false },
          FakeComponentStep
        )
      ).toEqual(FakeComponentStep);
    });
    it('should NOT return the component if render condition "false"', () => {
      expect(
        renderOnCondition(
          {
            id: 'foo',
            title: 'foo',
            components: [],
            conditionalRender: ({ hide }) => hide !== true,
          },
          { hide: true },
          FakeComponentStep
        )
      ).toEqual(null);
    });
  });

  describe('filterStepsOnCondition', () => {
    const steps = [
      {
        id: 'step-a',
        title: 'Step A',
        components: [
          {
            component: 'Radios',
            name: 'conditional_trigger',
            label: 'Show next step?',
            rules: { required: true },
          },
        ],
      },
      {
        id: 'step-b',
        title: 'Step B',
        conditionalRender: ({ conditional_trigger }: Record<string, unknown>) =>
          conditional_trigger === 'Yes',
        components: [
          {
            component: 'TextInput',
            name: 'foo',
            rules: { required: true },
          },
          {
            component: 'TextInput',
            conditionalRender: ({
              conditional_trigger,
            }: Record<string, unknown>) => conditional_trigger === 'No',
            name: 'conditional_input',
            label: 'Please filter me',
            rules: { required: true },
          },
          {
            component: 'TextInput',
            conditionalRender: ({
              conditional_trigger,
            }: Record<string, unknown>) => conditional_trigger === 'Yes',
            name: 'conditional_input',
            label: 'Please hide me',
            rules: { required: true },
          },
        ],
      },
      {
        id: 'step-c',
        title: 'Step C',
        conditionalRender: ({ conditional_trigger }: Record<string, unknown>) =>
          conditional_trigger === 'No',
        components: [
          {
            component: 'TextInput',
            name: 'bar',
            rules: { required: true },
          },
        ],
      },
    ];
    const data = {
      conditional_trigger: 'No',
      bar: 'asd',
      foo: 'asd',
    };
    expect(JSON.stringify(filterStepsOnCondition(steps, data))).toEqual(
      JSON.stringify([
        {
          id: 'step-a',
          title: 'Step A',
          components: [
            {
              component: 'Radios',
              name: 'conditional_trigger',
              label: 'Show next step?',
              rules: { required: true },
            },
          ],
        },
        {
          id: 'step-c',
          title: 'Step C',
          conditionalRender: ({
            conditional_trigger,
          }: Record<string, unknown>) => conditional_trigger === 'No',
          components: [
            {
              component: 'TextInput',
              name: 'bar',
              rules: { required: true },
            },
          ],
        },
      ])
    );
  });

  describe('filterDataOnCondition', () => {
    const steps = [
      {
        id: 'step-a',
        title: 'Step A',
        components: [
          {
            component: 'Radios',
            name: 'conditional_trigger',
            label: 'Show next step?',
            rules: { required: true },
          },
        ],
      },
      {
        id: 'step-b',
        title: 'Step B',
        conditionalRender: ({ conditional_trigger }: Record<string, unknown>) =>
          conditional_trigger === 'Yes',
        components: [
          {
            component: 'TextInput',
            name: 'foo',
            rules: { required: true },
          },
        ],
      },
      {
        id: 'step-c',
        title: 'Step C',
        components: [
          {
            component: 'TextInput',
            name: 'bar',
            rules: { required: true },
          },
        ],
      },
      {
        id: 'multi_step',
        title: 'Multi step',
        isMulti: true,
        components: [
          {
            component: 'TextInput',
            name: 'title',
            rules: { required: true },
          },
        ],
      },
    ];
    const data = {
      conditional_trigger: 'No',
      bar: 'asd',
      foo: 'asd',
      multi_step: [
        {
          title: '1',
        },
        {
          title: '2',
        },
      ],
    };
    expect(filterDataOnCondition(steps, data)).toEqual({
      conditional_trigger: 'No',
      bar: 'asd',
      multi_step: [
        {
          title: '1',
        },
        {
          title: '2',
        },
      ],
    });
  });

  describe('haveStepsChanged', () => {
    const steps = [
      {
        id: 'step-a',
        title: 'Step A',
        components: [
          {
            component: 'Radios',
            name: 'conditional_trigger',
            label: 'Show next step?',
            rules: { required: true },
          },
        ],
      },
      {
        id: 'step-b',
        title: 'Step B',
        conditionalRender: ({ conditional_trigger }: Record<string, unknown>) =>
          conditional_trigger === 'Yes',
        components: [
          {
            component: 'TextInput',
            name: 'foo',
            rules: { required: true },
          },
        ],
      },
      {
        id: 'step-c',
        title: 'Step C',
        conditionalRender: ({ conditional_trigger }: Record<string, unknown>) =>
          conditional_trigger === 'No',
        components: [
          {
            component: 'TextInput',
            name: 'bar',
            rules: { required: true },
          },
        ],
      },
    ];
    const beforeData = {
      conditional_trigger: 'No',
      bar: 'asd',
      foo: 'asd',
    };
    expect(
      haveStepsChanged(steps, beforeData, {
        conditional_trigger: 'Yes',
        bar: 'asd',
        foo: 'asd',
      })
    ).toEqual(true);
    expect(
      haveStepsChanged(steps, beforeData, {
        conditional_trigger: 'No',
        bar: 'qwe',
        foo: 'asd',
      })
    ).toEqual(false);
  });
});
