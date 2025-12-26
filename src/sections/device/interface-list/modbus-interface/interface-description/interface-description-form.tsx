"use client";

import { FormSection } from "@/components/forms/form-section";
import { SelectField } from "@/components/forms/select-field";
import { FormGroup } from "@/components/forms/form-group";
import { useDeviceFormContext, buildDeviceFieldPath } from "@/context/device-form-context";
import {
  ModbusInterfaceSelection,
  MODBUS_INTERFACE_SELECTION_VALUES,
  BitOrder,
  BIT_ORDER_VALUES,
} from "@/models/product/modbus-types";
import { BOOLEAN_OPTIONS } from "@/models/generic";
import { createFormOptions } from "@/models/form-options-helper";
import { ModbusTcpForm } from "./modbus-tcp/modbus-tcp-form";
import { ModbusRtuForm } from "./modbus-rtu/modbus-rtu-form";
import { MasterFunctionsSupportedListForm } from "./master-functions-supported-list/master-functions-supported-list-form";

const MODBUS_INTERFACE_SELECTION_OPTIONS = createFormOptions(MODBUS_INTERFACE_SELECTION_VALUES);
const BIT_ORDER_OPTIONS = createFormOptions(BIT_ORDER_VALUES);

export function ModbusInterfaceDescriptionForm() {
  const { useDeviceState, useValidation, modbusInterfaceDescriptionActions, pathPrefix } =
    useDeviceFormContext();

  const modbusInterfaceDescription = useDeviceState(
    (d) => d?.interfaceList?.modbusInterface?.modbusInterfaceDescription
  );
  const { getError } = useValidation();

  if (!modbusInterfaceDescription) {
    return null;
  }

  const fieldPath = (field: string) =>
    buildDeviceFieldPath(
      pathPrefix,
      `interfaceList.modbusInterface.modbusInterfaceDescription.${field}`
    );

  return (
    <FormSection
      title="Modbus Interface Description"
      description="Configure the Modbus interface description settings"
      required={true}
      nested={true}
    >
      <FormGroup>
        <SelectField
          label="Modbus Interface Selection"
          name="modbusInterfaceSelection"
          required={true}
          options={MODBUS_INTERFACE_SELECTION_OPTIONS}
          value={modbusInterfaceDescription.modbusInterfaceSelection}
          onChange={(value) =>
            modbusInterfaceDescriptionActions.updateModbusInterfaceSelection(
              value as ModbusInterfaceSelection
            )
          }
          error={getError(fieldPath("modbusInterfaceSelection"))}
        />
        <SelectField
          label="First Register Address Is One"
          name="firstRegisterAddressIsOne"
          required={true}
          options={BOOLEAN_OPTIONS}
          value={modbusInterfaceDescription.firstRegisterAddressIsOne.toString()}
          onChange={(value) =>
            modbusInterfaceDescriptionActions.updateFirstRegisterAddressIsOne(value === "true")
          }
          error={getError(fieldPath("firstRegisterAddressIsOne"))}
        />
      </FormGroup>

      <FormGroup>
        <SelectField
          label="Bit Order"
          name="bitOrder"
          required={true}
          options={BIT_ORDER_OPTIONS}
          value={modbusInterfaceDescription.bitOrder}
          onChange={(value) => modbusInterfaceDescriptionActions.updateBitOrder(value as BitOrder)}
          error={getError(fieldPath("bitOrder"))}
        />
      </FormGroup>

      <ModbusTcpForm />
      <ModbusRtuForm />
      <MasterFunctionsSupportedListForm />
    </FormSection>
  );
}
