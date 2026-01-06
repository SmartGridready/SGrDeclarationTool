import { ConfigurationList, ConfigurationListElement } from "@/models";
import { mapArray, getStringValue, getFirstElement, setOptionalField, Xml2JsObject } from "@/utils/mapper-utils";
import { mapDataTypeProduct } from "@/sections/shared/data-type-product/data-type-product-mapper";
import { mapLegibleDescription } from "@/sections/shared/legible-description/legible-description-mapper";

/**
 * Maps XML configurationList to ConfigurationList model
 * Note: minOccurs=1 means at least one configurationListElement is required
 */
export function mapConfigurationList(configurationListXml: Xml2JsObject | undefined): ConfigurationList {
  const configurationListElement = mapArray(
    configurationListXml,
    "configurationListElement",
    mapConfigurationListElement
  );

  // Validate minOccurs=1 constraint
  if (configurationListElement.length === 0) {
    throw new Error("configurationListElement must have at least one element (minOccurs=1)");
  }

  return {
    configurationListElement,
  };
}

/**
 * Maps a single XML configurationListElement to ConfigurationListElement model
 */
function mapConfigurationListElement(elementXml: Xml2JsObject): ConfigurationListElement {
  const element: ConfigurationListElement = {
    name: getStringValue(elementXml, "name"),
    dataType: mapDataTypeProduct(getFirstElement(elementXml, "dataType")),
  };

  // Map optional defaultValue - preserve empty strings
  if (elementXml.defaultValue !== undefined) {
    // If defaultValue exists in XML (even if empty), preserve it
    const defaultValue = getStringValue(elementXml, "defaultValue", "");
    element.defaultValue = defaultValue;
  }

  // Map optional configurationDescription
  if (
    elementXml.configurationDescription &&
    Array.isArray(elementXml.configurationDescription) &&
    elementXml.configurationDescription.length > 0
  ) {
    const mappedDescriptions = mapLegibleDescription(elementXml.configurationDescription);
    setOptionalField(
      element,
      "configurationDescription",
      mappedDescriptions.length > 0 ? mappedDescriptions : undefined
    );
  }

  return element;
}
