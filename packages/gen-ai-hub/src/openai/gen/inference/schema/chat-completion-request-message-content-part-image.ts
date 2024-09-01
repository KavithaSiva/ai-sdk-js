/*
 * Copyright (c) 2024 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import type { OpenAiChatCompletionRequestMessageContentPart } from './chat-completion-request-message-content-part.js';
import type { OpenAiImageDetailLevel } from './image-detail-level.js';
/**
 * Representation of the 'OpenAiChatCompletionRequestMessageContentPartImage' schema.
 */
export type OpenAiChatCompletionRequestMessageContentPartImage =
  OpenAiChatCompletionRequestMessageContentPart & {
    /**
     * Either a URL of the image or the base64 encoded image data.
     * Format: "uri".
     */
    url: string;
    detail?: OpenAiImageDetailLevel;
  } & Record<string, any>;
