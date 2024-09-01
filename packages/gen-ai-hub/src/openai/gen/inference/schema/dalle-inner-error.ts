/*
 * Copyright (c) 2024 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import type { OpenAiInnerErrorCode } from './inner-error-code.js';
import type { OpenAiDalleFilterResults } from './dalle-filter-results.js';
/**
 * Inner error with additional details.
 */
export type OpenAiDalleInnerError = {
  code?: OpenAiInnerErrorCode;
  content_filter_results?: OpenAiDalleFilterResults;
  /**
   * The prompt that was used to generate the image, if there was any revision to the prompt.
   */
  revised_prompt?: string;
} & Record<string, any>;
