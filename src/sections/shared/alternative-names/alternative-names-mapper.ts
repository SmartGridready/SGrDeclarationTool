import { AlternativeNames } from "@/models";
import { getOptionalStringValue, setOptionalField, Xml2JsObject } from "@/utils/mapper-utils";

/**
 * Maps XML alternativeNames to AlternativeNames model
 */
export function mapAlternativeNames(
  alternativeNamesXml: Xml2JsObject | undefined
): AlternativeNames {
  const alternativeNames: AlternativeNames = {};

  // Map all optional fields using utility function
  setOptionalField(
    alternativeNames,
    "sLV1Name",
    getOptionalStringValue(alternativeNamesXml, "sLV1Name")
  );
  setOptionalField(
    alternativeNames,
    "workName",
    getOptionalStringValue(alternativeNamesXml, "workName")
  );
  setOptionalField(
    alternativeNames,
    "manufName",
    getOptionalStringValue(alternativeNamesXml, "manufName")
  );
  setOptionalField(
    alternativeNames,
    "iec61850Name",
    getOptionalStringValue(alternativeNamesXml, "iec61850Name")
  );
  setOptionalField(
    alternativeNames,
    "sarefName",
    getOptionalStringValue(alternativeNamesXml, "sarefName")
  );
  setOptionalField(
    alternativeNames,
    "eebusName",
    getOptionalStringValue(alternativeNamesXml, "eebusName")
  );
  setOptionalField(
    alternativeNames,
    "sunSpecName",
    getOptionalStringValue(alternativeNamesXml, "sunSpecName")
  );
  setOptionalField(
    alternativeNames,
    "hpBwpName",
    getOptionalStringValue(alternativeNamesXml, "hpBwpName")
  );
  setOptionalField(
    alternativeNames,
    "en17609Name",
    getOptionalStringValue(alternativeNamesXml, "en17609Name")
  );

  return alternativeNames;
}
