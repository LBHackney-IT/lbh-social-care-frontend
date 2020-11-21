import { createSteps, getNextStepPath } from './FormWizard';

import Summary from 'components/Steps/Summary';
import Confirmation from 'components/Steps/Confirmation';

const FakeComponentStep = () => <div>foo</div>;

describe('FormWizard', () => {
  const steps = [
    { id: 'first-step', title: 'First Step', component: FakeComponentStep },
    { id: 'second-step', title: 'Second Step', components: ['foo', 'bar'] },
    { id: 'third-step', title: 'Third Step', components: ['foobar'] },
  ];

  describe('createSteps', () => {
    it('should initialise properly', () => {
      expect(createSteps(steps)).toEqual([
        { id: 'first-step', title: 'First Step', component: FakeComponentStep },
        { id: 'second-step', title: 'Second Step', components: ['foo', 'bar'] },
        { id: 'third-step', title: 'Third Step', components: ['foobar'] },
        { id: 'summary', title: 'Summary', component: Summary },
        { id: 'confirmation', title: 'Confirmation', component: Confirmation },
      ]);
    });
  });

  describe('getNextStepPath', () => {
    it('should return the correct step', () => {
      expect(getNextStepPath(1, steps, '/form/')).toEqual('/form/third-step');
    });
  });
});
