import { parseString } from "xml2js";
import { DeviceFrame } from "@/models";
import { getFirstElement, setOptionalField } from "@/utils/mapper-utils";
import { mapReleaseNotes } from "@/sections/shared/release-notes/release-notes-mapper";
import { mapDeviceIdentification } from "@/sections/device/device-identification/device-identification-mapper";
import { mapDeviceInformation } from "@/sections/device/device-information/device-information-mapper";
import { mapConfigurationList } from "@/sections/device/configuration-list/configuration-list-mapper";
import { mapGenericAttributeListProduct } from "@/sections/device/generic-attribute-list/generic-attribute-list-mapper";
import { ERROR_MESSAGES } from "@/constants/error-messages";

/**
 * Parses XML string and maps it to DeviceFrame model
 * @param xmlString - The XML content as a string
 * @returns Promise resolving to DeviceFrame
 * @throws Error if XML is invalid or cannot be parsed
 */
export async function parseDevice(xmlString: string): Promise<DeviceFrame> {
  let parsed: any;
  try {
    parsed = await new Promise<any>((resolve, reject) => {
      parseString(
        xmlString,
        {
          explicitArray: true,
          mergeAttrs: false,
          explicitRoot: true,
          trim: true,
        },
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        }
      );
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(ERROR_MESSAGES.XML_PARSE.FAILED(message));
  }

  return mapDevice(parsed);
}

/**
 * Maps the parsed XML object to DeviceFrame model
 */
function mapDevice(parsed: any): DeviceFrame {
  if (!parsed.DeviceFrame) {
    throw new Error(ERROR_MESSAGES.XML_PARSE.INVALID_ROOT);
  }

  const frameData = parsed.DeviceFrame;
  const deviceInformationXml = getFirstElement(frameData, "deviceInformation");

  if (!deviceInformationXml) {
    throw new Error(ERROR_MESSAGES.XML_PARSE.INVALID_ROOT);
  }

  const releaseNotesXml = getFirstElement(frameData, "releaseNotes");
  if (!releaseNotesXml) {
    throw new Error(ERROR_MESSAGES.XML_PARSE.INVALID_ROOT);
  }

  const identification = mapDeviceIdentification(frameData);

  const device: DeviceFrame = {
    ...identification,
    releaseNotes: mapReleaseNotes(releaseNotesXml),
    deviceInformation: mapDeviceInformation(deviceInformationXml),
  };

  const configurationListXml = getFirstElement(frameData, "configurationList");
  setOptionalField(
    device,
    "configurationList",
    configurationListXml && mapConfigurationList(configurationListXml)
  );

  const genericAttributeListXml = getFirstElement(frameData, "genericAttributeList");
  setOptionalField(
    device,
    "genericAttributeList",
    genericAttributeListXml && mapGenericAttributeListProduct(genericAttributeListXml)
  );

  return device;
}
