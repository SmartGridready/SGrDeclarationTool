import { parseString } from "xml2js";
import { FunctionalProfileFrame } from "@/models";
import { getFirstElement, setOptionalField } from "@/utils/mapper-utils";
import { mapReleaseNotes } from "@/sections/shared/release-notes/release-notes-mapper";
import { mapProfileIdentification } from "@/sections/shared/profile-identification/profile-identification-mapper";
import { mapAlternativeNames } from "@/sections/shared/alternative-names/alternative-names-mapper";
import { mapLegibleDescription } from "@/sections/shared/legible-description/legible-description-mapper";
import { mapGenericAttributeList } from "@/sections/functional-profile/generic-attribute-list/generic-attribute-list-mapper";
import { mapDataPointList } from "@/sections/functional-profile/data-point-list/data-point-list-mapper";
import { ERROR_MESSAGES } from "@/constants/error-messages";

/**
 * Parses XML string and maps it to FunctionalProfileFrame model
 * @param xmlString - The XML content as a string
 * @returns Promise resolving to FunctionalProfileFrame
 * @throws Error if XML is invalid or cannot be parsed
 */
export async function parseFunctionalProfile(xmlString: string): Promise<FunctionalProfileFrame> {
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

  return mapFunctionalProfile(parsed);
}

/**
 * Maps the parsed XML object to FunctionalProfileFrame model
 */
function mapFunctionalProfile(parsed: any): FunctionalProfileFrame {
  if (!parsed.FunctionalProfileFrame) {
    throw new Error(ERROR_MESSAGES.XML_PARSE.INVALID_ROOT);
  }

  const frameData = parsed.FunctionalProfileFrame;
  const functionalProfileXml = getFirstElement(frameData, "functionalProfile");

  if (!functionalProfileXml) {
    throw new Error(ERROR_MESSAGES.XML_PARSE.INVALID_ROOT);
  }

  const identificationXml = getFirstElement(functionalProfileXml, "functionalProfileIdentification");

  const frame: FunctionalProfileFrame = {
    functionalProfile: {
      functionalProfileIdentification: mapProfileIdentification(identificationXml || {}),
    },
  };

  // Map optional fields
  const releaseNotesXml = getFirstElement(frameData, "releaseNotes");
  setOptionalField(frame, "releaseNotes", releaseNotesXml && mapReleaseNotes(releaseNotesXml));

  const alternativeNamesXml = getFirstElement(functionalProfileXml, "alternativeNames");
  setOptionalField(
    frame.functionalProfile,
    "alternativeNames",
    alternativeNamesXml && mapAlternativeNames(alternativeNamesXml)
  );

  // Map optional legibleDescription
  if (
    functionalProfileXml.legibleDescription &&
    Array.isArray(functionalProfileXml.legibleDescription) &&
    functionalProfileXml.legibleDescription.length > 0
  ) {
    const mappedLegibleDescription = mapLegibleDescription(functionalProfileXml.legibleDescription);
    setOptionalField(
      frame.functionalProfile,
      "legibleDescription",
      mappedLegibleDescription.length > 0 ? mappedLegibleDescription : undefined
    );
  }

  const genericAttributeListXml = getFirstElement(frameData, "genericAttributeList");
  setOptionalField(
    frame,
    "genericAttributeList",
    genericAttributeListXml && mapGenericAttributeList(genericAttributeListXml)
  );

  const dataPointListXml = getFirstElement(frameData, "dataPointList");
  setOptionalField(frame, "dataPointList", dataPointListXml && mapDataPointList(dataPointListXml));

  return frame;
}
