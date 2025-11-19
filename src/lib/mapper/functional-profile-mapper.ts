import { parseString } from "xml2js";
import { FunctionalProfileFrame } from "@/lib/models";
import { mapReleaseNotes } from "./functional-profile/release-notes-mapper";

/**
 * Parses XML string and maps it to FunctionalProfileFrame model
 * @param xmlString - The XML content as a string
 * @returns Promise resolving to FunctionalProfileFrame
 * @throws Error if XML is invalid or cannot be parsed
 */
export async function parseFunctionalProfile(
  xmlString: string
): Promise<FunctionalProfileFrame> {
  return new Promise((resolve, reject) => {
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
          reject(new Error(`Failed to parse XML: ${err.message}`));
          return;
        }

        try {
          const frame = mapFunctionalProfile(result);
          resolve(frame);
        } catch (error) {
          reject(
            error instanceof Error
              ? error
              : new Error(`Failed to map XML to model: ${String(error)}`)
          );
        }
      }
    );
  });
}

/**
 * Maps the parsed XML object to FunctionalProfileFrame model
 */
function mapFunctionalProfile(parsed: any): FunctionalProfileFrame {
  if (!parsed.FunctionalProfileFrame) {
    throw new Error(
      "Invalid XML: Root element must be 'FunctionalProfileFrame'"
    );
  }

  const frameData = parsed.FunctionalProfileFrame;
  const frame: FunctionalProfileFrame = {};

  // Map releaseNotes if present
  if (frameData.releaseNotes) {
    frame.releaseNotes = mapReleaseNotes(frameData.releaseNotes[0]);
  }

  return frame;
}
