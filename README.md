# Social Care Tools for Hackney

> A web front end for managing social care services at the London Borough of Hackney

This service allows social care practitioners to:

- Create and manage residents
- Create and manage cases and case notes against residents
- Create and manage workers and their resident assignments

It is a part of the broader social care system, which is documented in the [Social Care System Architecture](https://github.com/LBHackney-IT/social-care-architecture/tree/main).

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

## Testing

## Design and UI

The application makes use the [Hackney Design System](https://design-system.hackney.gov.uk/).

## Next.js

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/zeit/next.js/) - your feedback and contributions are welcome!
