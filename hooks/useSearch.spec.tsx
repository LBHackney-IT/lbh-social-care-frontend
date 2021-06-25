import { render, screen } from '@testing-library/react';
import useSearch from './useSearch';

const documents = [
  {
    id: 'foo',
    name: 'namey mcname',
  },
  {
    id: 'bar',
    name: 'firstname surname',
  },
];

const MockComponent = ({ query }: { query: string }): React.ReactElement => {
  const results = useSearch(query, documents, ['id', 'name']);
  return <>{JSON.stringify(results)}</>;
};

describe('useSearch', () => {
  it('returns matching results', () => {
    render(<MockComponent query={'foo'} />);
    expect(
      screen.getByText(
        JSON.stringify({
          id: 'foo',
          name: 'namey mcname',
        }),
        { exact: false }
      )
    );
  });

  it('returns matching results', () => {
    render(<MockComponent query={'f'} />);
    expect(screen.getByText(JSON.stringify(documents), { exact: false }));
  });
});
