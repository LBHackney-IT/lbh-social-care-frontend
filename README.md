# lbh-social-care-frontend

The Social Care Frontend allows Social Care Practitioners to edit cases and residents information.

It is a part of the Social Care system (see [Social Care System Architecture](https://github.com/LBHackney-IT/social-care-architecture/tree/main) for more details).

It makes use of the [Hackney Design System](https://design-system.hackney.gov.uk/).

## Getting Started

The app needs Node 14, if you have [NVM](https://github.com/nvm-sh/nvm) installed just run `nvm use` in your terminal.

Install the dependencies:

    yarn install

Create your `.env` file from `.env.sample`. You will need to grab some secrets from (TBC, it's not clear at the time of writing).

So that the auth token from using Staging/Production can work with your local dev environment and you will be able to access the application, add the following to your `/etc/hosts` file...

    127.0.0.1       dev.hackney.gov.uk

Run the development server:

    yarn dev

Open [http://dev.hackney.gov.uk:3000](http://dev.hackney.gov.uk:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

## Preview environments

A preview environment is a temporary deployment of this application associated with a specific pull request (PR). Once a PR is opened up, that branch will be automatically deployed to `{pr-number}.social-care-service-preview.hackney.gov.uk`. The details of the deployment will be posted against the PR for convenience.

At 6pm UTC every evening, any current live preview environments will be terminated. Preview environments can be restarted by re-running the relevant CircleCI job (`build-deploy-preview`) or pushing new changes to the branch associated with the PR.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/zeit/next.js/) - your feedback and contributions are welcome!
