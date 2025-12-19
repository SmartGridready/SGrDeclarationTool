import { AlternativeNames } from "@/models";
import { getOptionalStringValue, setOptionalField, Xml2JsObject } from "@/utils/mapper-utils";

/**
 * Maps XML alternativeNames to AlternativeNames model
 */
export function mapAlternativeNames(alternativeNamesXml: unknown): AlternativeNames {
  const alternativeNames: AlternativeNames = {};
  const xml = alternativeNamesXml as Xml2JsObject | undefined;

  // Map all optional fields using utility function
  setOptionalField(alternativeNames, "sLV1Name", getOptionalStringValue(xml, "sLV1Name"));
  setOptionalField(alternativeNames, "workName", getOptionalStringValue(xml, "workName"));
  setOptionalField(alternativeNames, "manufName", getOptionalStringValue(xml, "manufName"));
  setOptionalField(alternativeNames, "iec61850Name", getOptionalStringValue(xml, "iec61850Name"));
  setOptionalField(alternativeNames, "sarefName", getOptionalStringValue(xml, "sarefName"));
  setOptionalField(alternativeNames, "eebusName", getOptionalStringValue(xml, "eebusName"));
  setOptionalField(alternativeNames, "sunSpecName", getOptionalStringValue(xml, "sunSpecName"));
  setOptionalField(alternativeNames, "hpBwpName", getOptionalStringValue(xml, "hpBwpName"));
  setOptionalField(alternativeNames, "en17609Name", getOptionalStringValue(xml, "en17609Name"));

  return alternativeNames;
}
