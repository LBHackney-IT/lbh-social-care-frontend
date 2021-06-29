import fetch from 'cross-fetch';
import { deleteDraftGitHubReleases } from './delete-draft-github-releases';

jest.mock('cross-fetch');

describe('#deleteDraftGitHubReleases()', () => {
  beforeEach(() => {
    delete global.process.env.GITHUB_TOKEN;

    jest.resetAllMocks();
  });

  it('should exit the process if no GITHUB_TOKEN environment variable is provided', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: () => [],
    });
    global.process.exit = jest.fn();

    await deleteDraftGitHubReleases();

    expect(global.process.exit).toHaveBeenCalled();
  });

  it('should exit if the GitHub GET releases call fails', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      statusText: 'Some error',
      json: () => [],
    });
    global.process.exit = jest.fn();
    global.process.env.GITHUB_TOKEN = 'GITHUB_TOKEN';

    await deleteDraftGitHubReleases();

    expect(global.process.exit).toHaveBeenCalled();
  });

  it('should call the DELETE releases GitHub API for each draft release found', async () => {
    fetch.mockResolvedValue({
      ok: true,
      json: () => [
        {
          id: 123,
          draft: true,
        },
        {
          id: 456,
          draft: true,
        },
        {
          id: 789,
          draft: true,
        },
      ],
    });
    global.process.env.GITHUB_TOKEN = 'GITHUB_TOKEN';

    await deleteDraftGitHubReleases();

    expect(fetch).toHaveBeenCalledTimes(4); // 1 (GET) + 3 (DELETE)
  });
});
