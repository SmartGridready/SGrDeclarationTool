import { AlternativeNames } from "@/models";
import { getOptionalStringValue } from "@/sections/shared/utils/mapper-utils";

/**
 * Maps XML alternativeNames to AlternativeNames model
 */
export function mapAlternativeNames(
  alternativeNamesXml: any
): AlternativeNames {
  const alternativeNames: Partial<AlternativeNames> = {};

  // Map all optional fields
  const sLV1Name = getOptionalStringValue(alternativeNamesXml, "sLV1Name");
  if (sLV1Name) alternativeNames.sLV1Name = sLV1Name;

  const workName = getOptionalStringValue(alternativeNamesXml, "workName");
  if (workName) alternativeNames.workName = workName;

  const manufName = getOptionalStringValue(alternativeNamesXml, "manufName");
  if (manufName) alternativeNames.manufName = manufName;

  const iec61850Name = getOptionalStringValue(
    alternativeNamesXml,
    "iec61850Name"
  );
  if (iec61850Name) alternativeNames.iec61850Name = iec61850Name;

  const sarefName = getOptionalStringValue(alternativeNamesXml, "sarefName");
  if (sarefName) alternativeNames.sarefName = sarefName;

  const eebusName = getOptionalStringValue(alternativeNamesXml, "eebusName");
  if (eebusName) alternativeNames.eebusName = eebusName;

  const sunSpecName = getOptionalStringValue(
    alternativeNamesXml,
    "sunSpecName"
  );
  if (sunSpecName) alternativeNames.sunSpecName = sunSpecName;

  const hpBwpName = getOptionalStringValue(alternativeNamesXml, "hpBwpName");
  if (hpBwpName) alternativeNames.hpBwpName = hpBwpName;

  const en17609Name = getOptionalStringValue(
    alternativeNamesXml,
    "en17609Name"
  );
  if (en17609Name) alternativeNames.en17609Name = en17609Name;

  return alternativeNames as AlternativeNames;
}
