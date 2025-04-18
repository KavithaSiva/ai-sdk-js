/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */

/**
 * Representation of the 'AiExecutableParameter' schema.
 */
export type AiExecutableParameter = {
  /**
   * Name of the executable parameter
   */
  name: string;
  /**
   * Description of the signature argument
   */
  description?: string;
  /**
   * Default value of the signature argument
   */
  default?: string;
  /**
   * Type of the executable parameter
   */
  type?: 'string';
} & Record<string, any>;
