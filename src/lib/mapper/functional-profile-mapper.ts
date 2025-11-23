import { parseString } from "xml2js";
import { FunctionalProfileFrame } from "@/lib/models";
import { mapReleaseNotes } from "./functional-profile/release-notes-mapper";
import { mapProfileIdentification } from "./functional-profile/profile-identification-mapper";
import { ERROR_MESSAGES } from "@/lib/constants/error-messages";

/**
 * Parses XML string and maps it to FunctionalProfileFrame model
 * @param xmlString - The XML content as a string
 * @returns Promise resolving to FunctionalProfileFrame
 * @throws Error if XML is invalid or cannot be parsed
 */
export async function parseFunctionalProfile(
  xmlString: string
): Promise<FunctionalProfileFrame> {
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
  const frame: FunctionalProfileFrame = {
    functionalProfile: {
      functionalProfileIdentification: {
        specificationOwnerIdentification: "",
        functionalProfileCategory: "Battery",
        functionalProfileType: "",
        levelOfOperation: "1",
        versionNumber: {
          primaryVersionNumber: 0,
          secondaryVersionNumber: 0,
          subReleaseVersionNumber: 0,
        },
      },
    },
  };

  // Map releaseNotes if present
  if (frameData.releaseNotes) {
    frame.releaseNotes = mapReleaseNotes(frameData.releaseNotes[0]);
  }

  // Map functionalProfileIdentification
  if (frameData.functionalProfile?.[0]?.functionalProfileIdentification?.[0]) {
    frame.functionalProfile.functionalProfileIdentification =
      mapProfileIdentification(
        frameData.functionalProfile[0].functionalProfileIdentification[0]
      );
  }

  return frame;
}
