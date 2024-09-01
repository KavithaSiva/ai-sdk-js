import { expectError, expectType } from 'tsd';
import {
  OpenAiClient,
  OpenAiCreateChatCompletionResponse,
  OpenAiCreateEmbeddingsResponse
} from '@sap-ai-sdk/gen-ai-hub';

const client = new OpenAiClient();
expectType<OpenAiClient>(client);

/**
 * Chat Completion.
 */
expectType<Promise<OpenAiCreateChatCompletionResponse>>(
  client.chatCompletion(
    {
      messages: [{ role: 'user', content: 'test prompt' }]
    },
    'gpt-4'
  )
);

/**
 * Chat Completion response message.
 */
expectType<string | undefined>(
  (await client.chatCompletion(
    {
      messages: [{ role: 'user', content: 'test prompt' }]
    },
    'gpt-4'
  )).choices[0].message?.content
);

/**
 * Embeddings.
 */
expectType<Promise<OpenAiCreateEmbeddingsResponse>>(
  client.embeddings(
    {
      input: 'test input'
    },
    'text-embedding-ada-002'
  )
);

expectError<any>(client.embeddings({ input: 'test input' }, 'gpt-35-turbo'));
