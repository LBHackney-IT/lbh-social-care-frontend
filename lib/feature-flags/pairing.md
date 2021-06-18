# Pairing session – feature flags

## Approach

1. Reviewing the draft implementation
2. Determine what the first area of focus should be
3. Document the API design we want to get to
4. Writing tests for the above
5. Write code to pass the tests
6. ... loop through steps 3-5 ...
7. Done!

## TDD

### Double loop (thanks Neil!)

- Permanent red test: feature X should be available behind the feature flag
- Red/green tests: smaller implementation details

## Questions from initial review

- How do we give feature flag control to stakeholders?
  - Comes down to who controls the flag, and how long for.
  - e.g. Env Var: control is with the engineers, and permanent
- How do we determine what _needs_ to have a feature flag?
  - Estimated length of development?
  - Is external approval required?
  - Launch window is months away?
  - A/B split
- Feature flags or feature toggles?
  - Flags!
- Do we want to put the date in as a property of the feature flag?
  - This is for discipline and house keeping
  - Currently a comment for ESLint – we could also add it as a property
  - Can we have an upper limit on the expiry date?
- How do we handle async calls for flag state?
- Do we have a naming convention for the feature flags?
- By default flags should be off / false
  - Error scenarios
  - Expiry?
