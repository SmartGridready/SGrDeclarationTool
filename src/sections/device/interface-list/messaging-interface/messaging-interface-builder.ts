import { MessagingInterface } from "@/models/product/messaging-interface";
import { buildMessagingInterfaceDescription } from "./interface-description/interface-description-builder";
import { buildMessagingFunctionalProfileList } from "./functional-profile-list/messaging-functional-profile-list-builder";
import { wrapInArray } from "@/utils/builder-utils";
import { validateMessagingInterface } from "./messaging-interface-schema";

/**
 * Builds XML object for messagingInterface from MessagingInterface model
 * @throws Error if required fields are missing
 */
export function buildMessagingInterface(
  messagingInterface: MessagingInterface
): Record<string, unknown> {
  // Validate using validation layer
  const validation = validateMessagingInterface(messagingInterface);
  if (!validation.success) {
    const firstError = validation.errors?.issues[0];
    const errorMessage = firstError?.message || "Validation failed for messaging interface";
    throw new Error(errorMessage);
  }

  const messagingInterfaceXml: Record<string, unknown> = {
    messagingInterfaceDescription: wrapInArray(
      buildMessagingInterfaceDescription(messagingInterface.messagingInterfaceDescription)
    ),
  };

  // Add required functionalProfileList
  messagingInterfaceXml.functionalProfileList = wrapInArray(
    buildMessagingFunctionalProfileList(messagingInterface.functionalProfileList)
  );

  return messagingInterfaceXml;
}
