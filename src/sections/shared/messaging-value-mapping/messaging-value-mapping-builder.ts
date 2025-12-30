import { MessagingValueMapping } from "@/models/product/messaging-types";
import { ValueMapping } from "@/models/generic";
import { wrapInArray } from "@/utils/builder-utils";

/**
 * Builds XML object for valueMapping from ValueMapping model
 */
export function buildValueMapping(valueMapping: ValueMapping): Record<string, unknown> {
  return {
    genericValue: wrapInArray(valueMapping.genericValue),
    deviceValue: wrapInArray(valueMapping.deviceValue),
  };
}

/**
 * Builds XML object for messagingValueMapping from MessagingValueMapping model
 */
export function buildMessagingValueMapping(
  valueMapping: MessagingValueMapping | undefined
): Record<string, unknown> | undefined {
  if (!valueMapping || !valueMapping.mapping || valueMapping.mapping.length === 0) {
    return undefined;
  }

  return {
    mapping: valueMapping.mapping.map(buildValueMapping),
  };
}
