/*
 * Copyright (c) 2024 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import type { OpenAiAzureChatExtensionConfiguration } from './azure-chat-extension-configuration.js';
import type { OpenAiAzureSearchChatExtensionParameters } from './azure-search-chat-extension-parameters.js';
/**
 * A specific representation of configurable options for Azure Search when using it as an Azure OpenAI chat
 * extension.
 */
export type OpenAiAzureSearchChatExtensionConfiguration =
  OpenAiAzureChatExtensionConfiguration & {
    parameters: OpenAiAzureSearchChatExtensionParameters;
  } & Record<string, any>;
