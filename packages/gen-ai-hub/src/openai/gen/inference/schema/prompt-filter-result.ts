/*
 * Copyright (c) 2024 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import type { OpenAiContentFilterPromptResults } from './content-filter-prompt-results.js';
/**
 * Content filtering results for a single prompt in the request.
 */
export type OpenAiPromptFilterResult = {
  prompt_index?: number;
  content_filter_results?: OpenAiContentFilterPromptResults;
} & Record<string, any>;
