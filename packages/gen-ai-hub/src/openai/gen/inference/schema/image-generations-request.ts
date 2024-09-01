/*
 * Copyright (c) 2024 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import type { OpenAiImageSize } from './image-size.js';
import type { OpenAiImagesResponseFormat } from './images-response-format.js';
import type { OpenAiImageQuality } from './image-quality.js';
import type { OpenAiImageStyle } from './image-style.js';
/**
 * Representation of the 'OpenAiImageGenerationsRequest' schema.
 */
export type OpenAiImageGenerationsRequest = {
  /**
   * A text description of the desired image(s). The maximum length is 4000 characters.
   * @example "a corgi in a field"
   * Format: "string".
   * Min Length: 1.
   */
  prompt: string;
  /**
   * The number of images to generate.
   * Default: 1.
   * Maximum: 1.
   * Minimum: 1.
   */
  n?: number;
  size?: OpenAiImageSize;
  response_format?: OpenAiImagesResponseFormat;
  /**
   * A unique identifier representing your end-user, which can help to monitor and detect abuse.
   * @example "user123456"
   * Format: "string".
   */
  user?: string;
  quality?: OpenAiImageQuality;
  style?: OpenAiImageStyle;
} & Record<string, any>;
