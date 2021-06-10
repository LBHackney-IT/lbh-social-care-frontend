# Spike: Adding structured feature flags to our Next.js app

Spike ticket: [[SCT-398]](https://hackney.atlassian.net/browse/SCT-398)

## Problem statement

We want a system for feature flagging new code in our application, with two primary goals:

- conditionally serving features to users during the development process – this allows us to test new features with stakeholders without putting a feature live for everyone
- the ability to better practice continuous delivery, by delivering in-progress work to production in an inert or inactive way

We have explored preview environments [[SCT-254]](https://hackney.atlassian.net/browse/SCT-254), and have reviewed our current ability to toggle features within our application [[SCT-399]](https://hackney.atlassian.net/browse/SCT-399).

This document intends to investigate how we might implement a fairly lightweight feature toggle solution in our Next.js application, with the following goals:

- Easy to implement new feature flags, with an obvious place for them to live
- Easy to manage existing feature flags, and understand when they need to be tidied up
- Transparency about which flags are currently in the system, and how they are activated
- That delivering a feature being a flag is so trivial that it becomes the default for all engineers on the team
- That the API design has scope to grow to become more flexible in the future

## How would a new solution work?

The general concept is to introduce a single place for defining "feature toggles", which are made up of two properties, and an expiry date:

```ts
{
  // FEATURE-FLAG-EXPIRES[2021-06-30] – a comment which notes when the feature toggle should be removed (this will cause an ESLint failure if the date is in the past)

  name: 'some-feature'; // This is a unique identifier for a feature, that can be used later in code to reference it

  get isActive(): boolean {
    // A getter that returns a boolean, and determines if the flag is active or not.
    //  Here you can check any of:
    //  * `NEXT_PUBLIC_` environment variables
    //  * Local/Session storage value (this should gracefully fail in a non-browser environment)
    //  * Any other property you can think of! It's just TypeScript!

    return true;
  };
}
```

> ⚠️ **Why is `isActive` a getter, not a function?** The same flag configuration is used on server render and client render. At render time, we:
>
> 1. Calculate the flag values on the server and pass them to the React application
> 2. Render the app based on those flags at server render time
> 3. Refresh the status of the flags on client hydration, and update them
> 4. Optionally re-render the app if there are any flag changes (e.g. flags based on local storage values)
>
> The reason we have to use a [getter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get) is that the feature flag object must be serialised so it can be passed between server and client, and we can't serialise a function. We _can_ however serialise a getter, because it consolidates down to it's return value, in our case, either `true` or `false`.

Below is an example where we toggle a 'dashboard' feature based on two things (a Local Storage value or a environment variable). This feature is also set to 'expire' on June 30th 2021.

```ts
{
  // FEATURE-FLAG-EXPIRES[2021-06-30]
  name: 'dashboard',
  get isActive() => {
    if (getLocalStorageFlagValue('dashboard') === 'active') {
      return true;
    }

    if (process.env.NEXT_PUBLIC_FEATURE_FLAG_DASHBOARD === 'active') {
      return true;
    }

    return false;
  },
}
```

### React (Hook)

A hook – `useFeatureFlags()` – provides a function that allows an engineer to interrogate the status of a given feature flag at runtime.

```tsx
const { isFeatureEnabled } = useFeatureFlags();

useEffect(() => {
  if (isFeatureEnabled('some-feature')) {
    // `some-feature` is active in the current request
  } else {
    // The feature is not active
  }
}, []);
```

### React (Component)

A React component – `<FeatureCondition />` – allows an engineer to interrogate the status of a given feature flag as part of their React rendering tree, conditionally rendering the provided children if the flag is active.

```tsx
return (
  <main>
    <h1>This is my heading</h1>
    <FeatureCondition name="some-feature">
      <p>This is my subheading</p>
    </FeatureCondition>
  </main>
);
```

### TypeScript (API)

A simple function call will allow an engineer to interrogate whether the current feature is active or inactive in an API / Node.js file.

```ts
const someFeatureIsActive = isFeatureActive('some-feature'); // true or false
```

## Benefits

### Expiring feature toggles

One well documented downside to feature toggles is the need to ensure they are cleaned up and removed when no longer necessary. By adding the expiring comment to each feature flag, the engineering team will be forced to do one of two things when an expiry date is met:

1. Extend the expiry date, making a conscious choice to renew the flag as it is still in use
   - _This action requires an explicit action and PR approval from the relevant team – it encourages the discussion_
2. Remove the feature flag, as it is no longer needed
   - _If an engineer is not in a position to remove a flag, they may choose extend it by a short time, and create a ticket to remove it in the next week or two_

### Consistency

By providing one clear way to check the status of a given feature toggle, this makes it much easier to navigate our code (global code search, find / replace etc.) and understand where feature toggles are used.

### Function for checking status

Each feature toggle has an independent function for determining the status of the flag for the current request. This has a number of benefits:

1. Initially we can keep things simple, checking globally available data (such as environment variables or local / session storage)
2. When the need arises, our functions can become more advanced, for example they might:
   - Check a URL query parameter value
   - Check a property of your session token (JWT)
   - Make an API call to the database to assess whether or not you should see the feature
   - Call an external / third-party service to determine if the feature should be shown

Early on this means our toggles will broadly be changed based on code releases, or environment variable changes, but gives us room to grow within the proposed API to explore more advanced options as the need arises, without the expensive cost of refactoring our entire feature flag system.

## What documentation would a new system require?

In order to make this usable by all of our contributors, we will need to document:

- why we use feature flags
- when it is sensible to use a feature flag
- how to add a new feature flag
- best practices around which data to use to determine the status of a flag
-
