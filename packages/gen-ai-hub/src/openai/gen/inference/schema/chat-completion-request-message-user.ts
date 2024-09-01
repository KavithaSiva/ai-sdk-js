/*
 * Copyright (c) 2024 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import type { OpenAiChatCompletionRequestMessage } from './chat-completion-request-message.js';
import type { OpenAiChatCompletionRequestMessageContentPart } from './chat-completion-request-message-content-part.js';
/**
 * Representation of the 'OpenAiChatCompletionRequestMessageUser' schema.
 */
export type OpenAiChatCompletionRequestMessageUser =
  OpenAiChatCompletionRequestMessage & {
    content: string | OpenAiChatCompletionRequestMessageContentPart[];
  } & Record<string, any>;
