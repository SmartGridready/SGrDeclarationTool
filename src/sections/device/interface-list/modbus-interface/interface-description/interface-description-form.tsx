"use client";

import { FormSection } from "@/components/forms/form-section";
import { SelectField } from "@/components/forms/select-field";
import { FormGroup } from "@/components/forms/form-group";
import { useDeviceStore } from "@/sections/device/device-store";
import { useDeviceValidation } from "@/hooks/use-validation";
import { useShallow } from "zustand/react/shallow";
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
  const modbusInterfaceDescription = useDeviceStore(
    useShallow((state) => state.device?.interfaceList?.modbusInterface?.modbusInterfaceDescription)
  );
  const { getError } = useDeviceValidation();
  const store = useDeviceStore.getState();

  if (!modbusInterfaceDescription) {
    return null;
  }

  const fieldPath = (field: string) => `interfaceList.modbusInterface.modbusInterfaceDescription.${field}`;

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
          onChange={(value) => store.updateModbusInterfaceSelection(value as ModbusInterfaceSelection)}
          error={getError(fieldPath("modbusInterfaceSelection"))}
        />
        <SelectField
          label="First Register Address Is One"
          name="firstRegisterAddressIsOne"
          required={true}
          options={BOOLEAN_OPTIONS}
          value={modbusInterfaceDescription.firstRegisterAddressIsOne.toString()}
          onChange={(value) => store.updateFirstRegisterAddressIsOne(value === "true")}
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
          onChange={(value) => store.updateBitOrder(value as BitOrder)}
          error={getError(fieldPath("bitOrder"))}
        />
      </FormGroup>

      <ModbusTcpForm />
      <ModbusRtuForm />
      <MasterFunctionsSupportedListForm />
    </FormSection>
  );
}
