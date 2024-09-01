/*
 * Copyright (c) 2024 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import type { OpenAiOnYourDataAuthenticationOptions } from './on-your-data-authentication-options.js';
/**
 * The authentication options for Azure OpenAI On Your Data when using an API key.
 */
export type OpenAiOnYourDataApiKeyAuthenticationOptions =
  OpenAiOnYourDataAuthenticationOptions & {
    /**
     * The API key to use for authentication.
     */
    key: string;
  } & Record<string, any>;
