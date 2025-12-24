import { FunctionalProfileBase, FunctionalProfileDescription } from "@/models";
import { mapProfileIdentification } from "@/sections/shared/profile-identification/profile-identification-mapper";
import { mapAlternativeNames } from "@/sections/shared/alternative-names/alternative-names-mapper";
import { mapLegibleDescription } from "@/sections/shared/legible-description/legible-description-mapper";
import { mapGenericAttributeListProduct } from "@/sections/shared/generic-attribute-list-product/generic-attribute-list-product-mapper";
import { getStringValue, getFirstElement, Xml2JsObject } from "@/utils/mapper-utils";

/**
 * Maps XML functionalProfileBase to FunctionalProfileBase model
 */
export function mapFunctionalProfileBase(
  functionalProfileBaseXml: Xml2JsObject | undefined
): FunctionalProfileBase {
  const functionalProfileXml = getFirstElement(functionalProfileBaseXml, "functionalProfile");
  if (!functionalProfileXml) {
    throw new Error("functionalProfile is required in functionalProfileBase");
  }

  const functionalProfileBase: FunctionalProfileBase = {
    functionalProfile: mapFunctionalProfileDescription(functionalProfileXml),
  };

  // Map optional genericAttributeList if present
  const genericAttributeListXml = getFirstElement(functionalProfileBaseXml, "genericAttributeList");
  if (genericAttributeListXml) {
    functionalProfileBase.genericAttributeList =
      mapGenericAttributeListProduct(genericAttributeListXml);
  }

  return functionalProfileBase;
}

/**
 * Maps XML functionalProfileDescription to FunctionalProfileDescription model
 */
export function mapFunctionalProfileDescription(
  descriptionXml: Xml2JsObject | undefined
): FunctionalProfileDescription {
  if (!descriptionXml) {
    throw new Error("functionalProfileDescription is required");
  }

  const description: FunctionalProfileDescription = {
    functionalProfileName: getStringValue(descriptionXml, "functionalProfileName"),
    functionalProfileIdentification: mapProfileIdentification(
      getFirstElement(descriptionXml, "functionalProfileIdentification")
    ),
  };

  // Map optional alternativeNames if present
  const alternativeNamesXml = getFirstElement(descriptionXml, "alternativeNames");
  if (alternativeNamesXml) {
    description.alternativeNames = mapAlternativeNames(alternativeNamesXml);
  }

  // Map optional legibleDescription array if present
  const legibleDescriptionXml = descriptionXml.legibleDescription;
  if (legibleDescriptionXml) {
    description.legibleDescription = mapLegibleDescription(legibleDescriptionXml);
  }

  // Map optional programmerHints array if present
  const programmerHintsXml = descriptionXml.programmerHints;
  if (programmerHintsXml) {
    description.programmerHints = mapLegibleDescription(programmerHintsXml);
  }

  return description;
}
