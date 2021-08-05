#!/usr/bin/env node
const fetch = require('cross-fetch');

const fetchPullRequestTitle = (prUrl) => {
  const { CIRCLE_PROJECT_USERNAME, CIRCLE_PROJECT_REPONAME, GITHUB_TOKEN } =
    process.env;

  const prNumber = prUrl.split('/').reverse()[0];

  return fetch(
    `https://api.github.com/repos/${CIRCLE_PROJECT_USERNAME}/${CIRCLE_PROJECT_REPONAME}/pulls/${prNumber}`,
    {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    }
  )
    .then((res) => {
      if (!res.ok) {
        throw new Error(res.statusText);
      }

      return res.json();
    })
    .then(({ title }) => title);
};

const validatePrTitle = async ({
  pullRequestUrl,
  projectUsername,
  projectRepoName,
  gitHubToken,
}) => {
  if (!pullRequestUrl || !projectUsername || !projectRepoName || !gitHubToken) {
    throw new Error('Please provide the required config');
  }

  const title = await fetchPullRequestTitle(pullRequestUrl);

  console.log(`Verifying PR title: "${title}"`);

  const regex =
    /^(build|chore|ci|docs|feat|fix|perf|refactor|revert|test)\(?(.*?)\)?: (.*?)$/g;

  const result = regex.exec(title);

  if (!result) {
    throw new Error(
      `The PR type provided is not valid, must be one of ${[
        'build',
        'chore',
        'ci',
        'docs',
        'feat',
        'fix',
        'perf',
        'refactor',
        'revert',
        'test',
      ].join(', ')}`
    );
  }

  // eslint-disable-next-line no-unused-vars
  const [_, __, ___, description] = result;

  if (!description) {
    throw new Error('No description provided');
  }
};

if (require.main === module) {
  const {
    CIRCLE_PROJECT_USERNAME,
    CIRCLE_PROJECT_REPONAME,
    GITHUB_TOKEN,
    CIRCLE_PULL_REQUEST,
  } = process.env;

  validatePrTitle({
    gitHubToken: GITHUB_TOKEN,
    pullRequestUrl: CIRCLE_PULL_REQUEST,
    projectRepoName: CIRCLE_PROJECT_REPONAME,
    projectUsername: CIRCLE_PROJECT_USERNAME,
  })
    .then(() => {
      console.log('Done!');
      process.exit();
    })
    .catch((e) => {
      console.error('Failed to parse PR title.', e.message);
      process.exit(1);
    });
}

module.exports = {
  validatePrTitle,
};
