import { MessagingInterface } from "@/models/product/messaging-interface";
import { getFirstElement, Xml2JsObject } from "@/utils/mapper-utils";
import { mapMessagingInterfaceDescription } from "./interface-description/interface-description-mapper";
import { mapMessagingFunctionalProfileList } from "./functional-profile-list/messaging-functional-profile-list-mapper";

/**
 * Maps XML messagingInterface to MessagingInterface model
 */
export function mapMessagingInterface(
  messagingInterfaceXml: Xml2JsObject | undefined
): MessagingInterface {
  if (!messagingInterfaceXml) {
    throw new Error("messagingInterface is required");
  }

  const messagingInterfaceDescriptionXml = getFirstElement(
    messagingInterfaceXml,
    "messagingInterfaceDescription"
  );
  if (!messagingInterfaceDescriptionXml) {
    throw new Error("messagingInterfaceDescription is required in messagingInterface");
  }

  const messagingInterface: MessagingInterface = {
    messagingInterfaceDescription: mapMessagingInterfaceDescription(
      messagingInterfaceDescriptionXml
    ),
    functionalProfileList: mapMessagingFunctionalProfileList(
      getFirstElement(messagingInterfaceXml, "functionalProfileList")
    ),
  };

  return messagingInterface;
}
