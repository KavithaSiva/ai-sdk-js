/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import type { QueryOption1 } from './query-option-1.js';
/**
 * Representation of the 'SAPDocumentTranslationInput' schema.
 */
export type SAPDocumentTranslationInput = {
  /**
   * Type of document translation provider
   * @example "sap_document_translation"
   */
  type: 'sap_document_translation';
  config: {
    /**
     * Language of the text to be translated.
     * @example "de-DE"
     */
    source_language?: string;
    apply_to?: QueryOption1[];
    /**
     * Language to which the text should be translated.
     * @example "en-US"
     */
    target_language: string;
  };
};
