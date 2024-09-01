/*
 * Copyright (c) 2024 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import type { OpenAiAudioResponse } from './audio-response.js';
import type { OpenAiAudioSegment } from './audio-segment.js';
/**
 * Translation or transcription response when response_format was verbose_json
 */
export type OpenAiAudioVerboseResponse = OpenAiAudioResponse & {
  /**
   * Type of audio task.
   */
  task?: 'transcribe' | 'translate';
  /**
   * Language.
   */
  language?: string;
  /**
   * Duration.
   */
  duration?: number;
  segments?: OpenAiAudioSegment[];
} & Record<string, any>;
