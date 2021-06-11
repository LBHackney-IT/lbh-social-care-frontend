# Social Care Tools for Hackney

> A web front end and API for managing social care services at the London Borough of Hackney

This service allows social care practitioners to:

- Create and manage residents
- Create and manage cases and case notes against residents
- Create and manage workers and their resident assignments

It is a part of the broader social care system, which is documented in the [Social Care System Architecture](https://github.com/LBHackney-IT/social-care-architecture/tree/main).

## Getting Started

This app has the following requirements:

- Node.js >v14 (run `$ nvm use` to install it – [see `nvm` docs](https://github.com/nvm-sh/nvm))
- Yarn v1.x ([see installation instructions](https://classic.yarnpkg.com/en/docs/install))

To get the app running locally:

1.  Clone this repository and `cd` into it

2.  Install the dependencies

        yarn

3.  Make a copy of `.env.sample` called `.env.local` and complete as per the comments in the file.

4.  Make a copy of `cypress.env.json.sample` called `cypress.env.json` and complete as per the comments in the file.

    > ⚠️ Note! Remember to remove the commented lines from the file, as they are not valid JSON!

5.  The Hackney authentication service requires the application to run on a `hackney.gov.uk` subdomain. To be able to access the application, add the following to your `/etc/hosts` file:

        # Hackney Social Care Frontend
        127.0.0.1       dev.hackney.gov.uk

### Run the tests

1.  Once you're set up, verify the app is working by running the unit test suites:

        yarn test

2.  You can then run the end to end Cypress tests with:

        yarn e2e

    > Note! It's possible Cypress will fail the first time you try to run it, with an error similar to `Cypress verification time out`. If this happens, just run the command again, and it should start working!

### Launch the local development server

1.  If all the tests pass, you should be able to safely launch the application server by running:

        yarn dev

2.  Open [http://dev.hackney.gov.uk:3000](http://dev.hackney.gov.uk:3000) with your browser to see the result.

## Design and UI

The application makes use the [Hackney Design System](https://design-system.hackney.gov.uk/).

## Next.js

The application is built using Next.js. To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
