import { AlternativeNames } from "@/models";
import { validateAlternativeNames } from "@/sections/functional-profile/alternative-names/alternative-names-validator";

/**
 * Builds XML object for alternativeNames from AlternativeNames model
 * Only includes fields that are present (all fields are optional)
 */
export function buildAlternativeNames(alternativeNames: AlternativeNames): any {
  // Validate using validation layer
  const validation = validateAlternativeNames(alternativeNames);
  if (!validation.success) {
    const firstError = validation.errors?.issues[0];
    const errorMessage =
      firstError?.message || "AlternativeNames validation failed";
    throw new Error(errorMessage);
  }

  const alternativeNamesXml: any = {};

  // Only include fields that are present
  if (alternativeNames.sLV1Name) {
    alternativeNamesXml.sLV1Name = [alternativeNames.sLV1Name];
  }

  if (alternativeNames.workName) {
    alternativeNamesXml.workName = [alternativeNames.workName];
  }

  if (alternativeNames.manufName) {
    alternativeNamesXml.manufName = [alternativeNames.manufName];
  }

  if (alternativeNames.iec61850Name) {
    alternativeNamesXml.iec61850Name = [alternativeNames.iec61850Name];
  }

  if (alternativeNames.sarefName) {
    alternativeNamesXml.sarefName = [alternativeNames.sarefName];
  }

  if (alternativeNames.eebusName) {
    alternativeNamesXml.eebusName = [alternativeNames.eebusName];
  }

  if (alternativeNames.sunSpecName) {
    alternativeNamesXml.sunSpecName = [alternativeNames.sunSpecName];
  }

  if (alternativeNames.hpBwpName) {
    alternativeNamesXml.hpBwpName = [alternativeNames.hpBwpName];
  }

  if (alternativeNames.en17609Name) {
    alternativeNamesXml.en17609Name = [alternativeNames.en17609Name];
  }

  return alternativeNamesXml;
}
