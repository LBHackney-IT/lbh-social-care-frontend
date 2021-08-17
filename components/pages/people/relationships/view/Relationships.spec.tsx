import { fireEvent, render, within } from '@testing-library/react';
import Relationships from './Relationships';
import * as relationshipsAPI from 'utils/api/relationships';
import { mockedAPIservererror } from 'factories/APIerrors';

import {
  mockedRelationshipFactory,
  mockedRelationshipData,
  mockedExistingRelationship,
} from 'factories/relationships';
import { mockedResident } from 'factories/residents';

jest.mock('next/router', () => ({
  useRouter: () => ({
    asPath: 'path',
    push: jest.fn(),
  }),
  reload: jest.fn(),
}));

jest.mock('components/Spinner/Spinner', () => () => 'MockedSpinner');

const person = mockedResident;

describe('Relationships component', () => {
  it('displays the relationships of a person', async () => {
    jest.spyOn(relationshipsAPI, 'useRelationships').mockImplementation(() => ({
      data: mockedRelationshipFactory.build({
        personId: person.id,
        personalRelationships: [
          mockedRelationshipData.build({
            type: 'parent',
            relationships: [
              mockedExistingRelationship.build({
                firstName: 'Giovanni',
                lastName: 'Muciaccia',
              }),
            ],
          }),
          mockedRelationshipData.build({
            type: 'child',
            relationships: [
              mockedExistingRelationship.build({
                firstName: 'Giuseppe',
                lastName: 'Geppetto',
              }),
            ],
          }),
          mockedRelationshipData.build({
            type: 'unbornSibling',
            relationships: [
              mockedExistingRelationship.build({
                firstName: 'Jambi',
                lastName: 'Neverborn',
              }),
            ],
          }),
          mockedRelationshipData.build({
            type: 'siblingOfUnbornChild',
            relationships: [
              mockedExistingRelationship.build({
                firstName: 'Cento',
                lastName: 'Neverborn',
              }),
            ],
          }),
        ],
      }),
      isValidating: false,
      mutate: jest.fn(),
      revalidate: jest.fn(),
    }));

    const { getByText } = render(<Relationships person={person} />);

    const parentsRow = getByText('Parent(s)').closest('tr');
    const childrenRow = getByText('Children').closest('tr');
    const unbornSiblingsRow = getByText('Unborn sibling(s)').closest('tr');
    const siblingsRow = getByText('Sibling(s)').closest('tr');

    expect(
      within(parentsRow as HTMLElement).queryByText('Giovanni Muciaccia')
    ).toBeInTheDocument();
    expect(
      within(childrenRow as HTMLElement).queryByText('Giuseppe Geppetto')
    ).toBeInTheDocument();
    expect(
      within(unbornSiblingsRow as HTMLElement).queryByText('Jambi Neverborn')
    ).toBeInTheDocument();
    expect(
      within(siblingsRow as HTMLElement).queryByText('Cento Neverborn')
    ).toBeInTheDocument();
  });

  it('displays "No relationships found for this person" if no relationships', async () => {
    jest.spyOn(relationshipsAPI, 'useRelationships').mockImplementation(() => ({
      data: mockedRelationshipFactory.build({
        personId: person.id,
        personalRelationships: [],
      }),
      isValidating: false,
      mutate: jest.fn(),
      revalidate: jest.fn(),
    }));

    const { queryByText } = render(<Relationships person={person} />);

    expect(
      queryByText('No relationships found for this person')
    ).toBeInTheDocument();
  });

  it('displays an error if API error', async () => {
    jest.spyOn(relationshipsAPI, 'useRelationships').mockImplementation(() => ({
      data: undefined,
      error: mockedAPIservererror,
      revalidate: jest.fn(),
      mutate: jest.fn(),
      isValidating: false,
    }));

    const { queryByText } = render(<Relationships person={person} />);

    expect(
      queryByText(
        /There was a problem with getting current personal relationships./
      )
    ).toBeInTheDocument();
  });

  it('converts relationship type to readable format', async () => {
    jest.spyOn(relationshipsAPI, 'useRelationships').mockImplementation(() => ({
      data: {
        personId: person.id,
        personalRelationships: [
          mockedRelationshipData.build({
            type: 'parent',
            relationships: [mockedExistingRelationship.build()],
          }),
          mockedRelationshipData.build({
            type: 'child',
            relationships: [mockedExistingRelationship.build()],
          }),
        ],
      },
      isValidating: false,
      mutate: jest.fn(),
      revalidate: jest.fn(),
    }));

    const { queryByText } = render(<Relationships person={person} />);

    expect(queryByText('Parent(s)')).toBeInTheDocument();
    expect(queryByText('Children')).toBeInTheDocument();
  });

  it('displays related people in alphabetical order (by surname/name)', async () => {
    jest.spyOn(relationshipsAPI, 'useRelationships').mockImplementation(() => ({
      data: {
        personId: person.id,
        personalRelationships: [
          mockedRelationshipData.build({
            type: 'parent',
            relationships: [
              mockedExistingRelationship.build({
                firstName: 'Neil',
                lastName: 'Muciaccia',
              }),
              mockedExistingRelationship.build({
                firstName: 'Giovanni',
                lastName: 'Muciaccia',
              }),
              mockedExistingRelationship.build({
                personId: 123,
                firstName: 'Francesco',
                lastName: 'Rostrini',
              }),
              mockedExistingRelationship.build({
                personId: 123,
                firstName: 'Michele',
                lastName: 'Giuppone',
              }),
            ],
          }),
        ],
      },
      isValidating: false,
      mutate: jest.fn(),
      revalidate: jest.fn(),
    }));

    const { queryByTestId } = render(<Relationships person={person} />);

    const first = queryByTestId('related-person-name-0');
    const second = queryByTestId('related-person-name-1');
    const third = queryByTestId('related-person-name-2');
    const fourth = queryByTestId('related-person-name-3');

    expect(first).toHaveTextContent('Michele Giuppone');
    expect(second).toHaveTextContent('Giovanni Muciaccia');
    expect(third).toHaveTextContent('Neil Muciaccia');
    expect(fourth).toHaveTextContent('Francesco Rostrini');
  });

  it('displays the gender of the related people', async () => {
    jest.spyOn(relationshipsAPI, 'useRelationships').mockImplementation(() => ({
      data: mockedRelationshipFactory.build({
        personId: person.id,
        personalRelationships: [
          mockedRelationshipData.build({
            relationships: [
              mockedExistingRelationship.build({ gender: 'M' }),
              mockedExistingRelationship.build({ gender: 'F' }),
              mockedExistingRelationship.build({ gender: 'I' }),
              mockedExistingRelationship.build({ gender: 'U' }),
            ],
          }),
        ],
      }),
      isValidating: false,
      mutate: jest.fn(),
      revalidate: jest.fn(),
    }));

    const { queryByTestId } = render(<Relationships person={person} />);

    const first = queryByTestId('related-person-gender-0');
    const second = queryByTestId('related-person-gender-1');
    const third = queryByTestId('related-person-gender-2');
    const fourth = queryByTestId('related-person-gender-3');

    expect(first).toHaveTextContent('Male');
    expect(second).toHaveTextContent('Female');
    expect(third).toHaveTextContent('Indeterminate');
    expect(fourth).toHaveTextContent('Unknown');
  });

  it('displays if related person is a main carer', async () => {
    jest.spyOn(relationshipsAPI, 'useRelationships').mockImplementation(() => ({
      data: mockedRelationshipFactory.build({
        personId: person.id,
        personalRelationships: [
          mockedRelationshipData.build({
            relationships: [
              mockedExistingRelationship.build({ isMainCarer: 'Y' }),
              mockedExistingRelationship.build({ isMainCarer: 'N' }),
              mockedExistingRelationship.build({ isMainCarer: undefined }),
            ],
          }),
        ],
      }),
      isValidating: false,
      mutate: jest.fn(),
      revalidate: jest.fn(),
    }));

    const { queryByTestId } = render(<Relationships person={person} />);

    const first = queryByTestId('related-person-additional-options-0');
    const second = queryByTestId('related-person-additional-options-1');
    const third = queryByTestId('related-person-additional-options-2');

    expect(first).toHaveTextContent('Main carer');
    expect(second).not.toHaveTextContent('Main carer');
    expect(third).not.toHaveTextContent('Main carer');
  });

  it('displays the context of the relationship', async () => {
    jest.spyOn(relationshipsAPI, 'useRelationships').mockImplementation(() => ({
      data: mockedRelationshipFactory.build({
        personId: person.id,
        personalRelationships: [
          mockedRelationshipData.build({
            relationships: [
              mockedExistingRelationship.build({
                details: 'Emergency contact',
              }),
              mockedExistingRelationship.build({ details: undefined }),
            ],
          }),
        ],
      }),
      isValidating: false,
      mutate: jest.fn(),
      revalidate: jest.fn(),
    }));

    const { queryByTestId } = render(<Relationships person={person} />);

    expect(queryByTestId('related-person-details-0')).toHaveTextContent(
      'Emergency contact'
    );
  });

  describe('when there are relationships with parent of unborn child', () => {
    it('displays under "Parent(s)" if it is the only existing relationship', async () => {
      jest
        .spyOn(relationshipsAPI, 'useRelationships')
        .mockImplementation(() => ({
          data: mockedRelationshipFactory.build({
            personId: person.id,
            personalRelationships: [
              mockedRelationshipData.build({
                type: 'parentOfUnbornChild',
                relationships: [mockedExistingRelationship.build()],
              }),
            ],
          }),
          isValidating: false,
          mutate: jest.fn(),
          revalidate: jest.fn(),
        }));

      const { queryByTestId } = render(<Relationships person={person} />);

      expect(queryByTestId('parent')).toHaveTextContent('Parent(s)');
    });

    it('displays "Parent(s)" if there is an existing parent relationship', async () => {
      jest
        .spyOn(relationshipsAPI, 'useRelationships')
        .mockImplementation(() => ({
          data: mockedRelationshipFactory.build({
            personId: person.id,
            personalRelationships: [
              mockedRelationshipData.build({
                type: 'parentOfUnbornChild',
                relationships: [
                  mockedExistingRelationship.build({
                    firstName: 'Foo',
                    lastName: 'Bar',
                  }),
                ],
              }),
              mockedRelationshipData.build({
                type: 'parent',
                relationships: [
                  mockedExistingRelationship.build({
                    firstName: 'Fizz',
                    lastName: 'Buzz',
                  }),
                ],
              }),
            ],
          }),
          isValidating: false,
          mutate: jest.fn(),
          revalidate: jest.fn(),
        }));

      const { queryByTestId } = render(<Relationships person={person} />);

      const first = queryByTestId('related-person-name-0');
      const second = queryByTestId('related-person-name-1');

      expect(queryByTestId('parent')).toHaveTextContent('Parent(s)');
      expect(first).toHaveTextContent('Foo Bar');
      expect(second).toHaveTextContent('Fizz Buzz');
    });
  });

  describe('when there are relationships with sibling of unborn child', () => {
    it('displays under "Sibling(s)" if it is the only existing relationship', async () => {
      jest
        .spyOn(relationshipsAPI, 'useRelationships')
        .mockImplementation(() => ({
          data: mockedRelationshipFactory.build({
            personId: person.id,
            personalRelationships: [
              mockedRelationshipData.build({
                type: 'siblingOfUnbornChild',
                relationships: [mockedExistingRelationship.build()],
              }),
            ],
          }),
          isValidating: false,
          mutate: jest.fn(),
          revalidate: jest.fn(),
        }));

      const { queryByTestId } = render(<Relationships person={person} />);

      expect(queryByTestId('sibling')).toHaveTextContent('Sibling(s)');
    });

    it('displays "Sibling(s)" if there is an existing sibling relationship', async () => {
      jest
        .spyOn(relationshipsAPI, 'useRelationships')
        .mockImplementation(() => ({
          data: mockedRelationshipFactory.build({
            personId: person.id,
            personalRelationships: [
              mockedRelationshipData.build({
                type: 'siblingOfUnbornChild',
                relationships: [
                  mockedExistingRelationship.build({
                    firstName: 'Foo',
                    lastName: 'Bar',
                  }),
                ],
              }),
              mockedRelationshipData.build({
                type: 'sibling',
                relationships: [
                  mockedExistingRelationship.build({
                    firstName: 'Fizz',
                    lastName: 'Buzz',
                  }),
                ],
              }),
            ],
          }),
          isValidating: false,
          mutate: jest.fn(),
          revalidate: jest.fn(),
        }));

      const { queryByTestId } = render(<Relationships person={person} />);

      const first = queryByTestId('related-person-name-0');
      const second = queryByTestId('related-person-name-1');

      expect(queryByTestId('sibling')).toHaveTextContent('Sibling(s)');
      expect(first).toHaveTextContent('Foo Bar');
      expect(second).toHaveTextContent('Fizz Buzz');
    });
  });

  it('displays the "Add a new relationship" button', async () => {
    const { queryByText } = render(<Relationships person={person} />);

    expect(queryByText('Add a new relationship')).toBeInTheDocument();
  });

  it('displays a link for the related person', async () => {
    jest.spyOn(relationshipsAPI, 'useRelationships').mockImplementation(() => ({
      data: mockedRelationshipFactory.build({
        personId: person.id,
        personalRelationships: [
          mockedRelationshipData.build({
            relationships: [
              mockedExistingRelationship.build({
                personId: 987654321,
                firstName: 'Foo',
                lastName: 'Bar',
              }),
            ],
          }),
        ],
      }),
      isValidating: false,
      mutate: jest.fn(),
      revalidate: jest.fn(),
    }));

    const { queryByText } = render(<Relationships person={person} />);

    expect(queryByText('Foo Bar')?.closest('a')).toHaveAttribute(
      'href',
      '/people/987654321'
    );
  });

  describe('Remove a relationship', () => {
    beforeEach(() => {
      jest
        .spyOn(relationshipsAPI, 'useRelationships')
        .mockImplementation(() => ({
          data: mockedRelationshipFactory.build({
            personId: person.id,
            personalRelationships: [
              mockedRelationshipData.build({
                relationships: [mockedExistingRelationship.build()],
              }),
            ],
          }),
          isValidating: false,
          mutate: jest.fn(),
          revalidate: jest.fn(),
        }));
    });

    it('displays "Remove" when active', async () => {
      const { queryByText } = render(<Relationships person={person} />);

      expect(queryByText(/Remove/)).toBeInTheDocument();
    });

    it('displays dialog when "Remove" is clicked', async () => {
      jest
        .spyOn(relationshipsAPI, 'useRelationships')
        .mockImplementation(() => ({
          data: mockedRelationshipFactory.build({
            personId: person.id,
            personalRelationships: [
              mockedRelationshipData.build({
                relationships: [
                  mockedExistingRelationship.build({
                    firstName: 'Foo',
                    lastName: 'Bar',
                  }),
                ],
              }),
            ],
          }),
          isValidating: false,
          mutate: jest.fn(),
          revalidate: jest.fn(),
        }));

      const { getByText, queryByText } = render(
        <Relationships person={person} />
      );

      fireEvent.click(getByText(/Remove/));

      expect(
        queryByText(/You are about to remove Foo Bar/)
      ).toBeInTheDocument();
    });

    it('hides dialog when cross is clicked', async () => {
      const { getByText, queryByText } = render(
        <Relationships person={person} />
      );

      fireEvent.click(getByText(/Remove/));
      fireEvent.click(getByText(/Close/));

      expect(
        queryByText(/You are about to remove Foo Bar/)
      ).not.toBeInTheDocument();
    });

    it('calls removeRelationship with ID of relationship when remove confirmed', async () => {
      const existingRelationship = mockedExistingRelationship.build();

      jest
        .spyOn(relationshipsAPI, 'useRelationships')
        .mockImplementation(() => ({
          data: mockedRelationshipFactory.build({
            personId: person.id,
            personalRelationships: [
              mockedRelationshipData.build({
                relationships: [existingRelationship],
              }),
            ],
          }),
          isValidating: false,
          mutate: jest.fn(),
          revalidate: jest.fn(),
        }));
      jest.spyOn(relationshipsAPI, 'removeRelationship');

      const { getByText } = render(<Relationships person={person} />);

      fireEvent.click(getByText(/Remove/));
      fireEvent.click(getByText(/Yes/));

      expect(relationshipsAPI.removeRelationship).toHaveBeenCalledWith(
        existingRelationship.id.toString()
      );
    });

    it('hides dialog after confirming relationship removal', async () => {
      jest
        .spyOn(relationshipsAPI, 'removeRelationship')
        .mockImplementation(jest.fn());

      const { getByText, queryByText } = render(
        <Relationships person={person} />
      );

      fireEvent.click(getByText(/Remove/));
      fireEvent.click(getByText(/Yes/));

      expect(
        queryByText(/You are about to remove Foo Bar/)
      ).not.toBeInTheDocument();
    });
  });
});
