/*
 * Copyright (c) 2024 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import type { OpenAiChatCompletionRequestMessage } from './chat-completion-request-message.js';
/**
 * Representation of the 'OpenAiChatCompletionRequestMessageSystem' schema.
 */
export type OpenAiChatCompletionRequestMessageSystem =
  OpenAiChatCompletionRequestMessage & {
    /**
     * The contents of the message.
     */
    content: string;
  } & Record<string, any>;
