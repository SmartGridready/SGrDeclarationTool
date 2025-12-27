import { ModbusInterfaceDescription } from "@/models/product/modbus-types";
import { buildModbusTcp } from "./modbus-tcp/modbus-tcp-builder";
import { buildModbusRtu } from "./modbus-rtu/modbus-rtu-builder";
import { buildMasterFunctionsSupportedList } from "./master-functions-supported-list/master-functions-supported-list-builder";
import { wrapInArray, setOptionalXmlField } from "@/utils/builder-utils";
import { validateModbusInterfaceDescription } from "./interface-description-schema";

/**
 * Builds XML object for modbusInterfaceDescription from ModbusInterfaceDescription model
 * @throws Error if required fields are missing
 */
export function buildModbusInterfaceDescription(
  description: ModbusInterfaceDescription
): Record<string, unknown> {
  // Validate using validation layer
  const validation = validateModbusInterfaceDescription(description);
  if (!validation.success) {
    const firstError = validation.errors?.issues[0];
    const errorMessage =
      firstError?.message || "Validation failed for modbus interface description";
    throw new Error(errorMessage);
  }
  const descriptionXml: Record<string, unknown> = {
    modbusInterfaceSelection: wrapInArray(description.modbusInterfaceSelection),
  };

  // Include optional modbusTcp (must come before firstRegisterAddressIsOne)
  if (description.modbusTcp) {
    descriptionXml.modbusTcp = wrapInArray(buildModbusTcp(description.modbusTcp));
  }

  // Include optional modbusRtu (must come before firstRegisterAddressIsOne)
  if (description.modbusRtu) {
    descriptionXml.modbusRtu = wrapInArray(buildModbusRtu(description.modbusRtu));
  }

  // Required fields (must come after modbusTcp/modbusRtu)
  descriptionXml.firstRegisterAddressIsOne = wrapInArray(
    description.firstRegisterAddressIsOne.toString()
  );
  descriptionXml.bitOrder = wrapInArray(description.bitOrder);

  // Include optional masterFunctionsSupportedList (must come last)
  if (description.masterFunctionsSupportedList) {
    descriptionXml.masterFunctionsSupportedList = wrapInArray(
      buildMasterFunctionsSupportedList(description.masterFunctionsSupportedList)
    );
  }

  return descriptionXml;
}
