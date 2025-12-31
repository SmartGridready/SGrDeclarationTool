import { ModbusDataPointList, ModbusDataPoint } from "@/models/product/modbus-interface";
import { buildDataPointBase } from "@/sections/shared/data-point-base/data-point-base-builder";
import { buildModbusAttributes } from "@/sections/shared/modbus-attributes/modbus-attributes-builder";
import { buildModbusDataPointConfiguration } from "./modbus-data-point-configuration/modbus-data-point-configuration-builder";
import { wrapInArray, setOptionalXmlField } from "@/utils/builder-utils";
import { validateModbusDataPointList, validateModbusDataPoint } from "./modbus-data-point-list-schema";

/**
 * Builds XML object for dataPointList from ModbusDataPointList model
 * @throws Error if required fields are missing
 */
export function buildModbusDataPointList(dataPointList: ModbusDataPointList): Record<string, unknown> {
  // Validate using validation layer
  const validation = validateModbusDataPointList(dataPointList);
  if (!validation.success) {
    const firstError = validation.errors?.issues[0];
    const errorMessage = firstError?.message || "Validation failed for modbus data point list";
    throw new Error(errorMessage);
  }
  const listXml: Record<string, unknown> = {
    dataPointListElement: dataPointList.dataPointListElement.map((dataPoint) => buildModbusDataPoint(dataPoint)),
  };

  return listXml;
}

/**
 * Builds XML object for dataPointListElement from ModbusDataPoint model
 * @throws Error if required fields are missing
 */
function buildModbusDataPoint(dataPoint: ModbusDataPoint): Record<string, unknown> {
  // Validate using validation layer
  const validation = validateModbusDataPoint(dataPoint);
  if (!validation.success) {
    const firstError = validation.errors?.issues[0];
    const errorMessage = firstError?.message || "Validation failed for modbus data point";
    throw new Error(errorMessage);
  }
  // Start with the base data point structure
  const dataPointBaseXml = buildDataPointBase(dataPoint);
  const dataPointXml = dataPointBaseXml;

  // Include optional modbusDataPointConfiguration
  if (dataPoint.modbusDataPointConfiguration) {
    dataPointXml.modbusDataPointConfiguration = wrapInArray(
      buildModbusDataPointConfiguration(dataPoint.modbusDataPointConfiguration)
    );
  }

  // Include optional blockCacheIdentification
  setOptionalXmlField(dataPointXml, "blockCacheIdentification", dataPoint.blockCacheIdentification);

  // Include optional modbusAttributes
  if (dataPoint.modbusAttributes) {
    const modbusAttributesXml = buildModbusAttributes(dataPoint.modbusAttributes);
    if (modbusAttributesXml) {
      dataPointXml.modbusAttributes = wrapInArray(modbusAttributesXml);
    }
  }

  return dataPointXml;
}
