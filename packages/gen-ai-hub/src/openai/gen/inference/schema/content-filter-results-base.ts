/*
 * Copyright (c) 2024 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import type { OpenAiContentFilterSeverityResult } from './content-filter-severity-result.js';
import type { OpenAiContentFilterDetectedResult } from './content-filter-detected-result.js';
import type { OpenAiErrorBase } from './error-base.js';
/**
 * Information about the content filtering results.
 */
export type OpenAiContentFilterResultsBase = {
  sexual?: OpenAiContentFilterSeverityResult;
  violence?: OpenAiContentFilterSeverityResult;
  hate?: OpenAiContentFilterSeverityResult;
  self_harm?: OpenAiContentFilterSeverityResult;
  profanity?: OpenAiContentFilterDetectedResult;
  error?: OpenAiErrorBase;
} & Record<string, any>;
