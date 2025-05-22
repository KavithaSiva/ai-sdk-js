import { AIMessage } from '@langchain/core/messages';
import type { ChatResult } from '@langchain/core/outputs';
import type {
  ChatMessage,
  CompletionPostResponse,
  SystemChatMessage,
  Template,
  TemplatingModuleConfig,
  ToolChatMessage,
  UserChatMessage,
  UserChatMessageContentItem
} from '@sap-ai-sdk/orchestration';
import type { ToolCall } from '@langchain/core/messages/tool';
import type { AzureOpenAiChatCompletionMessageToolCalls } from '@sap-ai-sdk/foundation-models';
import type {
  BaseMessage,
  FunctionMessage,
  HumanMessage,
  SystemMessage,
  ToolMessage
} from '@langchain/core/messages';

/**
 * Checks if the object is a {@link Template}.
 * @param object - The object to check.
 * @returns True if the object is a {@link Template}.
 * @internal
 */
export function isTemplate(object: TemplatingModuleConfig): object is Template {
  return 'template' in object;
}

/**
 * Maps {@link BaseMessage} to {@link ChatMessage}.
 * @param message - The message to map.
 * @returns The {@link ChatMessage}.
 */
// TODO: Add mapping of refusal property, once LangChain base class supports it natively.
function mapBaseMessageToChatMessage(message: BaseMessage): ChatMessage {
  switch (message.getType()) {
    case 'ai':
      return mapAiMessageToChatMessage(message);
    case 'human':
      return mapHumanMessageToUserChatMessage(message);
    case 'system':
      return mapSystemMessageToSystemChatMessage(message);
    // TODO: As soon as tool messages are supported by orchestration, create mapping function similar to our azure mapping function.
    case 'function':
      return mapFunctionMessageToToolChatMessage(message);
    case 'tool':
      return mapToolMessageToToolChatMessage(message);
    default:
      throw new Error(`Unsupported message type: ${message.getType()}`);
  }
}

/**
 * Maps LangChain's {@link AIMessage} to Azure OpenAI's {@link AzureOpenAiChatCompletionRequestAssistantMessage}.
 * @param message - The {@link AIMessage} to map.
 * @returns The Azure OpenAI {@link AzureOpenAiChatCompletionRequestAssistantMessage}.
 */
function mapAiMessageToChatMessage(
  message: AIMessage
): ChatMessage {
  /* TODO: Tool calls are currently bugged in orchestration, pass these fields as soon as orchestration supports it.
  const tool_calls =
    mapLangchainToolCallToAzureOpenAiToolCall(message.tool_calls) ??
    message.additional_kwargs.tool_calls;
  */
  return {
    /* TODO: Tool calls are currently bugged in orchestration, pass these fields as soon as orchestration supports it.
    ...(tool_calls?.length ? { tool_calls } : {}),
    function_call: message.additional_kwargs.function_call,
    */
    content: message.content,
    role: 'assistant'
  } as ChatMessage;
}

function mapFunctionMessageToToolChatMessage(message: FunctionMessage): ToolChatMessage {
  return {
    role: 'tool',
    content: message.content
  } as ToolChatMessage;
}

function mapToolMessageToToolChatMessage(message: ToolMessage): ToolChatMessage {
  return {
    role: 'tool',
    content: message.content
  } as ToolChatMessage;
}

function mapHumanMessageToUserChatMessage(message: HumanMessage): UserChatMessage {
  let content = message.content;
  if (typeof message.content === 'object') {
    content = [...message.content].map(item => {
      if (item.type === 'image_url') {
        const mappedItem = { ...item };
        if (typeof item.image_url === 'object') {
          mappedItem.image_url = {
            url: item.image_url.url
          };
        }
        return mappedItem as UserChatMessageContentItem;
      }
      return item;
    }
  );
  }
  return {
    role: 'user',
    content
  } as UserChatMessage;
}

function mapSystemMessageToSystemChatMessage(
  message: SystemMessage
): SystemChatMessage {
  // TODO: Remove as soon as image_url is a supported input for system messages in orchestration.
  if (
    typeof message.content !== 'string' &&
    message.content.some(content => content.type === 'image_url')
  ) {
    throw new Error(
      'System messages with image URLs are not supported by the Orchestration Client.'
    );
  }
  return {
    role: 'system',
    content: message.content
  } as SystemChatMessage;
}

/**
 * Maps LangChain messages to orchestration messages.
 * @param messages - The LangChain messages to map.
 * @returns The orchestration messages mapped from LangChain messages.
 * @internal
 */
export function mapLangchainMessagesToOrchestrationMessages(
  messages: BaseMessage[]
): ChatMessage[] {
  return messages.map(mapBaseMessageToChatMessage);
}

/**
 * Maps {@link AzureOpenAiChatCompletionMessageToolCalls} to LangChain's {@link ToolCall}.
 * @param toolCalls - The {@link AzureOpenAiChatCompletionMessageToolCalls} response.
 * @returns The LangChain {@link ToolCall}.
 */
function mapAzureOpenAiToLangchainToolCall(
  toolCalls?: AzureOpenAiChatCompletionMessageToolCalls
): ToolCall[] | undefined {
  if (toolCalls) {
    return toolCalls.map(toolCall => ({
      id: toolCall.id,
      name: toolCall.function.name,
      args: JSON.parse(toolCall.function.arguments),
      type: 'tool_call'
    }));
  }
}

/**
 * Maps the completion response to a {@link ChatResult}.
 * @param completionResponse - The completion response to map.
 * @returns The mapped {@link ChatResult}.
 * @internal
 */
export function mapOutputToChatResult(
  completionResponse: CompletionPostResponse
): ChatResult {
  const { orchestration_result, module_results, request_id } =
    completionResponse;
  const { choices, created, id, model, object, usage, system_fingerprint } =
    orchestration_result;
  return {
    generations: choices.map(choice => ({
      text: choice.message.content ?? '',
      message: new AIMessage({
        content: choice.message.content ?? '',
        tool_calls: mapAzureOpenAiToLangchainToolCall(
          choice.message.tool_calls
        ),
        additional_kwargs: {
          finish_reason: choice.finish_reason,
          index: choice.index,
          function_call: choice.message.function_call,
          tool_calls: choice.message.tool_calls,
          module_results,
          request_id
        }
      }),
      generationInfo: {
        finish_reason: choice.finish_reason,
        index: choice.index,
        function_call: choice.message.function_call,
        tool_calls: choice.message.tool_calls
      }
    })),
    llmOutput: {
      created,
      id,
      model,
      object,
      system_fingerprint,
      tokenUsage: {
        completionTokens: usage?.completion_tokens ?? 0,
        promptTokens: usage?.prompt_tokens ?? 0,
        totalTokens: usage?.total_tokens ?? 0
      }
    }
  };
}
