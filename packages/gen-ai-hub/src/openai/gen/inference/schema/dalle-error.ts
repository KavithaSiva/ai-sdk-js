/*
 * Copyright (c) 2024 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import type { OpenAiErrorBase } from './error-base.js';
import type { OpenAiDalleInnerError } from './dalle-inner-error.js';
/**
 * Representation of the 'OpenAiDalleError' schema.
 */
export type OpenAiDalleError = OpenAiErrorBase & {
  param?: string;
  type?: string;
  inner_error?: OpenAiDalleInnerError;
} & Record<string, any>;
