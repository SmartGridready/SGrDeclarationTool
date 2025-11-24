import { Builder } from "xml2js";
import { FunctionalProfileFrame } from "@/models";
import { buildReleaseNotes } from "@/sections/funcitional-profiles/release-notes/release-notes-builder";
import { buildProfileIdentification } from "@/sections/funcitional-profiles/profile-identification/profile-identification-builder";
import { buildAlternativeNames } from "@/sections/funcitional-profiles/alternative-names/alternative-names-builder";
import { ERROR_MESSAGES } from "@/sections/funcitional-profiles/functional-profile-error-messages";
import { validateFunctionalProfileFrame } from "@/sections/funcitional-profiles/functional-profile-frame-validator";

/**
 * Converts FunctionalProfileFrame model to XML string
 * @param frame - The FunctionalProfileFrame model
 * @returns Promise resolving to XML string
 * @throws Error if frame is invalid or cannot be built
 */
export async function buildFunctionalProfileToXml(
  frame: FunctionalProfileFrame
): Promise<string> {
  if (!frame) {
    throw new Error(ERROR_MESSAGES.XML_BUILD.FRAME_REQUIRED);
  }

  // Validate the frame before building
  const validation = validateFunctionalProfileFrame(frame);
  if (!validation.success) {
    const firstError = validation.errors?.issues[0];
    const errorMessage =
      firstError?.message || ERROR_MESSAGES.XML_BUILD.FRAME_REQUIRED;
    throw new Error(ERROR_MESSAGES.XML_BUILD.FAILED(errorMessage));
  }

  const xmlObject = buildFunctionalProfile(frame);

  const builder = new Builder({
    xmldec: { version: "1.0", encoding: "UTF-8" },
    renderOpts: { pretty: true, indent: "  " },
    headless: false,
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
 * Builds the XML object structure from FunctionalProfileFrame model
 */
function buildFunctionalProfile(frame: FunctionalProfileFrame): any {
  const xmlObject: any = {
    FunctionalProfileFrame: {
      $: {
        xmlns: "http://www.smartgridready.com/ns/V0/",
        "xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
        "xsi:schemaLocation":
          "http://www.smartgridready.com/ns/V0/ ../../SchemaDatabase/SGr/SGrIncluder.xsd",
      },
    },
  };

  // Build releaseNotes if present
  if (frame.releaseNotes) {
    xmlObject.FunctionalProfileFrame.releaseNotes = [
      buildReleaseNotes(frame.releaseNotes),
    ];
  }

  // Build functionalProfile with functionalProfileIdentification
  const functionalProfileXml: any = {
    functionalProfileIdentification: [
      buildProfileIdentification(
        frame.functionalProfile.functionalProfileIdentification
      ),
    ],
  };

  // Build alternativeNames if present
  if (frame.functionalProfile.alternativeNames) {
    functionalProfileXml.alternativeNames = [
      buildAlternativeNames(frame.functionalProfile.alternativeNames),
    ];
  }

  xmlObject.FunctionalProfileFrame.functionalProfile = [functionalProfileXml];

  return xmlObject;
}
