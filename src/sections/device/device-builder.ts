import { Builder } from "xml2js";
import { DeviceFrame } from "@/models";
import { buildReleaseNotes } from "@/sections/shared/release-notes/release-notes-builder";
import { buildDeviceIdentification } from "@/sections/device/device-identification/device-identification-builder";
import { buildDeviceInformation } from "@/sections/device/device-information/device-information-builder";
import { buildConfigurationList } from "@/sections/device/configuration-list/configuration-list-builder";
import { buildGenericAttributeListProduct } from "@/sections/shared/generic-attribute-list-product/generic-attribute-list-product-builder";
import { buildInterfaceList } from "@/sections/device/interface-list/interface-list-builder";
import { ERROR_MESSAGES } from "@/constants/error-messages";
import { validateDeviceFrame } from "@/sections/device/device-schema";
import { wrapInArray, setOptionalXmlField } from "@/utils/builder-utils";

/**
 * Converts DeviceFrame model to XML string
 * @param device - The DeviceFrame model
 * @returns Promise resolving to XML string
 * @throws Error if device is invalid or cannot be built
 */
export async function buildDeviceToXml(device: DeviceFrame): Promise<string> {
  if (!device) {
    throw new Error(ERROR_MESSAGES.XML_BUILD.FRAME_REQUIRED);
  }

  // Validate the device before building
  const validation = validateDeviceFrame(device);
  if (!validation.success) {
    const firstError = validation.errors?.issues[0];
    const errorMessage = firstError?.message || ERROR_MESSAGES.XML_BUILD.FRAME_REQUIRED;
    throw new Error(ERROR_MESSAGES.XML_BUILD.FAILED(errorMessage));
  }

  const xmlObject = buildDevice(device);

  const builder = new Builder({
    xmldec: { version: "1.0", encoding: "UTF-8" },
    renderOpts: { pretty: true, indent: "  " },
    headless: false,
    cdata: true, // Enable CDATA support for preserving HTML and special characters
  });

  try {
    const xmlString = builder.buildObject(xmlObject);
    // Inject XML stylesheet declaration after the XML declaration
    const xmlWithStylesheet = xmlString.replace(
      /(<\?xml[^>]*\?>)/,
      '$1\n<?xml-stylesheet type="text/xsl" href="/xsl/SGr.xsl"?>'
    );
    return xmlWithStylesheet;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(ERROR_MESSAGES.XML_BUILD.FAILED(message));
  }
}

/**
 * Builds the XML object structure from DeviceFrame model
 */
function buildDevice(device: DeviceFrame): Record<string, unknown> {
  const deviceFrame: Record<string, unknown> = {
    $: {
      xmlns: "http://www.smartgridready.com/ns/V0/",
      "xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
      "xsi:schemaLocation":
        "http://www.smartgridready.com/ns/V0/ ../../SchemaDatabase/SGr/Product/Product.xsd",
    },
  };

  // Build device identification fields
  const identification = buildDeviceIdentification({
    deviceName: device.deviceName,
    manufacturerName: device.manufacturerName,
    specificationOwnerIdentification: device.specificationOwnerIdentification,
  });
  deviceFrame.deviceName = identification.deviceName;
  if (identification.manufacturerName) {
    deviceFrame.manufacturerName = identification.manufacturerName;
  }
  deviceFrame.specificationOwnerIdentification = identification.specificationOwnerIdentification;

  // Build releaseNotes (required)
  deviceFrame.releaseNotes = wrapInArray(buildReleaseNotes(device.releaseNotes));

  // Build deviceInformation (required)
  deviceFrame.deviceInformation = wrapInArray(buildDeviceInformation(device.deviceInformation));

  // Build optional configurationList
  if (device.configurationList && device.configurationList.configurationListElement.length > 0) {
    deviceFrame.configurationList = wrapInArray(buildConfigurationList(device.configurationList));
  }

  // Build optional genericAttributeList
  if (
    device.genericAttributeList &&
    device.genericAttributeList.genericAttributeListElement.length > 0
  ) {
    deviceFrame.genericAttributeList = wrapInArray(
      buildGenericAttributeListProduct(device.genericAttributeList)
    );
  }

  // Build optional interfaceList
  if (device.interfaceList) {
    const interfaceListXml = buildInterfaceList(device.interfaceList);
    if (interfaceListXml) {
      deviceFrame.interfaceList = wrapInArray(interfaceListXml);
    }
  }

  return {
    DeviceFrame: deviceFrame,
  };
}
