/**
 * Available OpenAI models for chat completion.
 */
export type OpenAiChatModel =
  | 'gpt-4o'
  | 'gpt-4'
  | 'gpt-4-32k'
  | 'gpt-35-turbo'
  | 'gpt-35-turbo-0125'
  | 'gpt-35-turbo-16k';

/**
 * OpenAI embedding models.
 */
export type OpenAiEmbeddingModel =
  | 'text-embedding-ada-002'
  | 'text-embedding-3-small'
  | 'text-embedding-3-large';


/**
 * Representation of the 'OpenAiCreateEmbeddingsRequest' schema.
 */
export type OpenAiCreateEmbeddingsRequest = {
   /**
   * Input text to get embeddings for, encoded as a string. To get embeddings for multiple inputs in a single request, pass an array of strings. Each input must not exceed 2048 tokens in length.
   * Unless you are embedding code, we suggest replacing newlines (\n) in your input with a single space, as we have observed inferior results when newlines are present.
   */
   input: string | string[];
   /**
    * A unique identifier representing your end-user, which can help monitoring and detecting abuse.
    */
   user?: string;
   /**
    * input type of embedding search to use
    * @example "query"
    */
   input_type?: string;
   /**
    * The format to return the embeddings in. Can be either `float` or `base64`. Defaults to `float`.
    * @example "base64"
    */
   encoding_format?: string;
   /**
    * The number of dimensions the resulting output embeddings should have. Only supported in `text-embedding-3` and later models.
    * @example 1
    */
   dimensions?: number;
 } & Record<string, any>;


 /**
 * Representation of the 'OpenAiEmbeddingsResponse' schema.
 */
 export type OpenAiCreateEmbeddingsResponse = {
  object: string;
  model: string;
  data: ({
    index: number;
    object: string;
    embedding: number[];
  } & Record<string, any>)[];
  usage: {
    prompt_tokens: number;
    total_tokens: number;
  } & Record<string, any>;
} & Record<string, any>;
