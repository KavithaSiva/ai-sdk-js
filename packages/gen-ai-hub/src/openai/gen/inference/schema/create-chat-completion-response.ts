/*
 * Copyright (c) 2024 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import type { OpenAiChatCompletionsResponseCommon } from './chat-completions-response-common.js';
import type { OpenAiPromptFilterResults } from './prompt-filter-results.js';
import type { OpenAiChatCompletionChoiceCommon } from './chat-completion-choice-common.js';
import type { OpenAiChatCompletionResponseMessage } from './chat-completion-response-message.js';
import type { OpenAiContentFilterChoiceResults } from './content-filter-choice-results.js';
import type { OpenAiChatCompletionChoiceLogProbs } from './chat-completion-choice-log-probs.js';
/**
 * Representation of the 'OpenAiCreateChatCompletionResponse' schema.
 */
export type OpenAiCreateChatCompletionResponse =
  OpenAiChatCompletionsResponseCommon & {
    prompt_filter_results?: OpenAiPromptFilterResults;
    choices: (OpenAiChatCompletionChoiceCommon & {
      message?: OpenAiChatCompletionResponseMessage;
      content_filter_results?: OpenAiContentFilterChoiceResults;
      logprobs?: OpenAiChatCompletionChoiceLogProbs;
    } & Record<string, any>)[];
  } & Record<string, any>;
