import { RestApiDataPointList, RestApiDataPoint } from "@/models/product/rest-api-interface";
import { getFirstElement, mapArray, setOptionalField, Xml2JsObject } from "@/utils/mapper-utils";
import { mapDataPointBase } from "@/sections/shared/data-point-base/data-point-base-mapper";
import { mapRestApiDataPointConfiguration } from "./rest-api-data-point-configuration/rest-api-data-point-configuration-mapper";

/**
 * Maps XML dataPointList to RestApiDataPointList model
 */
export function mapRestApiDataPointList(
  dataPointListXml: Xml2JsObject | undefined
): RestApiDataPointList {
  if (!dataPointListXml) {
    throw new Error("dataPointList is required");
  }

  return {
    dataPointListElement: mapArray(
      dataPointListXml,
      "dataPointListElement",
      mapRestApiDataPoint,
      []
    ),
  };
}

/**
 * Maps XML dataPointListElement to RestApiDataPoint model
 */
function mapRestApiDataPoint(elementXml: Xml2JsObject): RestApiDataPoint {
  // Map the base data point (dataPoint and optional genericAttributeList)
  const dataPointBase = mapDataPointBase(elementXml);

  const restApiDataPoint: RestApiDataPoint = {
    ...dataPointBase,
  };

  // Map optional restApiDataPointConfiguration
  const restApiDataPointConfigurationXml = getFirstElement(
    elementXml,
    "restApiDataPointConfiguration"
  );
  setOptionalField(
    restApiDataPoint,
    "restApiDataPointConfiguration",
    mapRestApiDataPointConfiguration(restApiDataPointConfigurationXml)
  );

  return restApiDataPoint;
}
