import {
  AzureOpenAiChatClient,
  AzureOpenAiEmbeddingClient
} from '@sap-ai-sdk/foundation-models';
import { createLogger } from '@sap-cloud-sdk/util';
import type {
  AzureOpenAiChatCompletionResponse,
  AzureOpenAiEmbeddingResponse,
  AzureOpenAiChatCompletionStreamResponse,
  AzureOpenAiChatCompletionStreamChunkResponse
} from '@sap-ai-sdk/foundation-models';

const logger = createLogger({
  package: 'sample-code',
  messageContext: 'foundation-models-azure-openai'
});

/**
 * Ask Azure OpenAI model about the capital of France.
 * @returns The response from Azure OpenAI containing the response content.
 */
export async function chatCompletion(): Promise<AzureOpenAiChatCompletionResponse> {
  const response = await new AzureOpenAiChatClient('gpt-4o').run({
    messages: [{ role: 'user', content: 'What is the capital of France?' }]
  });

  // Use getContent() to access the content responded by LLM.
  logger.info(response.getContent());

  return response;
}

/**
 * Ask Azure OpenAI model about SAP Cloud SDK with streaming.
 * @param controller - The abort controller.
 * @returns The response from Azure OpenAI containing the response content.
 */
export async function chatCompletionStream(
  controller: AbortController
): Promise<
  AzureOpenAiChatCompletionStreamResponse<AzureOpenAiChatCompletionStreamChunkResponse>
> {
  const response = await new AzureOpenAiChatClient('gpt-4o').stream(
    {
      messages: [
        {
          role: 'user',
          content: 'Give me a short introduction of SAP Cloud SDK.'
        }
      ]
    },
    controller
  );
  return response;
}

/**
 * Embed 'Hello, world!' using the OpenAI ADA model.
 * @returns The response from Azure OpenAI containing the embedding vector.
 */
export async function computeEmbedding(): Promise<AzureOpenAiEmbeddingResponse> {
  const response = await new AzureOpenAiEmbeddingClient(
    'text-embedding-3-small'
  ).run({
    input: 'Hello, world!'
  });

  // Use getEmbedding to access the embedding vector
  logger.info(response.getEmbedding());

  return response;
}

/**
 * Use custom destination to ask Azure OpenAI model about the capital of France.
 * @returns The response from Azure OpenAI containing the response content.
 */
export async function chatCompletionWithDestination(): Promise<AzureOpenAiChatCompletionResponse> {
  const response = await new AzureOpenAiChatClient('gpt-4o', {
    destinationName: 'e2e-aicore'
  }).run({
    messages: [{ role: 'user', content: 'What is the capital of France?' }]
  });

  // Use getContent() to access the content responded by LLM.
  logger.info(response.getContent());

  return response;
}
