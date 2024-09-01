/*
 * Copyright (c) 2024 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import type { OpenAiInnerErrorCode } from './inner-error-code.js';
import type { OpenAiContentFilterPromptResults } from './content-filter-prompt-results.js';
/**
 * Inner error with additional details.
 */
export type OpenAiInnerError = {
  code?: OpenAiInnerErrorCode;
  content_filter_results?: OpenAiContentFilterPromptResults;
} & Record<string, any>;
