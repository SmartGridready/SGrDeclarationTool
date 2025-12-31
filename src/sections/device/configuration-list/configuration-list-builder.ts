import { ConfigurationList, ConfigurationListElement } from "@/models";
import { validateConfigurationList } from "@/sections/device/configuration-list/configuration-list-schema";
import { buildDataTypeProduct } from "@/sections/shared/data-type-product/data-type-product-builder";
import { buildLegibleDescriptionItem } from "@/sections/shared/legible-description/legible-description-builder";
import { wrapInArray, setOptionalXmlField } from "@/utils/builder-utils";

/**
 * Builds XML object for configurationList from ConfigurationList model
 */
export function buildConfigurationList(configurationList: ConfigurationList): Record<string, unknown> {
  // Validate using validation layer
  const validation = validateConfigurationList(configurationList);
  if (!validation.success) {
    const firstError = validation.errors?.issues[0];
    const errorMessage = firstError?.message || "Validation failed for configuration list";
    throw new Error(errorMessage);
  }

  return {
    configurationListElement: configurationList.configurationListElement.map((element) =>
      buildConfigurationListElement(element)
    ),
  };
}

/**
 * Builds XML object for a single configurationListElement
 */
function buildConfigurationListElement(element: ConfigurationListElement): Record<string, unknown> {
  const elementXml: Record<string, unknown> = {
    name: wrapInArray(element.name),
    dataType: wrapInArray(buildDataTypeProduct(element.dataType)),
  };

  // Add optional defaultValue
  setOptionalXmlField(elementXml, "defaultValue", element.defaultValue);

  // Build optional configurationDescription
  if (element.configurationDescription && element.configurationDescription.length > 0) {
    elementXml.configurationDescription = element.configurationDescription.map((desc) =>
      buildLegibleDescriptionItem(desc)
    );
  }

  return elementXml;
}
