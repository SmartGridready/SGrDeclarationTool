import { ModbusDataPointList, ModbusDataPoint } from "@/models/product/modbus-interface";
import { getFirstElement, mapArray, setOptionalField, Xml2JsObject } from "@/utils/mapper-utils";
import { mapDataPointBase } from "@/sections/shared/data-point-base/data-point-base-mapper";
import { mapModbusAttributes } from "@/sections/shared/modbus-attributes/modbus-attributes-mapper";
import { mapModbusDataPointConfiguration } from "./modbus-data-point-configuration/modbus-data-point-configuration-mapper";
import { getOptionalStringValue } from "@/utils/mapper-utils";

/**
 * Maps XML dataPointList to ModbusDataPointList model
 */
export function mapModbusDataPointList(dataPointListXml: Xml2JsObject | undefined): ModbusDataPointList {
  if (!dataPointListXml) {
    throw new Error("dataPointList is required");
  }

  return {
    dataPointListElement: mapArray(dataPointListXml, "dataPointListElement", mapModbusDataPoint, []),
  };
}

/**
 * Maps XML dataPointListElement to ModbusDataPoint model
 */
function mapModbusDataPoint(elementXml: Xml2JsObject): ModbusDataPoint {
  // Map the base data point (dataPoint and optional genericAttributeList)
  const dataPointBase = mapDataPointBase(elementXml);

  const modbusDataPoint: ModbusDataPoint = {
    ...dataPointBase,
  };

  // Map optional modbusDataPointConfiguration
  const modbusDataPointConfigurationXml = getFirstElement(elementXml, "modbusDataPointConfiguration");
  setOptionalField(
    modbusDataPoint,
    "modbusDataPointConfiguration",
    modbusDataPointConfigurationXml && mapModbusDataPointConfiguration(modbusDataPointConfigurationXml)
  );

  // Map optional blockCacheIdentification
  setOptionalField(
    modbusDataPoint,
    "blockCacheIdentification",
    getOptionalStringValue(elementXml, "blockCacheIdentification")
  );

  // Map optional modbusAttributes
  const modbusAttributesXml = getFirstElement(elementXml, "modbusAttributes");
  setOptionalField(
    modbusDataPoint,
    "modbusAttributes",
    modbusAttributesXml && mapModbusAttributes(modbusAttributesXml)
  );

  return modbusDataPoint;
}
