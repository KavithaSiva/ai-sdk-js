/*
 * Copyright (c) 2024 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import type { OpenAiContentFilterResultsBase } from './content-filter-results-base.js';
import type { OpenAiContentFilterDetectedResult } from './content-filter-detected-result.js';
import type { OpenAiContentFilterDetectedWithCitationResult } from './content-filter-detected-with-citation-result.js';
/**
 * Information about the content filtering category (hate, sexual, violence, self_harm), if it has been detected, as well as the severity level (very_low, low, medium, high-scale that determines the intensity and risk level of harmful content) and if it has been filtered or not. Information about third party text and profanity, if it has been detected, and if it has been filtered or not. And information about customer block list, if it has been filtered and its id.
 */
export type OpenAiContentFilterChoiceResults =
  OpenAiContentFilterResultsBase & {
    protected_material_text?: OpenAiContentFilterDetectedResult;
  } & Record<string, any> & {
      protected_material_code?: OpenAiContentFilterDetectedWithCitationResult;
    } & Record<string, any>;
