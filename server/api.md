# AutoMateMe
The API that runs the AutoMateMe platform

## Version: 1.0

</br>

## About.json
---

### /about.json

#### GET
##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 |  |

</br>

## Auth
---

### /auth/login

#### POST
##### Summary:

Login with local credentials

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| body | body |  | Yes | [LocalLoginReqDto](#LocalLoginReqDto) |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 |  | [LoginResDto](#LoginResDto) |
| 400 |  |  |
| 401 |  |  |

</br>

### /auth/login/google/code

#### POST
##### Summary:

Login with a Google code

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| body | body |  | Yes | [LoginWithGoogleCodeReqDto](#LoginWithGoogleCodeReqDto) |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 |  | [LoginResDto](#LoginResDto) |
| 400 |  |  |

</br>

### /auth/signup

#### POST
##### Summary:

Sign up a new account

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| body | body |  | Yes | [SignupReqDto](#SignupReqDto) |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 |  | [LoginResDto](#LoginResDto) |
| 400 |  |  |

</br>

## Accounts
---

### /me

#### GET
##### Summary:

Get detailed profile information about the current user

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 |  | [GetAccountResDto](#GetAccountResDto) |
| 401 |  |  |

##### Security

| Security Schema |
| --- |
| bearer |


</br>

## Scenarios
---

### /scenarios

#### GET
##### Summary:

Get all scenarios from the current user

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 |  | [GetScenariosResDto](#GetScenariosResDto) |
| 400 |  |  |

##### Security

| Security Schema |
| --- |
| bearer |

</br>

### /scenarios/create

#### POST
##### Summary:

Create a new scenario

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| body | body |  | Yes | [ScenarioReqDto](#ScenarioReqDto) |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 |  | [ScenarioResDto](#ScenarioResDto) |
| 400 |  |  |

##### Security

| Security Schema |
| --- |
| bearer |

</br>

### /scenarios/delete/{id}

#### DELETE
##### Summary:

Delete an existing scenario

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| id | path |  | Yes | string |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 |  | [ScenarioResDto](#ScenarioResDto) |
| 400 |  |  |

##### Security

| Security Schema |
| --- |
| bearer |

</br>

### /scenarios/update/{id}

#### PUT
##### Summary:

Update an existing scenario

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| id | path |  | Yes | string |
| body | body |  | Yes | [ScenarioReqDto](#ScenarioReqDto) |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 |  | [ScenarioResDto](#ScenarioResDto) |
| 400 |  |  |

##### Security

| Security Schema |
| --- |
| bearer |

</br>

### /scenarios/{id}

#### GET
##### Summary:

Get a scenario from the current user

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| id | path |  | Yes | string |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 |  | [GetScenarioResDto](#GetScenarioResDto) |
| 400 |  |  |

##### Security

| Security Schema |
| --- |
| bearer |

</br>

## Services
---

### /services

#### GET
##### Summary:

Get all services

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 |  | [GetServicesResDto](#GetServicesResDto) |
| 400 |  |  |

##### Security

| Security Schema |
| --- |
| bearer |

</br>

### /services/{serviceName}

#### GET
##### Summary:

Get a service

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| serviceName | path |  | Yes | string |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 |  | [GetServiceResDto](#GetServiceResDto) |
| 400 |  |  |

##### Security

| Security Schema |
| --- |
| bearer |

</br>

### /services/{serviceName}/reactions

#### GET
##### Summary:

Get all reactions of a service

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| serviceName | path |  | Yes | string |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 |  | [GetReactionsResDto](#GetReactionsResDto) |
| 400 |  |  |

##### Security

| Security Schema |
| --- |
| bearer |

</br>

### /services/{serviceName}/reactions/{reactionName}

#### GET
##### Summary:

Get a reaction of a service

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| serviceName | path |  | Yes | string |
| reactionName | path |  | Yes | string |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 |  | [GetReactionResDto](#GetReactionResDto) |
| 400 |  |  |

##### Security

| Security Schema |
| --- |
| bearer |

</br>

### /services/{serviceName}/triggers

#### GET
##### Summary:

Get all triggers of a service

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| serviceName | path |  | Yes | string |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 |  | [GetTriggersResDto](#GetTriggersResDto) |
| 400 |  |  |

##### Security

| Security Schema |
| --- |
| bearer |

</br>

### /services/{serviceName}/triggers/{triggerName}

#### GET
##### Summary:

Get a trigger of a service

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| serviceName | path |  | Yes | string |
| triggerName | path |  | Yes | string |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 |  | [GetTriggerResDto](#GetTriggerResDto) |
| 400 |  |  |

##### Security

| Security Schema |
| --- |
| bearer |

</br>

## Subscriptions
---

### /subscriptions

#### GET
##### Summary:

Get all subscriptions from the current user

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 |  | [GetSubscriptionsResDto](#GetSubscriptionsResDto) |
| 400 |  |  |

##### Security

| Security Schema |
| --- |
| bearer |

</br>

### /subscriptions/{serviceName}

#### DELETE
##### Summary:

Delete a subscription to the serviceName

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| serviceName | path |  | Yes | string |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 |  | [SubscriptionResDto](#SubscriptionResDto) |
| 400 |  |  |

##### Security

| Security Schema |
| --- |
| bearer |

#### GET
##### Summary:

Get an AuthLink for the serviceName

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| serviceName | path |  | Yes | string |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 |  | [SubscriptionUrlResDto](#SubscriptionUrlResDto) |
| 400 |  |  |

##### Security

| Security Schema |
| --- |
| bearer |

#### POST
##### Summary:

Create a subscription to the serviceName

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| serviceName | path |  | Yes | string |
| body | body |  | Yes | [SubscriptionReqDto](#SubscriptionReqDto) |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 |  | [SubscriptionResDto](#SubscriptionResDto) |
| 400 |  |  |

##### Security

| Security Schema |
| --- |
| bearer |

#### PUT
##### Summary:

Update a subscription to the serviceName

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| serviceName | path |  | Yes | string |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 |  | [SubscriptionResDto](#SubscriptionResDto) |
| 400 |  |  |

##### Security

| Security Schema |
| --- |
| bearer |

</br>

## Tokens
---

### /me/tokens

#### GET
##### Summary:

Get auth tokens of the current user

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 |  | [GetAuthTokensResDto](#GetAuthTokensResDto) |
| 401 |  |  |
| 403 |  |  |

##### Security

| Security Schema |
| --- |
| bearer |

</br>

### /token/{tokenId}

#### DELETE
##### Summary:

Delete an auth token

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| tokenId | path |  | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 204 |  |
| 401 |  |
| 403 |  |
| 404 |  |

##### Security

| Security Schema |
| --- |
| bearer |


</br>

## Security
---

**bearer**
|apiKey|*API Key*|
|---|---|
|In|header|
|Name|Authorization|

</br>

## Models
---

#### AccountDto

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| createdAt | string |  | Yes |
| id | string |  | Yes |
| type | string |  | Yes |
| updatedAt | string |  | Yes |
| username | string |  | Yes |

#### AuthTokenDto

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| createdAt | string |  | Yes |
| expiresAt | string |  | Yes |
| id | string |  | Yes |
| lastActive | string |  | Yes |
| name | string |  | Yes |
| type | string |  | Yes |
| updatedAt | string |  | Yes |

#### AuthTokensDataDto

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| authTokens | [ [AuthTokenDto](#AuthTokenDto) ] |  | Yes |

#### GetAccountResDto

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| data | [AccountDto](#AccountDto) |  | Yes |
| status | string |  | Yes |

#### GetAuthTokensResDto

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| data | [AuthTokensDataDto](#AuthTokensDataDto) |  | Yes |
| status | string |  | Yes |

#### GetReactionResDto

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| data | object |  | Yes |
| status | string |  | Yes |

#### GetReactionsResDto

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| data | [ string ] |  | Yes |
| status | string |  | Yes |

#### GetScenarioResDto

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| data | [ScenarioData](#ScenarioData) |  | Yes |
| status | string |  | Yes |

#### GetScenariosResDto

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| data | [ string ] |  | Yes |
| status | string |  | Yes |

#### GetServiceResDto

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| data | object |  | Yes |
| status | string |  | Yes |

#### GetServicesResDto

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| data | [ string ] |  | Yes |
| status | string |  | Yes |

#### GetSubscriptionsResDto

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| data | [ string ] |  | Yes |
| status | string |  | Yes |

#### GetTriggerResDto

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| data | object |  | Yes |
| status | string |  | Yes |

#### GetTriggersResDto

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| data | [ string ] |  | Yes |
| status | string |  | Yes |

#### LocalLoginReqDto

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| authTokenName | string |  | Yes |
| email | string |  | Yes |
| password | string |  | Yes |

#### LoginDataResDto

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| account | [AccountDto](#AccountDto) |  | Yes |
| bearerToken | string |  | Yes |

#### LoginResDto

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| data | [LoginDataResDto](#LoginDataResDto) |  | Yes |
| status | string |  | Yes |

#### LoginWithGoogleCodeReqDto

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| authTokenName | string |  | Yes |
| code | string |  | Yes |

#### ScenarioData

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| id | string |  | Yes |
| name | string |  | Yes |
| reaction | object |  | Yes |
| trigger | object |  | Yes |

#### ScenarioReqDto

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| name | string |  | Yes |
| reaction | object |  | Yes |
| trigger | object |  | Yes |

#### ScenarioResDto

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| data | object |  | Yes |
| status | string |  | Yes |

#### SignupReqDto

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| authTokenName | string |  | Yes |
| email | string |  | Yes |
| password | string |  | Yes |
| username | string |  | Yes |

#### SubscriptionReqDto

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| code | string |  | Yes |

#### SubscriptionResDto

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| data | object |  | Yes |
| status | string |  | Yes |

#### SubscriptionUrlResDto

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| data | object |  | Yes |
| status | string |  | Yes |