import {
  MessagingDataPointConfiguration,
  MessagingDataType,
  OutMessage,
  InMessage,
} from "@/models/product/messaging-types";
import { MessageFilter } from "@/models/generic";
import { wrapInArray } from "@/utils/builder-utils";
import { validateMessagingDataPointConfiguration } from "./messaging-data-point-configuration-schema";
import { buildResponseQuery } from "@/sections/shared/response-query/response-query-builder";
import { buildMessagingValueMapping } from "@/sections/shared/messaging-value-mapping/messaging-value-mapping-builder";

/**
 * Builds XML object for messagingDataType from MessagingDataType model
 */
function buildMessagingDataType(dataType: MessagingDataType): Record<string, unknown> {
  if ("number" in dataType) {
    return { number: [""] };
  }
  if ("string" in dataType) {
    return { string: [""] };
  }
  if ("JSON_array" in dataType) {
    return { JSON_array: [""] };
  }
  if ("JSON_object" in dataType) {
    return { JSON_object: [""] };
  }
  return { number: [""] };
}

/**
 * Builds XML object for messageFilter from MessageFilter model
 */
function buildMessageFilter(filter: MessageFilter | undefined): Record<string, unknown> | undefined {
  if (!filter) {
    return undefined;
  }

  if ("plaintextFilter" in filter) {
    return {
      plaintextFilter: wrapInArray({
        matchesRegex: wrapInArray(filter.plaintextFilter.matchesRegex),
      }),
    };
  }

  if ("jmespathFilter" in filter) {
    return {
      jmespathFilter: wrapInArray({
        query: wrapInArray(filter.jmespathFilter.query),
        matchesRegex: wrapInArray(filter.jmespathFilter.matchesRegex),
      }),
    };
  }

  if ("xpathFilter" in filter) {
    return {
      xpathFilter: wrapInArray({
        query: wrapInArray(filter.xpathFilter.query),
        matchesRegex: wrapInArray(filter.xpathFilter.matchesRegex),
      }),
    };
  }

  if ("regexFilter" in filter) {
    return {
      regexFilter: wrapInArray({
        query: wrapInArray(filter.regexFilter.query),
        matchesRegex: wrapInArray(filter.regexFilter.matchesRegex),
      }),
    };
  }

  if ("jsonataFilter" in filter) {
    return {
      jsonataFilter: wrapInArray({
        query: wrapInArray(filter.jsonataFilter.query),
        matchesRegex: wrapInArray(filter.jsonataFilter.matchesRegex),
      }),
    };
  }

  return undefined;
}

/**
 * Builds XML object for outMessage from OutMessage model
 */
function buildOutMessage(outMessage: OutMessage | undefined): Record<string, unknown> | undefined {
  if (!outMessage) {
    return undefined;
  }

  const outMessageXml: Record<string, unknown> = {
    topic: wrapInArray(outMessage.topic),
    template: wrapInArray(outMessage.template),
  };

  // Include optional templateQuery
  if (outMessage.templateQuery) {
    const templateQueryXml = buildResponseQuery(outMessage.templateQuery);
    if (templateQueryXml) {
      outMessageXml.templateQuery = wrapInArray(templateQueryXml);
    }
  }

  // Include optional valueMapping
  if (outMessage.valueMapping) {
    const valueMappingXml = buildMessagingValueMapping(outMessage.valueMapping);
    if (valueMappingXml) {
      outMessageXml.valueMapping = wrapInArray(valueMappingXml);
    }
  }

  return outMessageXml;
}

/**
 * Builds XML object for inMessage from InMessage model
 */
function buildInMessage(inMessage: InMessage | undefined): Record<string, unknown> | undefined {
  if (!inMessage) {
    return undefined;
  }

  const inMessageXml: Record<string, unknown> = {
    topic: wrapInArray(inMessage.topic),
  };

  // Include optional filter
  if (inMessage.filter) {
    const filterXml = buildMessageFilter(inMessage.filter);
    if (filterXml) {
      inMessageXml.filter = wrapInArray(filterXml);
    }
  }

  // Include optional responseQuery
  if (inMessage.responseQuery) {
    const responseQueryXml = buildResponseQuery(inMessage.responseQuery);
    if (responseQueryXml) {
      inMessageXml.responseQuery = wrapInArray(responseQueryXml);
    }
  }

  // Include optional valueMapping
  if (inMessage.valueMapping) {
    const valueMappingXml = buildMessagingValueMapping(inMessage.valueMapping);
    if (valueMappingXml) {
      inMessageXml.valueMapping = wrapInArray(valueMappingXml);
    }
  }

  return inMessageXml;
}

/**
 * Builds XML object for messagingDataPointConfiguration from MessagingDataPointConfiguration model
 * @throws Error if required fields are missing
 */
export function buildMessagingDataPointConfiguration(config: MessagingDataPointConfiguration): Record<string, unknown> {
  // Validate using validation layer
  const validation = validateMessagingDataPointConfiguration(config);
  if (!validation.success) {
    const firstError = validation.errors?.issues[0];
    const errorMessage = firstError?.message || "Validation failed for messaging data point configuration";
    throw new Error(errorMessage);
  }

  const configXml: Record<string, unknown> = {
    messagingDataType: wrapInArray(buildMessagingDataType(config.messagingDataType)),
  };

  // Include optional readCmdMessage
  if (config.readCmdMessage) {
    const readCmdMessageXml = buildOutMessage(config.readCmdMessage);
    if (readCmdMessageXml) {
      configXml.readCmdMessage = wrapInArray(readCmdMessageXml);
    }
  }

  // Include optional writeCmdMessage
  if (config.writeCmdMessage) {
    const writeCmdMessageXml = buildOutMessage(config.writeCmdMessage);
    if (writeCmdMessageXml) {
      configXml.writeCmdMessage = wrapInArray(writeCmdMessageXml);
    }
  }

  // Include optional inMessage
  if (config.inMessage) {
    const inMessageXml = buildInMessage(config.inMessage);
    if (inMessageXml) {
      configXml.inMessage = wrapInArray(inMessageXml);
    }
  }

  return configXml;
}
