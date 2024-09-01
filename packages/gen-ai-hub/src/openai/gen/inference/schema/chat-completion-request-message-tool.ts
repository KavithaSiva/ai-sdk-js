/*
 * Copyright (c) 2024 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import type { OpenAiChatCompletionRequestMessage } from './chat-completion-request-message.js';
/**
 * Representation of the 'OpenAiChatCompletionRequestMessageTool' schema.
 */
export type OpenAiChatCompletionRequestMessageTool =
  OpenAiChatCompletionRequestMessage & {
    /**
     * Tool call that this message is responding to.
     */
    tool_call_id: string;
    /**
     * The contents of the message.
     */
    content: string;
  } & Record<string, any>;
