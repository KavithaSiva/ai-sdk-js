# @sap-ai-sdk/ai-api

SAP Cloud SDK for AI is the official Software Development Kit (SDK) for **SAP AI Core**, **SAP Generative AI Hub**, and **Orchestration Service**.

This package provides tools to manage scenarios and workflows in SAP AI Core.

- Streamline data preprocessing and model training pipelines.
- Execute batch inference jobs.
- Deploy inference endpoints for trained models.
- Register custom Docker registries, sync AI content from Git repositories, and register object storage for training data and model artifacts.

We maintain a list of [currently available and tested AI Core APIs](https://github.com/SAP/ai-sdk-js/blob/main/docs/list-tested-APIs.md)

### Table of Contents

- [Installation](#installation)
- [Version Management](#version-management)
- [Prerequisites](#prerequisites)
- [Usage](#usage)
  - [Create an Artifact](#create-an-artifact)
  - [Create a Configuration](#create-a-configuration)
  - [Create a Deployment](#create-a-deployment)
  - [Delete a Deployment](#delete-a-deployment)
  - [Custom Destination](#custom-destination)
- [Error Handling](#error-handling)
- [Local Testing](#local-testing)
- [Support, Feedback, Contribution](#support-feedback-contribution)
- [License](#license)

## Installation

```
$ npm install @sap-ai-sdk/ai-api
```

## Version Management

⚠️ **Important**: This package contains generated code.
Updates to this package may include breaking changes.

To ensure compatibility and manage updates effectively, we strongly recommend using the tilde (`~`) version range in your project instead of the caret (`^`). This approach will allow patch-level updates while preventing potentially breaking minor version changes.

```JSON
"dependencies": {
    "@sap-ai-sdk/ai-api": "~1.0.0"
}
```

## Prerequisites

- [Enable the AI Core service in SAP BTP](https://help.sap.com/docs/sap-ai-core/sap-ai-core-service-guide/initial-setup).
- Configure the project with **Node.js v20 or higher** and **native ESM** support.

> **Accessing the AI Core Service via the SDK**
>
> The SDK automatically retrieves the `AI Core` service credentials and resolves the access token needed for authentication.
>
> - In Cloud Foundry, it's accessed from the `VCAP_SERVICES` environment variable.
> - In Kubernetes / Kyma environments, you have to mount the service binding as a secret instead, for more information refer to [this documentation](https://www.npmjs.com/package/@sap/xsenv#usage-in-kubernetes).

## Usage

The examples below demonstrate the usage of the most commonly used APIs in SAP AI Core.
In addition to the examples below, you can find more **sample code** [here](https://github.com/SAP/ai-sdk-js/blob/main/sample-code/src/ai-api).

### Create an Artifact

```ts
async function createArtifact() {
  const requestBody: ArtifactPostData = {
    name: 'training-test-dataset',
    kind: 'dataset',
    url: 'https://ai.example.com',
    scenarioId: 'foundation-models'
  };

  const responseData: ArtifactCreationResponse =
    await ArtifactApi.artifactCreate(requestBody, {
      'AI-Resource-Group': 'default'
    }).execute();
  return responseData;
}
```

### Create a Configuration

```ts
async function createConfiguration() {
  const requestBody: ConfigurationBaseData = {
    name: 'gpt-35-turbo',
    executableId: 'azure-openai',
    scenarioId: 'foundation-models',
    parameterBindings: [
      {
        key: 'modelName',
        value: 'gpt-35-turbo'
      },
      {
        key: 'modelVersion',
        value: 'latest'
      }
    ],
    inputArtifactBindings: []
  };

  const responseData: ConfigurationCreationResponse =
    await ConfigurationApi.configurationCreate(requestBody, {
      'AI-Resource-Group': 'default'
    }).execute();
  return responseData;
}
```

### Create a Deployment

```ts
async function createDeployment() {
  const requestBody: DeploymentCreationRequest = {
    configurationId: '0a1b2c3d-4e5f6g7h'
  };
  const responseData: DeploymentCreationResponse =
    await DeploymentApi.deploymentCreate(requestBody, {
      'AI-Resource-Group': 'default'
    }).execute();
  return responseData;
}
```

### Delete a Deployment

Only deployments with `targetStatus: STOPPED` can be deleted.
Thus, a modification request must be sent before deletion can occur.

```ts
async function modifyDeployment() {
  let deploymentId: string = '0a1b2c3d4e5f';

  const deployment: DeploymentResponseWithDetails =
    await DeploymentApi.deploymentGet(
      deploymentId,
      {},
      { 'AI-Resource-Group': 'default' }
    ).execute();

  if (deployment.targetStatus === 'RUNNING') {
    // Only RUNNING deployments can be STOPPED.
    const requestBody: DeploymentModificationRequest = {
      targetStatus: 'STOPPED'
    };

    await DeploymentApi.deploymentModify(deploymentId, requestBody, {
      'AI-Resource-Group': 'default'
    }).execute();
  }
  // Wait a few seconds for the deployment to stop
  return DeploymentApi.deploymentDelete(deploymentId, {
    'AI-Resource-Group': 'default'
  }).execute();
}
```

### Custom Destination

When calling the `execute()` method, it is possible to provide a custom destination.
For example, when querying deployments targeting a destination with the name `my-destination`, the following code can be used:

```ts
const queryParams = status ? { status } : {};
return DeploymentApi.deploymentQuery(queryParams, {
  'AI-Resource-Group': resourceGroup
}).execute({
  destinationName: 'my-destination'
});
```

By default, the fetched destination is cached.
To disable caching, set the `useCache` parameter to `false` together with the `destinationName` parameter.

## Error Handling

For error handling instructions, refer to this [section](https://github.com/SAP/ai-sdk-js/blob/main/README.md#error-handling).

## Local Testing

For local testing instructions, refer to this [section](https://github.com/SAP/ai-sdk-js/blob/main/README.md#local-testing).

## Support, Feedback, Contribution

This project is open to feature requests, bug reports and questions via [GitHub issues](https://github.com/SAP/ai-sdk-js/issues).

Contribution and feedback are encouraged and always welcome.
For more information about how to contribute, the project structure, as well as additional contribution information, see our [Contribution Guidelines](https://github.com/SAP/ai-sdk-js/blob/main/CONTRIBUTING.md).

## License

The SAP Cloud SDK for AI is released under the [Apache License Version 2.0.](http://www.apache.org/licenses/).
