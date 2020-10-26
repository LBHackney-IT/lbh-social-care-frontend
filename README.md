# lbh-social-care

## Getting Started

The app needs Node 12, if you have [NVM](https://github.com/nvm-sh/nvm) installed just run `nvm use` in your terminal.

Install the dependencies:

    yarn install

Create your `.env` file from `.env.sample`. You will need to grab some secrets from (TBC, it's not clear at the time of writing).

So that the auth token from using Staging/Production can work with your local dev environment and you will be able to access the admin section etc., add the following to your `/etc/hosts` file...

    127.0.0.1       dev.hackney.gov.uk

Run the development server:

    yarn dev

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/zeit/next.js/) - your feedback and contributions are welcome!
