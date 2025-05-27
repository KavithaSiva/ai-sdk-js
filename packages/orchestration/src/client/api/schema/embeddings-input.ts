/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import type { EmbeddingsInputText } from './embeddings-input-text.js';
/**
 * Representation of the 'EmbeddingsInput' schema.
 */
export type EmbeddingsInput = {
  text: EmbeddingsInputText;
  type?:
    | 'text'
    | 'document'
    | 'query'
    | 'RETRIEVAL_QUERY'
    | 'RETRIEVAL_DOCUMENT'
    | 'SEMANTIC_SIMILARITY'
    | 'CLASSIFICATION'
    | 'CLUSTERING'
    | 'QUESTION_ANSWERING'
    | 'FACT_VERIFICATION'
    | 'CODE_RETRIEVAL_QUERY';
};
