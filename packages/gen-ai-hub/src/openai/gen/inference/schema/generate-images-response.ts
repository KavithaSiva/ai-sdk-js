/*
 * Copyright (c) 2024 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import type { OpenAiImageResult } from './image-result.js';
/**
 * Representation of the 'OpenAiGenerateImagesResponse' schema.
 */
export type OpenAiGenerateImagesResponse = {
  /**
   * The unix timestamp when the operation was created.
   * @example "1676540381"
   * Format: "unixtime".
   */
  created: number;
  /**
   * The result data of the operation, if successful
   */
  data: OpenAiImageResult[];
} & Record<string, any>;
