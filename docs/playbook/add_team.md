## Add new team to the Social Care Case Viewer API

### --- STEP 1 ---

In the Social Care Case Viewer repo, go to the file location:

`social-care-case-viewer-api/SocialCareCaseViewerApi/V1/Controllers/TeamController.cs`

We need to gather the `Route` information from this file. We see the Route is defined like so, _[Route("api/v1/teams")]_ and take note of it's value:

`Route`

```
api/v1/teams
```

We'll need to append this route to the API endpoint which we will learn how to find in the next step.

Next we need to check the shape of the `CreateTeamRequest` boundary request object that the API will be expecting.

In the repo, go to the file location:

`SocialCareCaseViewerApi/V1/Boundary/Requests/CreateTeamRequest.cs`

This shows us that the create team request object expects to take JSON properties consisting of a `name` and a `context` that we add in the format of a JSON object.

name = the name of the new team

context = refers to which service, “A” for ASC or “C” for CFS

e.g.,

```
{
  “name”: “chosen_name”,
  “context”: “chosen_context”
}
```

### --- STEP 2 ---

You'll require access to the `Staging APIs` AWS account, select the `Management Console`.

Once this account has loaded, go to `API Gateway`,

- select `“APIs”`

- select the correct api: `“staging-social-care-case-viewer-api”`

- select `“stages”`

- select ` “staging”`

- where is says `“Invoke URL:"`
  copy the value of the URL, e.g.,

```
https://thecorrecturl.something.yourregion.amazonaws.com/staging
```

This URL is the endpoint in staging that you will be sending details of the new team to using Postman in the next step.

Also in the “staging-social-care-case-viewer-api”

- select `“API Keys”` ->

- select the key called: `“api-key-social-care-case-viewer-api-staging”`

- where it says `“API key”`, click to show the API key value and copy this. We will require this key to set up our authorisation in Postman

### --- STEP 3 ---

## Postman

In Postman create a new tab in which to set up your http request.

If you are unsure how to do this please check the [Postman docs on sending a request](https://learning.postman.com/docs/getting-started/sending-the-first-request/#sending-a-request).

Ensure you are using a `POST` method, as we are about to create a resource on a collection.

Add the endpoint `URL` that we collected in the last step to the input box next to our POST method and append the route information ("api/v1/teams”) to it, e.g.:

```
https://thecorrecturl.something.yourregion.amazonaws.com/staging/api/v1/teams
```

Be sure to prefix the route with a “/“

Next, find the tab that says `Body`

When you do this, several radio button options will appear underneath.

- select `raw` & see a new `Text` option appear

- In this new option, select `JSON`

In the larger input panel below these options we add our JSON object that will contain the new team name and the team context.

```
{
  “name”: “Customer Service”,
  “context”: “A”
}
```

Still in Postman,

- select the `Authorization` tab

For ”Type”,

- select `API Key` and a panel should appear with the following properties:

```
Key
Value
Add to
```

The value for _Key_ should be `“x-api-key”`

The value for _Value_ should be the `API Key` you just copied for the `“api-key-social-care-case-viewer-api-staging”` API in the AWS Staging APIs account

The value for _Add to_ should be `“Header”`

Once all this is set up you should be able to send the new request object, containing the data to create a new team, to the staging endpoint
with the correct authorisation.

In Postman, press the “Send” button and you should receive a response object with the following data (note: the “id” parameter value will return a new integer value for each new response object)

```
{
 “id”: 90,
 “name”: “Customer Service”,
 “context”: “A”
}
```

### --- STEP 4 ---

#### Checking it worked

Go to the [staging Frontend Application](https://social-care-service-staging.hackney.gov.uk/login) ->

Click on the `"Manage workers"` link & enter a workers email to search for ->

Once found, you should see & press the `“Update worker’s details”` button ->

On the following page you will have the `“Team”` drop down, select this and check that it contains your newly added team for the correct service, e.g., Customer Service in the ASC service.

### --- STEP 5 ---

You’ll probably have to do the same in the “Mosaic Production” AWS account

You'll require access to the `Mosaic-Production` AWS account, select the `Management Console`.

Once this account has loaded, go to `API Gateway`,

- select `“APIs”`

- select the correct API: `“mosaic-prod-social-care-case-viewer-api”`

- select `“stages”`

- select `"mosaic-prod”`

- where is says `“Invoke URL:"`
  copy the value of the URL

```
https://thecorrecturl.something.yourregion.amazonaws.com/production
```

Also in the “mosaic-prod-social-care-case-viewer-api”

- select `“API Keys”` ->

- select the key called: `“api-key-social-care-case-viewer-api-mosaic-prod"`

- where it says `“API key”`, click to show the API key value and copy this. We will require this key to set up our authorisation in Postman

Again, set up your request object data, send it and then go to the [Production Frontend Application](https://social-care-service.hackney.gov.uk/login) to make sure the team was created correctly and in the correct service.
