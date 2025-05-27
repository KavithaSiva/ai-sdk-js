/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import type { EmbeddingsModuleResults } from './embeddings-module-results.js';
import type { EmbeddingsResponse } from './embeddings-response.js';
/**
 * Representation of the 'EmbeddingsPostResponse' schema.
 */
export type EmbeddingsPostResponse = {
  request_id: string;
  module_results?: EmbeddingsModuleResults;
  orchestration_result?: EmbeddingsResponse;
};
