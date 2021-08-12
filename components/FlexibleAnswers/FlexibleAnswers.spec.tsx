import { render, screen } from '@testing-library/react';
import FlexibleAnswers from './FlexibleAnswers';
import { getByTextIgnoringTags } from '../../test/helpers';

describe(`ExpandDetails`, () => {
  it('renders basic answers correctly', async () => {
    render(
      <FlexibleAnswers
        answers={{
          bar: { 'example question': 'red' },
          foo: {
            date: 'example answer 1',
            name: 'example answer 2',
            'repeater-example': ['test 1', 'test 2'],
          },
        }}
      />
    );

    const headings = await screen.findAllByRole('heading');
    expect(headings.length).toBe(2);

    const buttons = await screen.findAllByRole('button');
    expect(buttons.length).toBe(2);

    expect(await screen.findByText('bar')).toBeVisible();
    expect(await screen.findByText('example question')).toBeVisible();
    expect(await screen.findByText('red')).toBeVisible();

    expect(await screen.findByText('foo')).toBeVisible();
    expect(await screen.findByText('example answer 1')).toBeVisible();
    expect(await screen.findByText('example answer 2')).toBeVisible();
    expect(await screen.findByText('test 1')).toBeVisible();
    expect(await screen.findByText('test 2')).toBeVisible();
  });

  it('renders repeater groups correctly', async () => {
    render(
      <FlexibleAnswers
        answers={{
          foo: {
            'Key contacts': [
              {
                su: 'choice-one',
                bar: ['choice-two'],
                blah: '2021-05-21',
                foo: ['blah', 'blaah'],
              },
            ],
          },
        }}
      />
    );
    expect(await screen.findByText('Key contacts')).toBeVisible();
    expect(getByTextIgnoringTags('su: choice-one')).toBeVisible();
    expect(getByTextIgnoringTags('bar: choice-two')).toBeVisible();
    expect(getByTextIgnoringTags('blah: 2021-05-21')).toBeVisible();
    expect(getByTextIgnoringTags('foo: blah, blaah')).toBeVisible();
  });

  it('renders expandable sections only if there is more than one step', async () => {
    render(
      <FlexibleAnswers
        answers={{
          foo: {
            'Key contacts': 'blah',
          },
        }}
      />
    );
    expect(screen.queryByText('foo')).toBeNull();
    expect(screen.queryByRole('button')).toBeNull();
  });
});
