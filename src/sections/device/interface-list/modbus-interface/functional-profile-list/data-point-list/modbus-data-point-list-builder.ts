import { ModbusDataPointList, ModbusDataPoint } from "@/models/product/modbus-interface";
import { buildDataPointBase } from "@/sections/shared/data-point-base/data-point-base-builder";
import { buildModbusAttributes } from "@/sections/shared/modbus-attributes/modbus-attributes-builder";
import { buildModbusDataPointConfiguration } from "./modbus-data-point-configuration/modbus-data-point-configuration-builder";
import { wrapInArray, setOptionalXmlField } from "@/utils/builder-utils";

/**
 * Builds XML object for dataPointList from ModbusDataPointList model
 */
export function buildModbusDataPointList(
  dataPointList: ModbusDataPointList
): Record<string, unknown> {
  const listXml: Record<string, unknown> = {
    dataPointListElement: dataPointList.dataPointListElement.map((dataPoint) =>
      buildModbusDataPoint(dataPoint)
    ),
  };

  return listXml;
}

/**
 * Builds XML object for dataPointListElement from ModbusDataPoint model
 */
function buildModbusDataPoint(dataPoint: ModbusDataPoint): Record<string, unknown> {
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
