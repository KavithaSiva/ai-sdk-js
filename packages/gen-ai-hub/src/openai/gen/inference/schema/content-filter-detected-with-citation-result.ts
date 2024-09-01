/*
 * Copyright (c) 2024 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import type { OpenAiContentFilterDetectedResult } from './content-filter-detected-result.js';
/**
 * Representation of the 'OpenAiContentFilterDetectedWithCitationResult' schema.
 */
export type OpenAiContentFilterDetectedWithCitationResult =
  OpenAiContentFilterDetectedResult & {
    citation?: {
      URL?: string;
      license?: string;
    } & Record<string, any>;
  } & Record<string, any>;
