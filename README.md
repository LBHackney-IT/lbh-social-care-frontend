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

To do list:

- [x] Deploy a preview env with a single-level subdomain
  - [x] Create additional CircleCI jobs
- [x] Create single deployment bucket for all preview environments
  - [x] Initial Terraform setup
  - [x] CircleCI jobs
- [ ] Deploy a preview env with a double-level subdomain (e.g. `pr-100.social-care-service-preview.hackney.gov.uk`)
  - [ ] Create a Route53 hosted zone for `social-care-service-preview.hackney.gov.uk`
  - [ ] Create an SSL certificate in ACM for `*.social-care-service-preview.hackney.gov.uk`
  - [ ] PR a new nameserver entry [here](https://github.com/LBHackney-IT/infrastructure/blob/master/platform/public-dns/terraform/zones/uk-gov-hackney/24-ns-records.tf) to delegate control of that subdomain to our Staging AWS account
  - [ ] Create a record for the subdomain to the relevant Cloudfront distribution
- [ ] Call the GitHub APIs to create a "deployment" against the PR
  - [ ] Get GitHub API keys
  - [ ] Write a script to call the appropriate APIs to set the deployment up
- [ ] Create a cron task in CircleCI to do a nightly tear down of preview environments
  - [ ] Create additional CircleCI jobs
  - [ ] Find all deployments via a tag (or similar)
  - [ ] Call `sls remove` or delete the CloudFormation stack for each deployment

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/zeit/next.js/) - your feedback and contributions are welcome!
