/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import type { DetailsErrorResponse } from './details-error-response.js';
/**
 * Representation of the 'ApiError' schema.
 */
export type ApiError = {
  /**
   * Descriptive error code (not http status code).
   */
  code: string;
  /**
   * plaintext error description
   */
  message: string;
  /**
   * id of individual request
   */
  requestId?: string;
  /**
   * url that has been called
   */
  target?: string;
  details?: DetailsErrorResponse[];
} & Record<string, any>;
