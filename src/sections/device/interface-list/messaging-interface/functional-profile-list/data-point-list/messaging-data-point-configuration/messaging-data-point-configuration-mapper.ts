import {
  MessagingDataPointConfiguration,
  MessagingDataType,
  OutMessage,
  InMessage,
} from "@/models/product/messaging-types";
import { MessageFilter } from "@/models/generic";
import { getStringValue, getFirstElement, Xml2JsObject } from "@/utils/mapper-utils";
import { mapResponseQuery } from "@/sections/shared/response-query/response-query-mapper";
import { mapMessagingValueMapping } from "@/sections/shared/messaging-value-mapping/messaging-value-mapping-mapper";

/**
 * Maps XML messagingDataType to MessagingDataType model
 */
function mapMessagingDataType(xml: Xml2JsObject | undefined): MessagingDataType {
  if (!xml) {
    return { number: {} };
  }

  if (xml.number !== undefined) {
    return { number: {} };
  }
  if (xml.string !== undefined) {
    return { string: {} };
  }
  if (xml.JSON_array !== undefined) {
    return { JSON_array: {} };
  }
  if (xml.JSON_object !== undefined) {
    return { JSON_object: {} };
  }

  return { number: {} };
}

/**
 * Maps XML plaintextFilter to PlaintextFilterType model
 */
function mapPlaintextFilter(xml: Xml2JsObject): { plaintextFilter: { matchesRegex: string } } {
  return {
    plaintextFilter: {
      matchesRegex: getStringValue(xml, "matchesRegex"),
    },
  };
}

/**
 * Maps XML jmespathFilter to JMESPathFilterType model
 */
function mapJmespathFilter(xml: Xml2JsObject): {
  jmespathFilter: { query: string; matchesRegex: string };
} {
  return {
    jmespathFilter: {
      query: getStringValue(xml, "query"),
      matchesRegex: getStringValue(xml, "matchesRegex"),
    },
  };
}

/**
 * Maps XML xpathFilter to XPathFilterType model
 */
function mapXpathFilter(xml: Xml2JsObject): {
  xpathFilter: { query: string; matchesRegex: string };
} {
  return {
    xpathFilter: {
      query: getStringValue(xml, "query"),
      matchesRegex: getStringValue(xml, "matchesRegex"),
    },
  };
}

/**
 * Maps XML regexFilter to RegexFilterType model
 */
function mapRegexFilter(xml: Xml2JsObject): {
  regexFilter: { query: string; matchesRegex: string };
} {
  return {
    regexFilter: {
      query: getStringValue(xml, "query"),
      matchesRegex: getStringValue(xml, "matchesRegex"),
    },
  };
}

/**
 * Maps XML jsonataFilter to JSONataFilterType model
 */
function mapJsonataFilter(xml: Xml2JsObject): {
  jsonataFilter: { query: string; matchesRegex: string };
} {
  return {
    jsonataFilter: {
      query: getStringValue(xml, "query"),
      matchesRegex: getStringValue(xml, "matchesRegex"),
    },
  };
}

/**
 * Maps XML messageFilter to MessageFilter model
 */
function mapMessageFilter(xml: Xml2JsObject | undefined): MessageFilter | undefined {
  if (!xml) {
    return undefined;
  }

  const plaintextFilterXml = getFirstElement(xml, "plaintextFilter");
  if (plaintextFilterXml) {
    return mapPlaintextFilter(plaintextFilterXml);
  }

  const jmespathFilterXml = getFirstElement(xml, "jmespathFilter");
  if (jmespathFilterXml) {
    return mapJmespathFilter(jmespathFilterXml);
  }

  const xpathFilterXml = getFirstElement(xml, "xpathFilter");
  if (xpathFilterXml) {
    return mapXpathFilter(xpathFilterXml);
  }

  const regexFilterXml = getFirstElement(xml, "regexFilter");
  if (regexFilterXml) {
    return mapRegexFilter(regexFilterXml);
  }

  const jsonataFilterXml = getFirstElement(xml, "jsonataFilter");
  if (jsonataFilterXml) {
    return mapJsonataFilter(jsonataFilterXml);
  }

  return undefined;
}

/**
 * Maps XML outMessage to OutMessage model
 */
function mapOutMessage(xml: Xml2JsObject | undefined): OutMessage | undefined {
  if (!xml) {
    return undefined;
  }

  const outMessage: OutMessage = {
    topic: getStringValue(xml, "topic"),
    template: getStringValue(xml, "template"),
  };

  // Map optional templateQuery
  const templateQueryXml = getFirstElement(xml, "templateQuery");
  if (templateQueryXml) {
    const templateQuery = mapResponseQuery(templateQueryXml);
    if (templateQuery) {
      outMessage.templateQuery = templateQuery;
    }
  }

  // Map optional valueMapping
  const valueMappingXml = getFirstElement(xml, "valueMapping");
  if (valueMappingXml) {
    const valueMapping = mapMessagingValueMapping(valueMappingXml);
    if (valueMapping) {
      outMessage.valueMapping = valueMapping;
    }
  }

  return outMessage;
}

/**
 * Maps XML inMessage to InMessage model
 */
function mapInMessage(xml: Xml2JsObject | undefined): InMessage | undefined {
  if (!xml) {
    return undefined;
  }

  const inMessage: InMessage = {
    topic: getStringValue(xml, "topic"),
  };

  // Map optional filter
  const filterXml = getFirstElement(xml, "filter");
  if (filterXml) {
    const filter = mapMessageFilter(filterXml);
    if (filter) {
      inMessage.filter = filter;
    }
  }

  // Map optional responseQuery
  const responseQueryXml = getFirstElement(xml, "responseQuery");
  if (responseQueryXml) {
    const responseQuery = mapResponseQuery(responseQueryXml);
    if (responseQuery) {
      inMessage.responseQuery = responseQuery;
    }
  }

  // Map optional valueMapping
  const valueMappingXml = getFirstElement(xml, "valueMapping");
  if (valueMappingXml) {
    const valueMapping = mapMessagingValueMapping(valueMappingXml);
    if (valueMapping) {
      inMessage.valueMapping = valueMapping;
    }
  }

  return inMessage;
}

/**
 * Maps XML messagingDataPointConfiguration to MessagingDataPointConfiguration model
 */
export function mapMessagingDataPointConfiguration(
  xml: Xml2JsObject | undefined
): MessagingDataPointConfiguration {
  if (!xml) {
    return {
      messagingDataType: { number: {} },
    };
  }

  const config: MessagingDataPointConfiguration = {
    messagingDataType: mapMessagingDataType(getFirstElement(xml, "messagingDataType")),
  };

  // Map optional readCmdMessage
  const readCmdMessageXml = getFirstElement(xml, "readCmdMessage");
  if (readCmdMessageXml) {
    const readCmdMessage = mapOutMessage(readCmdMessageXml);
    if (readCmdMessage) {
      config.readCmdMessage = readCmdMessage;
    }
  }

  // Map optional writeCmdMessage
  const writeCmdMessageXml = getFirstElement(xml, "writeCmdMessage");
  if (writeCmdMessageXml) {
    const writeCmdMessage = mapOutMessage(writeCmdMessageXml);
    if (writeCmdMessage) {
      config.writeCmdMessage = writeCmdMessage;
    }
  }

  // Map optional inMessage
  const inMessageXml = getFirstElement(xml, "inMessage");
  if (inMessageXml) {
    const inMessage = mapInMessage(inMessageXml);
    if (inMessage) {
      config.inMessage = inMessage;
    }
  }

  return config;
}
