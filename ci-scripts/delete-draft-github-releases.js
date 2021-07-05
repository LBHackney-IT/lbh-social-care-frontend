const fetch = require('cross-fetch');

/**
 * Deletes all GitHub releases marked as 'draft'
 *
 * Usage: `GITHUB_TOKEN= node delete-draft-github-releases.js`
 */
const deleteDraftGitHubReleases = async () => {
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

  if (!GITHUB_TOKEN) {
    console.error('Please provide a `GITHUB_TOKEN` environment variable');
    process.exit(0);
    return;
  }

  const [error, draftReleases] = await getDraftReleases(GITHUB_TOKEN);

  if (error) {
    console.error(error.message);
    process.exit(0);
    return;
  }

  for (let release of draftReleases) {
    await deleteRelease(GITHUB_TOKEN, release.id);
  }
};

async function getDraftReleases(token) {
  const res = await fetch(
    `https://api.github.com/repos/LBHackney-IT/lbh-social-care-frontend/releases`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
  );

  if (!res.ok) {
    return [new Error(res.statusText), null];
  }

  const releases = await res.json();

  return [null, releases.filter((r) => r.draft === true)];
}

async function deleteRelease(token, releaseId) {
  return fetch(
    `https://api.github.com/repos/LBHackney-IT/lbh-social-care-frontend/releases/${releaseId}`,
    {
      method: 'delete',
      headers: {
        Accept: 'application/vnd.github.v3+json',
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
  );
}

if (require.main === module) {
  deleteDraftGitHubReleases().then(() => {
    console.log('Done!');
  });
}

module.exports = {
  deleteDraftGitHubReleases,
};
