/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { OpenApiRequestBuilder } from '@sap-ai-sdk/core';
import type { DSetFileCreationResponse } from './schema/index.js';
/**
 * Representation of the 'FileApi'.
 * This API is part of the 'AI_CORE_API' service.
 */
export const FileApi = {
  _defaultBasePath: undefined,
  /**
   * Endpoint for downloading file. The path must point to an individual file.
   * @param path - path relative to the object store root URL in the secret
   * @param headerParameters - Object containing the following keys: AI-Resource-Group.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  fileDownload: (
    path: string,
    headerParameters?: { 'AI-Resource-Group'?: string }
  ) =>
    new OpenApiRequestBuilder<string>(
      'get',
      '/lm/dataset/files/{path}',
      {
        pathParameters: { path },
        headerParameters
      },
      FileApi._defaultBasePath
    ),
  /**
   * Endpoint for uploading file. The maximum file size depends on the actual implementation
   * but must not exceed 100MB. The actual file size limit can be obtained by querying
   * the AI API Runtime Capabilities Endpoint and checking the limits in the section of the `fileUpload` extension.
   *
   *  Path cannot be a prefix, it must be a path to an object.
   * Clients may group the objects in any manner they choose by specifying path prefixes.
   *
   * Allowed mime-types will be decided by the implementation.
   * Content-Type header can be set to "application/octet-stream" but the implementation is responsible
   * for detecting the actual mime type and checking against the allowed list of mime types.
   * For security reasons, implementations cannot trust the mime type sent by the client.
   *
   * Example URLs:
   * /files/dar/schemas/schema.json
   * /files/icr/datasets/training/20201001/20201001-01.csv
   * /files/icr/datasets/training/20201001/20201001-02.csv
   * /files/mask-detection/training/mask-detection-20210301.tar.gz
   * @param path - path relative to the object store root URL in the secret
   * @param body - Body of the file upload request
   * @param queryParameters - Object containing the following keys: overwrite.
   * @param headerParameters - Object containing the following keys: AI-Resource-Group.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  fileUpload: (
    path: string,
    body: any | undefined,
    queryParameters?: { overwrite?: boolean },
    headerParameters?: { 'AI-Resource-Group'?: string }
  ) =>
    new OpenApiRequestBuilder<DSetFileCreationResponse>(
      'put',
      '/lm/dataset/files/{path}',
      {
        pathParameters: { path },
        body,
        queryParameters,
        headerParameters
      },
      FileApi._defaultBasePath
    ),
  /**
   * Delete the file specified by the path parameter.
   * @param path - path relative to the object store root URL in the secret
   * @param headerParameters - Object containing the following keys: AI-Resource-Group.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  fileDelete: (
    path: string,
    headerParameters?: { 'AI-Resource-Group'?: string }
  ) =>
    new OpenApiRequestBuilder<any>(
      'delete',
      '/lm/dataset/files/{path}',
      {
        pathParameters: { path },
        headerParameters
      },
      FileApi._defaultBasePath
    )
};
