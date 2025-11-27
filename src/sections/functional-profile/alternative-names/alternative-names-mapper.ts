import { AlternativeNames } from "@/models";
import {
  getOptionalStringValue,
  setOptionalField,
} from "@/sections/shared/utils/mapper-utils";

/**
 * Maps XML alternativeNames to AlternativeNames model
 */
export function mapAlternativeNames(
  alternativeNamesXml: any
): AlternativeNames {
  const alternativeNames: AlternativeNames = {};

  // Map all optional fields
  const optionalFields: (keyof AlternativeNames)[] = [
    "sLV1Name",
    "workName",
    "manufName",
    "iec61850Name",
    "sarefName",
    "eebusName",
    "sunSpecName",
    "hpBwpName",
    "en17609Name",
  ];

  for (const field of optionalFields) {
    const value = getOptionalStringValue(alternativeNamesXml, field);
    setOptionalField(alternativeNames, field, value);
  }

  return alternativeNames;
}
