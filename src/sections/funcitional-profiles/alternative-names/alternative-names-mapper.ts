import { AlternativeNames } from "@/models";

/**
 * Maps XML alternativeNames to AlternativeNames model
 */
export function mapAlternativeNames(
  alternativeNamesXml: any
): AlternativeNames {
  const alternativeNames: AlternativeNames = {};

  // Map optional fields
  if (alternativeNamesXml.sLV1Name?.[0]) {
    alternativeNames.sLV1Name = alternativeNamesXml.sLV1Name[0];
  }

  if (alternativeNamesXml.workName?.[0]) {
    alternativeNames.workName = alternativeNamesXml.workName[0];
  }

  if (alternativeNamesXml.manufName?.[0]) {
    alternativeNames.manufName = alternativeNamesXml.manufName[0];
  }

  if (alternativeNamesXml.iec61850Name?.[0]) {
    alternativeNames.iec61850Name = alternativeNamesXml.iec61850Name[0];
  }

  if (alternativeNamesXml.sarefName?.[0]) {
    alternativeNames.sarefName = alternativeNamesXml.sarefName[0];
  }

  if (alternativeNamesXml.eebusName?.[0]) {
    alternativeNames.eebusName = alternativeNamesXml.eebusName[0];
  }

  if (alternativeNamesXml.sunSpecName?.[0]) {
    alternativeNames.sunSpecName = alternativeNamesXml.sunSpecName[0];
  }

  if (alternativeNamesXml.hpBwpName?.[0]) {
    alternativeNames.hpBwpName = alternativeNamesXml.hpBwpName[0];
  }

  if (alternativeNamesXml.en17609Name?.[0]) {
    alternativeNames.en17609Name = alternativeNamesXml.en17609Name[0];
  }

  return alternativeNames;
}
