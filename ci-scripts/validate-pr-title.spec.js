import fetch from 'cross-fetch';
import { validatePrTitle } from './validate-pr-title';

jest.mock('cross-fetch');

const currentLog = console.log;
console.log = jest.fn();

afterAll(() => {
  console.log = currentLog;
});

const defaultConfig = {
  gitHubToken: 'github-token',
  pullRequestUrl: 'pull-request',
  projectRepoName: 'project-reponame',
  projectUsername: 'project-username',
};

describe('#validatePrTitle()', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should throw an error if the projectUsername config value is not provided', async () => {
    await expect(
      validatePrTitle({
        ...defaultConfig,
        projectUsername: undefined,
      })
    ).rejects.toThrow('Please provide the required config');
  });

  it('should throw an error if the projectRepoName config value is not provided', async () => {
    await expect(
      validatePrTitle({
        ...defaultConfig,
        projectRepoName: undefined,
      })
    ).rejects.toThrow('Please provide the required config');
  });

  it('should throw an error if the pullRequestUrl config value is not provided', async () => {
    await expect(
      validatePrTitle({
        ...defaultConfig,
        pullRequestUrl: undefined,
      })
    ).rejects.toThrow('Please provide the required config');
  });

  it('should throw an error if the gitHubToken config value is not provided', async () => {
    await expect(
      validatePrTitle({
        ...defaultConfig,
        gitHubToken: undefined,
      })
    ).rejects.toThrow('Please provide the required config');
  });

  it('should throw an error if the HTTP request to GitHub fails', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      statusText: 'Some error',
      json: () => {},
    });

    await expect(validatePrTitle(defaultConfig)).rejects.toThrow(/Some error/);
  });

  it('should throw an error if an invalid type is provided in the PR title', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: () => ({
        title: 'not a valid title',
      }),
    });

    await expect(validatePrTitle(defaultConfig)).rejects.toThrow(
      /The PR type provided is not valid/
    );
  });

  it('should throw an error if no description is provided in the PR title', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: () => ({
        title: 'fix(ABC-123): ',
      }),
    });

    await expect(validatePrTitle(defaultConfig)).rejects.toThrow(
      'No description provided'
    );
  });

  it('should resolve, returning nothing, if a valid PR title is provided', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: () => ({
        title: 'fix(ABC-123): some description',
      }),
    });

    await expect(validatePrTitle(defaultConfig)).resolves.toBeUndefined();
  });
});
