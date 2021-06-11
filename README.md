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

3.  Make a copy of `.env.sample` called `.env.local` and complete as follows:

| Name                            | Description                                                                                   |
| ------------------------------- | --------------------------------------------------------------------------------------------- |
| ENV                             | The name of your environment, `local` is a good value here                                    |
| ENDPOINT_API                    | The URL for the HTTP API                                                                      |
| AWS_KEY                         | The API key for calling the HTTP API (defined in `ENDPOINT_API`)                              |
| GSSO_URL                        | The URL for the authentication service at Hackney                                             |
| GSSO_TOKEN_NAME                 | The local storage key name where the authentication JWT should be stored                      |
| HACKNEY_JWT_SECRET              | The shared secret used for validating the JWT                                                 |
| AUTHORISED_ADMIN_GROUP          | The name of the Admins Google Group                                                           |
| AUTHORISED_ADULT_GROUP          | The name of the Adult (ASC) Google Group                                                      |
| AUTHORISED_CHILD_GROUP          | The name of the Childrens (CFS) Google Group                                                  |
| AUTHORISED_ALLOCATORS_GROUP     | The name of the Allocators Google Group                                                       |
| AUTHORISED_UNRESTRICTED_GROUP   | The name of the Unrestricted Google Group                                                     |
| AUTHORISED_DEV_GROUP            | The name of the Developers Google Group                                                       |
| POSTCODE_LOOKUP_URL             | The URL for the postcode lookup service (including `/api/v1/addresses?postcode=` at the end!) |
| POSTCODE_LOOKUP_APIKEY          | The API key for the postcode lookup service (defined in `POSTCODE_LOOKUP_URL`)                |
| REDIRECT_URL                    | The URL to redirect to post-authentication (`dev.hackney.gov.uk:3000` for local development)  |
| NEXT_PUBLIC_GOOGLE_ANALYTICS_ID | The ID for Google Analytics data to be reported to                                            |
| NEXT_PUBLIC_FEEDBACK_LINK       | The Google Form URL that powers the feedback link                                             |
| STORYBOOK_API_PROXY             | ???                                                                                           |

4. Make a copy of `cypress.env.sample.json` called `cypress.env.json` and complete as follows:

| Name                                 | Description                                                                    |
| ------------------------------------ | ------------------------------------------------------------------------------ |
| CHILDREN_RESTRICTED_RECORD_PERSON_ID | The ID of a restricted childrens resident (use `71`)                           |
| CHILDREN_RECORD_PERSON_ID            | The ID for a childrens resident (use `19`)                                     |
| CHILDREN_RECORD_FIRST_NAME           | The first name for a childrens resident (use `Cristobal`)                      |
| CHILDREN_RECORD_LAST_NAME            | The last name for a childrens resident (use `Cawdell`)                         |
| CHILDREN_RECORD_FULL_NAME            | The full name for a childrens resident (use `Cristobal Cawdell`)               |
| ADULT_RESTRICTED_RECORD_PERSON_ID    | The ID of a restricted adults resident (use `20`)                              |
| ADULT_RECORD_PERSON_ID               | The ID for a childrens resident (use `7`)                                      |
| ADULT_RECORD_FIRST_NAME              | The first name for an adults resident (use `Birgit`)                           |
| ADULT_RECORD_LAST_NAME               | The last name for an adults resident (use `Gaylard`)                           |
| ADULT_RECORD_FULL_NAME               | The full name for a childrens resident (use `Birgit Gaylard`)                  |
| MOSAIC_ID_TEST                       | The Mosaic ID used for testing (use `21`)                                      |
| NAME_FOR_MOSAIC_ID_TEST              | The name for the Mosaic ID defined in `MOSAIC_ID_TEST` (use `Estrella Kidman`) |
| TEST_KEY_ADMIN_DEV                   | A valid JWT for an admin user                                                  |
| TEST_KEY_ADULT_GROUP                 | A valid JWT for an adults user                                                 |
| TEST_KEY_ADULT_ALLOCATOR_GROUP       | A valid JWT for an adults + allocators user                                    |
| TEST_KEY_ADULT_UNRESTRICTED_GROUP    | A valid JWT for an adults + unrestricted user                                  |
| TEST_KEY_CHILDREN_GROUP              | A valid JWT for a childrens user                                               |
| TEST_KEY_CHILDREN_UNRESTRICTED_GROUP | A valid JWT for a childrens unrestricted user                                  |

5.  The Hackney authentication service requires the application to run on a `hackney.gov.uk` domain. To be able to access the application, add the following to your `/etc/hosts` file:

        127.0.0.1       dev.hackney.gov.uk

### Run the tests

1.  Once you're set up, verify the app is working by running the unit test suites:

        yarn test

2.  You can then run the end to end Cypress tests with:

        yarn e2e

    > Note! It's possible Cypress will fail the first time you try to run it, with an error similar to `Cypress verification time out`. If this happens, just run the command again, and it should start working!

3.  If all the tests pass, you should be able to safely launch the application server by running:

        yarn dev

4.  Open [http://dev.hackney.gov.uk:3000](http://dev.hackney.gov.uk:3000) with your browser to see the result.

## Design and UI

The application makes use the [Hackney Design System](https://design-system.hackney.gov.uk/).

## Next.js

The application is built using Next.js. To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
