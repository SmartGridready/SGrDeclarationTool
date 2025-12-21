import { ConfigurationList, ConfigurationListElement } from "@/models";
import {
  mapArray,
  getStringValue,
  getFirstElement,
  setOptionalField,
  Xml2JsObject,
} from "@/utils/mapper-utils";
import { mapDataTypeProduct } from "@/sections/shared/data-type-product/data-type-product-mapper";
import { mapLegibleDescriptionItem } from "@/sections/shared/legible-description/legible-description-mapper";

/**
 * Maps XML configurationList to ConfigurationList model
 */
export function mapConfigurationList(
  configurationListXml: Xml2JsObject | undefined
): ConfigurationList {
  return {
    configurationListElement: mapArray(
      configurationListXml,
      "configurationListElement",
      mapConfigurationListElement
    ),
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

  // Map optional defaultValue
  const defaultValue = getStringValue(elementXml, "defaultValue");
  setOptionalField(element, "defaultValue", defaultValue || undefined);

  // Map optional configurationDescription
  if (
    elementXml.configurationDescription &&
    Array.isArray(elementXml.configurationDescription) &&
    elementXml.configurationDescription.length > 0
  ) {
    const mappedDescriptions = elementXml.configurationDescription.map((desc: Xml2JsObject) =>
      mapLegibleDescriptionItem(desc)
    );
    setOptionalField(
      element,
      "configurationDescription",
      mappedDescriptions.length > 0 ? mappedDescriptions : undefined
    );
  }

  return element;
}
