import { fireEvent, render, waitFor } from '@testing-library/react';
import Relationships from './Relationships';
import {
  FeatureFlagProvider,
  FeatureSet,
} from 'lib/feature-flags/feature-flags';

import * as relationshipsAPI from 'utils/api/relationships';

import {
  mockedRelationshipFactory,
  mockedRelationshipData,
  mockedExistingRelationship,
  mockedRelationship,
  mockedRelationshipPartialData,
  mockedRelationshipNoData,
  mockRelationshipEmptyData,
  mockedParentRelationship,
  mockedUnbornSiblingRelationship,
  mockedOrderedRelationship,
} from 'factories/relationships';
import { mockedResident } from 'factories/residents';

jest.mock('next/router', () => ({
  useRouter: () => ({
    asPath: 'path',
    push: jest.fn(),
  }),
}));

jest.mock('components/Spinner/Spinner', () => () => 'MockedSpinner');

const person = mockedResident;

describe('Relationships component', () => {
  it('should display properly', () => {
    const { getByText } = render(
      <FeatureFlagProvider features={{}}>
        <Relationships person={person} />
      </FeatureFlagProvider>
    );

    expect(getByText('MockedSpinner')).toBeInTheDocument();
  });

  it('should populate the list', async () => {
    jest.spyOn(relationshipsAPI, 'useRelationships').mockImplementation(() => ({
      data: mockedRelationship,
      isValidating: false,
      mutate: jest.fn(),
      revalidate: jest.fn(),
    }));

    const { queryByText } = render(
      <FeatureFlagProvider features={{}}>
        <Relationships person={person} />
      </FeatureFlagProvider>
    );

    expect(queryByText('Parent(s)')).toBeInTheDocument();
    expect(queryByText('Children')).toBeInTheDocument();
    expect(queryByText('Other')).toBeInTheDocument();
    expect(queryByText('Sibling(s)')).toBeInTheDocument();
    expect(queryByText('Unborn sibling(s)')).toBeInTheDocument();

    expect(queryByText('Giovanni Muciaccia')).toBeInTheDocument();
    expect(queryByText('Jambi Neverborn')).toBeInTheDocument();
  });

  it('should populate partially the list', async () => {
    jest.spyOn(relationshipsAPI, 'useRelationships').mockImplementation(() => ({
      data: mockedRelationshipPartialData,
      isValidating: false,
      mutate: jest.fn(),
      revalidate: jest.fn(),
    }));

    const { getByText, queryByText } = render(
      <FeatureFlagProvider features={{}}>
        <Relationships person={person} />
      </FeatureFlagProvider>
    );

    expect(queryByText('Parent(s)')).toBeInTheDocument();
    expect(queryByText('Children')).toBeInTheDocument();
    expect(queryByText('Other')).not.toBeInTheDocument();
    expect(queryByText('Sibling(s)')).not.toBeInTheDocument();

    expect(getByText('Mastro Geppetto')).toBeInTheDocument();
    expect(getByText('Pinocchio Geppetto')).toBeInTheDocument();
  });

  it('should render with no data', async () => {
    jest.spyOn(relationshipsAPI, 'useRelationships').mockImplementation(() => ({
      data: mockedRelationshipNoData,
      isValidating: false,
      mutate: jest.fn(),
      revalidate: jest.fn(),
    }));

    const { queryByText } = render(
      <FeatureFlagProvider features={{}}>
        <Relationships person={person} />
      </FeatureFlagProvider>
    );

    expect(queryByText('No relationship found')).toBeInTheDocument();
  });

  it('should return an error if malformed data', async () => {
    jest.spyOn(relationshipsAPI, 'useRelationships').mockImplementation(() => ({
      data: mockRelationshipEmptyData,
      isValidating: false,
      mutate: jest.fn(),
      revalidate: jest.fn(),
    }));

    const { queryByText } = render(
      <FeatureFlagProvider features={{}}>
        <Relationships person={person} />
      </FeatureFlagProvider>
    );

    expect(queryByText('No relationship found')).toBeInTheDocument();
  });

  it('should populate the list converting the type to display name', async () => {
    jest.spyOn(relationshipsAPI, 'useRelationships').mockImplementation(() => ({
      data: {
        personId: person.id,
        personalRelationships: [mockedParentRelationship],
      },
      isValidating: false,
      mutate: jest.fn(),
      revalidate: jest.fn(),
    }));

    const { queryByText } = render(
      <FeatureFlagProvider features={{}}>
        <Relationships person={person} />
      </FeatureFlagProvider>
    );

    expect(queryByText('Parent(s)')).toBeInTheDocument();
    expect(queryByText('Giovanni Muciaccia')).toBeInTheDocument();
    expect(queryByText('Neil GrandeArtista')).toBeInTheDocument();
  });

  it('should populate the list converting the type to display name', async () => {
    jest.spyOn(relationshipsAPI, 'useRelationships').mockImplementation(() => ({
      data: {
        personId: person.id,
        personalRelationships: [mockedUnbornSiblingRelationship],
      },
      isValidating: false,
      mutate: jest.fn(),
      revalidate: jest.fn(),
    }));

    const { queryByText } = render(
      <FeatureFlagProvider features={{}}>
        <Relationships person={person} />
      </FeatureFlagProvider>
    );

    expect(queryByText('Unborn sibling(s)')).toBeInTheDocument();
    expect(queryByText('Jambi Neverborn')).toBeInTheDocument();
  });

  it('should populate the list in alphabetical order (by surname/name) with same surname', async () => {
    jest.spyOn(relationshipsAPI, 'useRelationships').mockImplementation(() => ({
      data: {
        personId: person.id,
        personalRelationships: [mockedOrderedRelationship],
      },
      isValidating: false,
      mutate: jest.fn(),
      revalidate: jest.fn(),
    }));

    const { queryAllByText } = render(
      <FeatureFlagProvider features={{}}>
        <Relationships person={person} />
      </FeatureFlagProvider>
    );

    const names = queryAllByText(/Muciaccia/);

    expect(names[0]).toHaveTextContent('Giovanni Muciaccia');
    expect(names[1]).toHaveTextContent('Neil Muciaccia');
  });

  it('should populate the list in alphabetical order (by surname/name) different people', async () => {
    jest.spyOn(relationshipsAPI, 'useRelationships').mockImplementation(() => ({
      data: {
        personId: person.id,
        personalRelationships: [mockedOrderedRelationship],
      },
      isValidating: false,
      mutate: jest.fn(),
      revalidate: jest.fn(),
    }));

    const { queryByTestId } = render(
      <FeatureFlagProvider features={{}}>
        <Relationships person={person} />
      </FeatureFlagProvider>
    );

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

    const { queryByTestId } = render(
      <FeatureFlagProvider features={{}}>
        <Relationships person={person} />
      </FeatureFlagProvider>
    );

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

    const { queryByTestId } = render(
      <FeatureFlagProvider features={{}}>
        <Relationships person={person} />
      </FeatureFlagProvider>
    );

    const first = queryByTestId('related-person-additional-options-0');
    const second = queryByTestId('related-person-additional-options-1');
    const third = queryByTestId('related-person-additional-options-2');

    expect(first).toHaveTextContent('Main carer');
    expect(second).not.toHaveTextContent('Main carer');
    expect(third).not.toHaveTextContent('Main carer');
  });

  it('displays the details of the relationship', async () => {
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

    const { queryByTestId } = render(
      <FeatureFlagProvider features={{}}>
        <Relationships person={person} />
      </FeatureFlagProvider>
    );

    expect(queryByTestId('related-person-details-0')).toHaveTextContent(
      'Emergency contact'
    );
  });

  describe('when there are relationships with parent of unborn child', () => {
    it('displays under "Parent(s)" if only relationship', async () => {
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

      const { queryByTestId } = render(
        <FeatureFlagProvider features={{}}>
          <Relationships person={person} />
        </FeatureFlagProvider>
      );

      expect(queryByTestId('parent')).toHaveTextContent('Parent(s)');
    });

    it('displays "Parent(s)" if existing parent relationship', async () => {
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

      const { queryByTestId } = render(
        <FeatureFlagProvider features={{}}>
          <Relationships person={person} />
        </FeatureFlagProvider>
      );

      const first = queryByTestId('related-person-name-0');
      const second = queryByTestId('related-person-name-1');

      expect(queryByTestId('parent')).toHaveTextContent('Parent(s)');
      expect(first).toHaveTextContent('Foo Bar');
      expect(second).toHaveTextContent('Fizz Buzz');
    });
  });

  describe('when there are relationships with sibling of unborn child', () => {
    it('displays under "Sibling(s)" if only relationship', async () => {
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

      const { queryByTestId } = render(
        <FeatureFlagProvider features={{}}>
          <Relationships person={person} />
        </FeatureFlagProvider>
      );

      expect(queryByTestId('sibling')).toHaveTextContent('Sibling(s)');
    });

    it('displays "Sibling(s)" if existing parent relationship', async () => {
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

      const { queryByTestId } = render(
        <FeatureFlagProvider features={{}}>
          <Relationships person={person} />
        </FeatureFlagProvider>
      );

      const first = queryByTestId('related-person-name-0');
      const second = queryByTestId('related-person-name-1');

      expect(queryByTestId('sibling')).toHaveTextContent('Sibling(s)');
      expect(first).toHaveTextContent('Foo Bar');
      expect(second).toHaveTextContent('Fizz Buzz');
    });
  });

  it('should display the "add a new relationship" button if the feature flag is active', async () => {
    const features: FeatureSet = {
      'add-relationships': {
        isActive: true,
      },
    };

    const { queryByText } = render(
      <FeatureFlagProvider features={features}>
        <Relationships person={person} />
      </FeatureFlagProvider>
    );

    expect(queryByText('Add a new relationship')).toBeInTheDocument();
  });

  it('displays link to related person', async () => {
    const existingRelationship = mockedExistingRelationship.build({
      firstName: 'Foo',
      lastName: 'Bar',
    });
    jest.spyOn(relationshipsAPI, 'useRelationships').mockImplementation(() => ({
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

    const { queryByText } = render(
      <FeatureFlagProvider features={{}}>
        <Relationships person={person} />
      </FeatureFlagProvider>
    );

    expect(queryByText(/Foo Bar/)?.closest('a')).toHaveAttribute(
      'href',
      `/people/${existingRelationship.personId}`
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

    it('displays "Remove" if the feature flag is active', async () => {
      const features: FeatureSet = {
        'remove-relationship': {
          isActive: true,
        },
      };

      const { queryByText } = render(
        <FeatureFlagProvider features={features}>
          <Relationships person={person} />
        </FeatureFlagProvider>
      );

      expect(queryByText(/Remove/)).toBeInTheDocument();
    });

    it('does not display "Remove" if the feature flag is inactive', async () => {
      const features: FeatureSet = {
        'remove-relationship': {
          isActive: false,
        },
      };

      const { queryByText } = render(
        <FeatureFlagProvider features={features}>
          <Relationships person={person} />
        </FeatureFlagProvider>
      );

      expect(queryByText(/Remove/)).not.toBeInTheDocument();
    });

    it('displays dialog if "Remove" is clicked', async () => {
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

      const features: FeatureSet = {
        'remove-relationship': {
          isActive: true,
        },
      };

      const { getByText, queryByText } = render(
        <FeatureFlagProvider features={features}>
          <Relationships person={person} />
        </FeatureFlagProvider>
      );

      fireEvent.click(getByText(/Remove/));

      expect(
        queryByText(/You are about to remove Foo Bar/)
      ).toBeInTheDocument();
    });

    it('hides dialog if cross is clicked', async () => {
      const features: FeatureSet = {
        'remove-relationship': {
          isActive: true,
        },
      };

      const { getByText, queryByText } = render(
        <FeatureFlagProvider features={features}>
          <Relationships person={person} />
        </FeatureFlagProvider>
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

      const features: FeatureSet = {
        'remove-relationship': {
          isActive: true,
        },
      };

      const { getByText } = render(
        <FeatureFlagProvider features={features}>
          <Relationships person={person} />
        </FeatureFlagProvider>
      );

      fireEvent.click(getByText(/Remove/));
      fireEvent.click(getByText(/Yes/));

      expect(relationshipsAPI.removeRelationship).toHaveBeenCalledWith(
        existingRelationship.id.toString()
      );
    });

    it('hides dialog after remove confirmed', async () => {
      jest
        .spyOn(relationshipsAPI, 'removeRelationship')
        .mockImplementation(jest.fn());

      const features: FeatureSet = {
        'remove-relationship': {
          isActive: true,
        },
      };

      const { getByText, queryByText } = render(
        <FeatureFlagProvider features={features}>
          <Relationships person={person} />
        </FeatureFlagProvider>
      );

      await waitFor(() => {
        fireEvent.click(getByText(/Remove/));
        fireEvent.click(getByText(/Yes/));

        expect(
          queryByText(/You are about to remove Foo Bar/)
        ).not.toBeInTheDocument();
      });
    });
  });
});
