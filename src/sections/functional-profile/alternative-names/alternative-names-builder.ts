import { AlternativeNames } from "@/models";
import { validateAlternativeNames } from "@/sections/functional-profile/alternative-names/alternative-names-schema";
import { setOptionalXmlField } from "@/sections/shared/utils/builder-utils";

/**
 * Builds XML object for alternativeNames from AlternativeNames model
 * Only includes fields that are present (all fields are optional)
 */
export function buildAlternativeNames(alternativeNames: AlternativeNames): Record<string, unknown> {
  // Validate using validation layer
  const validation = validateAlternativeNames(alternativeNames);
  if (!validation.success) {
    const firstError = validation.errors?.issues[0];
    const errorMessage = firstError?.message || "AlternativeNames validation failed";
    throw new Error(errorMessage);
  }

  const alternativeNamesXml: Record<string, unknown> = {};

  // Only include fields that are present using builder-utils
  setOptionalXmlField(alternativeNamesXml, "sLV1Name", alternativeNames.sLV1Name);
  setOptionalXmlField(alternativeNamesXml, "workName", alternativeNames.workName);
  setOptionalXmlField(alternativeNamesXml, "manufName", alternativeNames.manufName);
  setOptionalXmlField(alternativeNamesXml, "iec61850Name", alternativeNames.iec61850Name);
  setOptionalXmlField(alternativeNamesXml, "sarefName", alternativeNames.sarefName);
  setOptionalXmlField(alternativeNamesXml, "eebusName", alternativeNames.eebusName);
  setOptionalXmlField(alternativeNamesXml, "sunSpecName", alternativeNames.sunSpecName);
  setOptionalXmlField(alternativeNamesXml, "hpBwpName", alternativeNames.hpBwpName);
  setOptionalXmlField(alternativeNamesXml, "en17609Name", alternativeNames.en17609Name);

  return alternativeNamesXml;
}
