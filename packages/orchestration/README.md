# @sap-ai-sdk/orchestration

SAP Cloud SDK for AI is the official Software Development Kit (SDK) for **SAP AI Core**, **SAP Generative AI Hub**, and **Orchestration Service**.

This package incorporates generative AI orchestration capabilities into your AI activities in SAP AI Core and SAP AI Launchpad.

### Table of Contents

- [Installation](#installation)
- [Prerequisites](#prerequisites)
- [Orchestration Service](#orchestration-service)
- [Usage](#usage)
  - [LLM Config](#llm-config)
  - [Templating](#templating)
  - [Prompt Registry](#prompt-registry)
  - [Content Filtering](#content-filtering)
  - [Data Masking](#data-masking)
  - [Grounding](#grounding)
  - [Using a JSON Configuration from AI Launchpad](#using-a-json-configuration-from-ai-launchpad)
  - [Streaming](#streaming)
  - [Using a Custom Resource Group](#using-a-custom-resource-group)
  - [Custom Request Configuration](#custom-request-configuration)
  - [Custom Destination](#custom-destination)
- [Error Handling](#error-handling)
- [Local Testing](#local-testing)
- [Support, Feedback, Contribution](#support-feedback-contribution)
- [License](#license)

## Installation

```
$ npm install @sap-ai-sdk/orchestration
```

## Prerequisites

- [Enable the AI Core service in SAP BTP](https://help.sap.com/docs/sap-ai-core/sap-ai-core-service-guide/initial-setup).
- Configure the project with **Node.js v20 or higher** and **native ESM** support.
- An [Orchestration deployment](https://help.sap.com/docs/sap-ai-core/sap-ai-core-service-guide/get-your-orchestration-deployment-url) is running in your AI Core service instance.
  - When using the `default` [resource group](https://help.sap.com/docs/sap-ai-core/sap-ai-core-service-guide/resource-groups), a deployment is provided by default.
    No further setup is needed.
  - When using a custom resource group, please refer to [this guide](https://help.sap.com/docs/sap-ai-core/sap-ai-core-service-guide/create-deployment-for-orchestration) on how to create a deployment in that resource group.

> **Accessing the AI Core Service via the SDK**
>
> The SDK automatically retrieves the `AI Core` service credentials and resolves the access token needed for authentication.
>
> - In Cloud Foundry, it's accessed from the `VCAP_SERVICES` environment variable.
> - In Kubernetes / Kyma environments, you have to mount the service binding as a secret instead, for more information refer to [this documentation](https://www.npmjs.com/package/@sap/xsenv#usage-in-kubernetes).

## Orchestration Service

The orchestration service provides essential features like [templating](#templating), [content filtering](#content-filtering), [grounding](#grounding), etc which are often required in business AI scenarios.

Find more details about orchestration workflow [here](https://help.sap.com/docs/sap-ai-core/sap-ai-core-service-guide/orchestration-workflow).

## Usage

Leverage the orchestration service capabilities by using the orchestration client.
You can perform a simple prompt by running:

```ts
import { OrchestrationClient } from '@sap-ai-sdk/orchestration';

const orchestrationClient = new OrchestrationClient({
  llm: {
    model_name: 'gpt-4o'
  },
  templating: {
    template: [
      { role: 'user', content: 'Hello World! Why is this phrase so famous?' }
    ]
  }
});

const response = await orchestrationClient.chatCompletion();
console.log(response.getContent());
```

Here we use GPT-4o with a single user message as prompt and print out the response.

The `OrchestrationClient` enables combining various modules, such as templating and content filtering, while sending chat completion requests to an orchestration-compatible generative AI model.

In addition to the examples below, you can find more **sample code** [here](https://github.com/SAP/ai-sdk-js/blob/main/sample-code/src/orchestration.ts).

### LLM Config

Choose the LLM by setting the `model_name` property.
Optionally, define `model_version` (default: `latest`) and `model_params` for custom settings.

> [!Tip]
>
> #### Harmonized API
>
> The Orchestration Service provides a [harmonized API](https://help.sap.com/docs/sap-ai-core/sap-ai-core-service-guide/harmonized-api) for all models.
> Switching to a different model — even from another vendor — only requires changing the `model_name` property.

### Templating

Use the orchestration client with templating to pass a prompt containing placeholders that will be replaced with input parameters during a chat completion request.
This allows for variations in the prompt based on the input parameters.

```ts
const orchestrationClient = new OrchestrationClient({
  llm: {
    model_name: 'gpt-4o',
    model_params: { max_tokens: 50, temperature: 0.1 }
  },
  templating: {
    template: [
      { role: 'user', content: 'What is the capital of {{?country}}?' }
    ]
  }
});

const response = await orchestrationClient.chatCompletion({
  inputParams: { country: 'France' }
});

const responseContent = response.getContent();
const finishReason = response.getFinishReason();
const tokenUsage = response.getTokenUsage();
```

You can use the following convenience methods for handling chat completion responses:

- `getContent()` parses the response and returns the model's output as a string.
- `getFinishReason()` retrieves the `finish_reason` explaining why chat completion request stopped.
- `getTokenUsage()` provides token usage details, including `total_tokens`, `prompt_tokens`, and `completion_tokens`.

#### Structured Outputs

##### Tool Calling

Structured outputs through tools can be enabled by setting `strict: true` in the function definition.
These tools enable the creation of multi-step, agent-driven workflows, allowing LLMs to perform specific actions.

```ts
templating: {
  tools: [
    type: 'function',
    function: {
      name: 'add',
      description: 'Calculate the absolute value of x',
      parameters: {
        type: 'object',
        properties: {
          x: { type: number }
        }
      },
      required: ['x'],
      additionalProperties: false
    }
  ]
}
```

##### Using `response_format` parameter

Setting `response_format` under `templating` guarantees that the model's output aligns with the schema type specified by developers.
It is useful when the model is **not calling a tool**, but rather, responding to the user in a structured way.

The example below demonstrates how to use `response_format` to return a JSON Schema, with `strict: true` ensuring the outputs conform precisely to the schema.

```ts
const templating: TemplateModuleConfig = {
  template: [{ role: 'user', content: 'What is the capital of {{?country}}?' }],
  response_format: {
    type: 'json_schema',
    json_schema: {
      name: 'capital_response',
      strict: true,
      schema: {
        type: 'object',
        properties: {
          country_name: {
            type: 'string',
            description: 'The name of the country provided by the user.'
          },
          capital: {
            type: 'string',
            description: 'The capital city of the country.'
          }
        },
        required: ['country_name', 'capital']
      }
    }
  }
};
```

You can also initialize `json_schema` using a Zod schema, as shown below:

```ts
const countryCapitalSchema = z
  .object({
    country_name: z.string(),
    capital: z.string()
  })
  .strict();

const response_format: ResponseFormatJsonSchema = {
  type: 'json_schema',
  json_schema: {
    name: 'capital_response',
    strict: true,
    schema: zodToJsonSchema(countryCapitalSchema)
  }
};
```

### Prompt Registry

Alternatively, prepared templates from the [Prompt Registry](https://help.sap.com/docs/sap-ai-core/sap-ai-core-service-guide/prompt-registry) of SAP AI Core can be used instead of passing a template in the request.

```ts
const orchestrationClient = new OrchestrationClient({
  llm,
  templating: {
    template_ref: {
      name: 'get-capital',
      scenario: 'e2e-test',
      version: '0.0.1'
    }
  }
});

return orchestrationClient.chatCompletion({
  inputParams: { input: 'France' }
});
```

A prompt template can be referenced either by ID, or by using a combination of name, scenario, and version.
For details on storing a template in the Prompt Registry, refer to [this guide](https://help.sap.com/docs/sap-ai-core/sap-ai-core-service-guide/create-prompt-template-imperative).

#### Passing a Message History

It is possible to provide a history of a conversation to the model.
Use the following snippet to send a chat completion request with history and a system message:

```ts
const orchestrationClient = new OrchestrationClient({
  llm: {
    model_name: 'gpt-4o',
    model_params: { max_tokens: 50, temperature: 0.1 }
  },
  templating: {
    template: [{ role: 'user', content: 'What is my name?' }]
  }
});

const response = await orchestrationClient.chatCompletion({
  messagesHistory: [
    {
      role: 'system',
      content:
        'You are a helpful assistant who remembers all details the user shares with you.'
    },
    {
      role: 'user',
      content: 'Hi! Im Bob'
    },
    {
      role: 'assistant',
      content:
        "Hi Bob, nice to meet you! I'm an AI assistant. I'll remember that your name is Bob as we continue our conversation."
    }
  ]
});
const responseContent = response.getContent();
```

#### Image Recognition

Many models in the orchestration service have image recognition capabilities, meaning the models can take images and answer questions about them.

> [!Warning]
> The `image_url` content type can only be used in messages with `role: 'user'`.
> Attempting to use `image_url` in non-user messages will result in an error.

```ts
const orchestrationClient = new OrchestrationClient({
  llm: {
    model_name: 'gpt-4o'
  },
  templating: {
    template: [
      {
        role: 'user', // image_url content type is only supported in user messages
        content: [
          {
            type: 'text',
            text: 'What is the content of the image?'
          },
          {
            type: 'image_url',
            image_url: {
              url: '{{?imageUrl}}'
            }
          }
        ]
      }
    ]
  }
});

const response = await orchestrationClient.chatCompletion({
  inputParams: {
    imageUrl: 'IMAGE_URL'
  }
});
```

`IMAGE_URL` can either be a public URL or a base64 encoded image, e.g., `data:image/jpeg;base64,...`.
The model can take multiple images.
It will process each image and use the information from all of them to answer the question.

### Content Filtering

Use the orchestration client with filtering to restrict content that is passed to and received from a generative AI model.

This feature allows filtering both the [input](https://help.sap.com/docs/sap-ai-core/sap-ai-core-service-guide/input-filtering) and [output](https://help.sap.com/docs/sap-ai-core/sap-ai-core-service-guide/output-filtering) of a model based on content safety criteria.

The following example demonstrates how to use content filtering with the orchestration client.
See the sections below for details on the available content filters and how to build them.

```ts
const llm: LlmModuleConfig = {
  model_name: 'gpt-4o',
  model_params: { max_tokens: 50, temperature: 0.1 }
};
const templating: TemplatingModuleConfig = {
  template: [{ role: 'user', content: '{{?input}}' }]
};

const filter: FilterConfig = ... // Use a build function to create a content filter

const orchestrationClient = new OrchestrationClient({
  llm,
  templating,
  filtering: {
    input: {
      filters: [filter] // Multiple filters can be applied
    },
    output: {
      filters: [filter]
    }
  }
});

try {
  const response = await orchestrationClient.chatCompletion({
    inputParams: { input: 'I hate you!' }
  });
  console.log(response.getContent());
} catch (error: any) {
  console.error(error.message);
  console.error(error.cause?.response?.data);
}
```

Multiple filters can be applied at the same time for both input and output filtering.

> [!Note]
> The `chatCompletion()` method can throw an error with HTTP status code `400` if content filters hit.
> In case of a `200` HTTP response, the `getContent()` method can throw an error if the output filters hit.
> See the [error handling](#error-handling) section for more details.

#### Azure Content Filter

Use `buildAzureContentSafetyFilter()` function to build an Azure content filter.
Each category of the filter can be assigned a specific severity level, which corresponds to an Azure threshold value.

| Severity Level          | Azure Threshold Value |
| ----------------------- | --------------------- |
| `ALLOW_SAFE`            | 0                     |
| `ALLOW_SAFE_LOW`        | 2                     |
| `ALLOW_SAFE_LOW_MEDIUM` | 4                     |
| `ALLOW_ALL`             | 6                     |

```ts
const filter = buildAzureContentSafetyFilter({
  Hate: 'ALLOW_SAFE_LOW',
  Violence: 'ALLOW_SAFE_LOW_MEDIUM'
});
```

#### Llama Guard Filter

Use `buildLlamaGuardFilter()` function to build a Llama Guard content filter.

Available categories can be found with autocompletion.
Pass the categories as arguments to the function to enable them.

```ts
const filter: FilterConfig = buildLlamaGuardFilter('hate', 'violent_crimes');
```

### Data Masking

Use the orchestration client with masking to mask sensitive information in the prompt while preserving necessary context for the generative AI model.

The following example demonstrates how to use data masking with the orchestration client.
See the sections below for details on the available masking providers and how to build them.

```ts
const llm: LlmModuleConfig = {
  model_name: 'gpt-4o',
  model_params: { max_tokens: 50, temperature: 0.1 }
};
const templating: TemplatingModuleConfig = {
  template: [
    {
      role: 'user',
      content:
        'Please write an email to {{?user}} ({{?email}}), informing them about the amazing capabilities of generative AI! Be brief and concise, write at most 6 sentences.'
    }
  ]
};

const maskingProvider: MaskingProviderConfig = ... // Use a build function to create a masking provider

const orchestrationClient = new OrchestrationClient({
  llm,
  templating,
  masking: {
    masking_providers: [maskingProvider] // Multiple masking providers can be applied
  }
});

const response = await orchestrationClient.chatCompletion({
  inputParams: { user: 'Alice Anderson', email: 'alice.anderson@sap.com' }
});
return response.getContent();
```

#### SAP Data Privacy Integration

Orchestration service offers a masking provider SAP Data Privacy Integration (DPI) to anonymize or pseudonomize sensitive information.
Use `buildDpiMaskingProvider()` function to build a DPI masking provider.

```ts
const maskingProvider: MaskingProviderConfig = buildDpiMaskingProvider({
  method: 'annonymization',
  entities: [{ type: 'profile-email' }, { type: 'profile-person' }],
  allowlist: ['SAP']
});
```

The `allowlist` property specifies terms will be kept unmasked.
Set `mask_grounding_input` to `true` to mask grounding input as well.
For more information about groundings, refer to the [grounding](#grounding) section.

### Grounding

Grounding enables integrating external, contextually relevant, domain-specific, or real-time data into AI processes.
The grounding configuration can be provided as a raw JSON object or by using the `buildDocumentGroundingConfig()` function, which requires only the minimal mandatory values.

```ts
const orchestrationClient = new OrchestrationClient({
  llm: {
    model_name: 'gpt-35-turbo'
  },
  templating: {
    template: [
      {
        role: 'user',
        content:
          'UserQuestion: {{?groundingRequest}} Context: {{?groundingOutput}}'
      }
    ],
    defaults: {}
  },
  grounding: buildDocumentGroundingConfig({
    input_params: ['groundingRequest'],
    output_param: 'groundingOutput',
    // metadata_params: ['PARAM_NAME']
    filters: [
      {
        id: 'FILTER_ID',
        // data_repository_type: 'vector', // optional, default value is 'vector'
        data_repositories: ['REPOSITORY_ID']
      }
    ]
  })
});

const response = await orchestrationClient.chatCompletion({
  inputParams: {
    groundingRequest: 'Give me a short introduction of SAP AI Core.'
  }
});
return response.getContent();
```

By default, the optional filter property `data_repository_type` is set to `vector`.
Set it to `help.sap.com` to retrieve context from the SAP Help Portal.
Set `metadata_params` property with an array of parameter names to include [metadata](https://help.sap.com/docs/sap-ai-core/sap-ai-core-service-guide/metadata) in the grounding result, which can be used in the prompt.
Set `data_repositories` property with an array of repository IDs to search in specific data repositories.
Skip this property to search in all available data repositories.

### Using a JSON Configuration from AI Launchpad

If you already have an orchestration workflow created in AI Launchpad, you can either download the configuration as a JSON file or copy the JSON string directly to use it with the orchestration client.

```ts
const jsonConfig = await fs.promises.readFile(
  'path/to/orchestration-config.json',
  'utf-8'
);
// Alternatively, you can provide the JSON configuration as a plain string in the code directly.
// const jsonConfig = 'YOUR_JSON_CONFIG'

const response = await new OrchestrationClient(jsonConfig).chatCompletion();

return response;
```

### Streaming

The `OrchestrationClient` supports streaming responses for chat completion requests based on the [Server-sent events](https://html.spec.whatwg.org/multipage/server-sent-events.html#server-sent-events) standard.

Use the `stream()` method to receive a stream of chunk responses from the model.
After consuming the stream, call the helper methods to get the finish reason and token usage information.

```ts
const orchestrationClient = new OrchestrationClient({
  llm: {
    model_name: 'gpt-4o',
    model_params: { max_tokens: 50, temperature: 0.1 }
  },
  templating: {
    template: [
      { role: 'user', content: 'Give a long history of {{?country}}?' }
    ]
  }
});

const response = await orchestrationClient.stream({
  inputParams: { country: 'France' }
});

for await (const chunk of response.stream) {
  console.log(JSON.stringify(chunk));
}

const finishReason = response.getFinishReason();
const tokenUsage = response.getTokenUsage();

console.log(`Finish reason: ${finishReason}\n`);
console.log(`Token usage: ${JSON.stringify(tokenUsage)}\n`);
```

#### Streaming the Delta Content

The client provides a helper method to extract the text chunks as strings:

```ts
for await (const chunk of response.stream.toContentStream()) {
  console.log(chunk); // will log the delta content
}
```

Each chunk will be a string containing the delta content.

#### Streaming with Abort Controller

Streaming request can be aborted using the `AbortController` API.
In case of an error, the SAP Cloud SDK for AI will automatically close the stream.
Additionally, it can be aborted manually by calling the `stream()` method with an `AbortController` object.

```ts
const orchestrationClient = new OrchestrationClient({
  llm: {
    model_name: 'gpt-4o',
    model_params: { max_tokens: 50, temperature: 0.1 }
  },
  templating: {
    template: [
      { role: 'user', content: 'Give a long history of {{?country}}?' }
    ]
  }
});

const controller = new AbortController();
const response = await orchestrationClient.stream(
  {
    inputParams: { country: 'France' }
  },
  controller
);

// Abort the streaming request after one second
setTimeout(() => {
  controller.abort();
}, 1000);

for await (const chunk of response.stream) {
  console.log(JSON.stringify(chunk));
}
```

In this example, streaming request will be aborted after one second.
Abort controller can be useful, e.g., when end-user wants to stop the stream or refreshes the page.

#### Stream Options

The orchestration service offers multiple streaming options, which you can configure in addition to the LLM's streaming options.
These include options like definining the maximum number of characters per chunk or modifying the output filter behavior.
There are two ways to add specific streaming options to your client, either at initialization of orchestration client, or when calling the stream API.

Setting streaming options dynamically could be useful if an initialized orchestration client will also be used for streaming.

You can check the list of available stream options in the [orchestration service's documentation](https://help.sap.com/docs/sap-ai-core/sap-ai-core-service-guide/streaming).

An example for setting the streaming options when calling the stream API looks like the following:

```ts
const response = orchestrationClient.stream(
  {
    inputParams: { country: 'France' }
  },
  controller,
  {
    llm: { include_usage: false },
    global: { chunk_size: 10 },
    outputFiltering: { overlap: 200 }
  }
);
```

Usage metrics are collected by default, if you do not want to receive them, set `include_usage` to `false`.
If you don't want any streaming options as part of your call to the LLM, set `streamOptions.llm` to `null`.

> [!NOTE]
> When initalizing a client with a JSON module config, providing streaming options is not possible.

### Using a Custom Resource Group

Using a custom [resource group](https://help.sap.com/docs/sap-ai-core/sap-ai-core-service-guide/resource-groups) requires a deployment of Orchestration within that resource group.
Refer to [this guide](https://help.sap.com/docs/sap-ai-core/sap-ai-core-service-guide/create-deployment-for-orchestration) for creating such a deployment.

You can pass a custom resource group when creating a client as follows:

```ts
const orchestrationClient = new OrchestrationClient(
  {
    llm: {
      model_name: 'gpt-4p',
      model_params: { max_tokens: 50, temperature: 0.1 }
    },
    templating: {
      template: [{ role: 'user', content: 'What is my name?' }]
    }
  },
  { resourceGroup: 'rg1234' }
);
```

### Custom Request Configuration

Set custom request configuration in the `requestConfig` parameter when calling the `chatCompletion()` method.

```ts
const response = await orchestrationClient.chatCompletion(
  {
    ...
  },
  {
    headers: {
      'x-custom-header': 'custom-value'
      // Add more headers here
    },
    params: {
      // Add more parameters here
    }
    // Add more request configuration here
  }
);
```

### Custom Destination

When initializing the `OrchestrationClient` client, it is possible to provide a custom destination.
For example, when targeting a destination with the name `my-destination`, the following code can be used:

```ts
const orchestrationClient = new OrchestrationClient(
  {
    llm,
    templating
  },
  {
    resourceGroup: 'default'
  },
  {
    destinationName: 'my-destination'
  }
);
```

By default, the fetched destination is cached.
To disable caching, set the `useCache` parameter to `false` together with the `destinationName` parameter.

## Error Handling

For error handling instructions, refer to this [section](https://github.com/SAP/ai-sdk-js/blob/main/README.md#error-handling).

## Local Testing

For local testing instructions, refer to this [section](https://github.com/SAP/ai-sdk-js/blob/main/README.md#local-testing).

## Support, Feedback, Contribution

Contribution and feedback are encouraged and always welcome.
For more information about how to contribute, the project structure, as well as additional contribution information, see our [Contribution Guidelines](https://github.com/SAP/ai-sdk-js/blob/main/CONTRIBUTING.md).

## License

The SAP Cloud SDK for AI is released under the [Apache License Version 2.0](http://www.apache.org/licenses/).
