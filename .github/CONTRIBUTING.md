# Contributing guidelines

## Contents

- [How to implement a feature flag](#how-to-implement-a-feature-flag)
  - [Using the feature flag](#using-the-feature-flag)
    - [React component](#react-component)
    - [React hook](#react-hook)
    - [Helper function](#helper-function)
- [How to expose an environment variable to the browser](#how-to-expose-an-environment-variable-to-the-browser)

## How to implement a feature flag

This application has a mechanism for hiding features behind flags. This is useful for a number of reasons:

- conditionally serving features to users during the development process – this allows us to test new features with stakeholders without putting a feature live for everyone
- the ability to better practice continuous delivery, by delivering in-progress work to production in an inert or inactive way

In order to add a feature flag for your new feature, look for the `<FeatureFlagProvider>` component in `./pages/_app.tsx`. You'll find an object which looks similar to the following:

```tsx
const features = {
  // FEATURE-FLAG-EXPIRES [3000-12-31]: name of the feature flag e.g feature-name
  'feature-name': {
    isActive: someConditionThatReturnsABoolean,
  },
};
```

You can add a new feature to it following this structure:

```tsx
[featureName: string]: {
  isActive: Boolean;
}
```

> ⚠️ **Warning**: Make sure to add an expiry date comment to the feature flag as shown above.

### Using the feature flag

#### React component

To then use your feature flag in your React code, a component – `<ConditionalFeature />` is available. This component will render its children if the feature is active, otherwise it will return nothing. Use it as follows:

```tsx
<div>
  <h1>This is my heading</h1>
  <ConditionalFeature name="some-awesome-feature">
    <AwesomeFeature />
  </ConditionalFeature>
</div>
```

In the above scenario, if the feature `some-awesome-feature` is active, the child component (`<AwesomeFeature />`) will be rendered below the heading. Otherwise, it'll be hidden.

#### React hook

You can also get the status of a feature flag by using the `useFeatureFlags()` React hook. This is useful if you need it inside other scripted code, such as a `useEffect()` or `useCallback()`. For example:

```tsx
const SomeComponent = () => {
  const { isFeatureActive } = useFeatureFlags();

  const handleClick = useCallback(() => {
    if (isFeatureActive('some-awesome-feature')) {
      // The feature is active, do something..!
    } else {
      // The feature isn't active, maybe do something else?
    }
  }, []);

  return <button onClick={handleClick}>Click here</button>;
};
```

#### Helper function

You can call `isFeatureFlagActive('feature-name')` to check whether the feature is set to active or inactive from within an API / Node.js file.
For example:

```ts
const shouldSomeThingHappen = isFeatureFlagActive('some-awesome-feature'); // true or false
```

## How to expose an environment variable to the browser

Typically in a Next.js application, if you want to make an environment variable
accessible to the browser i.e. client-side, then you prefix the name with
`NEXT_PUBLIC_`, see [Next.js's documenation on exposing environment variables to the browser](https://nextjs.org/docs/basic-features/environment-variables#exposing-environment-variables-to-the-browser). However, in our deployment pipeline, we build the application once and pass down
the artefact and deploy that in each environment. Because Next.js resolves `NEXT_PUBLIC_`
environment variables at build time, we're not able to utilise this.

To allow us to expose environment variables to the browser, we've created a
[React context](https://reactjs.org/docs/context.html) called `AppConfigContext`
with an `<AppConfigProvider />`, see
[lib/appConfig.tsx](./../lib/appConfig.tsx). This is used in `_app.tsx`. It
takes in an object that is created server-side in `getInitialProps` and passed
down as `props`. This means we can access all environment variables. The object
is then passed into the provider e.g. `<AppConfigProvider appConfig={pageProps.appConfig}>`.

1. Add a new key within the `appConfig` variable in `_app.tsx` within the `CustomApp.getInitialProps` function and set it to the new environment variable name.

> ⚠️ **Warning**: Any values placed in this object are passed to the client
> app, and will be made public in the browser. Do not share any sensitive or
> secret values through this.

```ts
const appConfig = {
  workflowsPilotUrl: process.env.WORKFLOWS_PILOT_URL,
  newEnvironmentVariable: process.env.NEW_ENVIRONMENT_VARIABLE,
};
```

Then in the component you want to utilise it, you can use the [React
hook](https://reactjs.org/docs/hooks-intro.html) called `useAppConfig()` for the
context. It returns an object with a function called `getConfigValue` which
takes in a key name added in `appConfig` e.g. `newEnvironmentVariable`.

> ⓘ **Information:** If `getConfigValue` can't find the provided value, then it
> will throw an error.

2. Use the `useAppConfig()` hook to retrieve the value of the new environment variable.

```tsx
const SomeComponent = () => {
  const { getConfigValue } = useAppConfig();

  return (
    <a href={getConfigValue('newEnvironmentVariable') as string}>Click here</a>
  );
};
```
