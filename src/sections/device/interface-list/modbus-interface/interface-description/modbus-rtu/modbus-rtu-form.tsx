"use client";

import { FormSection } from "@/components/forms/form-section";
import { InputField } from "@/components/forms/input-field";
import { ComboboxField } from "@/components/forms/combobox-field";
import { FormGroup } from "@/components/forms/form-group";
import { useDeviceFormContext, buildDeviceFieldPath } from "@/context/device-form-context";
import {
  BAUD_RATE_VALUES,
  BYTE_LENGTH_VALUES,
  PARITY_VALUES,
  STOP_BIT_LENGTH_VALUES,
} from "@/models/generic/base-types";
import { createFormOptions } from "@/models/form-options-helper";
import { SerialInterfaceCapabilityForm } from "./serial-interface-capability/serial-interface-capability-form";

const BAUD_RATE_OPTIONS = createFormOptions(BAUD_RATE_VALUES);
const BYTE_LENGTH_OPTIONS = createFormOptions(BYTE_LENGTH_VALUES);
const PARITY_OPTIONS = createFormOptions(PARITY_VALUES);
const STOP_BIT_LENGTH_OPTIONS = createFormOptions(STOP_BIT_LENGTH_VALUES);

export function ModbusRtuForm() {
  const { useDeviceState, useValidation, modbusRtuActions, pathPrefix } = useDeviceFormContext();

  const modbusRtu = useDeviceState(
    (d) => d?.interfaceList?.modbusInterface?.modbusInterfaceDescription?.modbusRtu
  );
  const { getError } = useValidation();

  const fieldPath = (field: string) =>
    buildDeviceFieldPath(
      pathPrefix,
      `interfaceList.modbusInterface.modbusInterfaceDescription.modbusRtu.${field}`
    );

  return (
    <FormSection
      title="Modbus RTU"
      description="Configure Modbus RTU settings"
      required={false}
      isAdded={!!modbusRtu}
      onAdd={() => modbusRtuActions.addModbusRtu()}
      onRemove={() => modbusRtuActions.removeModbusRtu()}
      nested={true}
    >
      {modbusRtu && (
        <>
          <FormGroup>
            <InputField
              label="Slave Address"
              name="modbusRtuSlaveAddr"
              required={true}
              type="text"
              value={modbusRtu.slaveAddr}
              onChange={(value) => modbusRtuActions.updateSlaveAddr(value)}
              placeholder="Enter slave address"
              error={getError(fieldPath("slaveAddr"))}
            />
            <InputField
              label="Port Name"
              name="modbusRtuPortName"
              required={true}
              type="text"
              value={modbusRtu.portName}
              onChange={(value) => modbusRtuActions.updatePortName(value)}
              placeholder="Enter port name"
              error={getError(fieldPath("portName"))}
            />
          </FormGroup>

          <FormGroup>
            <ComboboxField
              label="Baud Rate Selected"
              name="modbusRtuBaudRateSelected"
              required={true}
              options={BAUD_RATE_OPTIONS}
              value={modbusRtu.baudRateSelected}
              onChange={(value) => modbusRtuActions.updateBaudRateSelected(value)}
              placeholder="Select baud rate or enter template (e.g., {{serial_baudrate}})"
              error={getError(fieldPath("baudRateSelected"))}
            />
            <ComboboxField
              label="Byte Length Selected"
              name="modbusRtuByteLenSelected"
              required={true}
              options={BYTE_LENGTH_OPTIONS}
              value={modbusRtu.byteLenSelected}
              onChange={(value) => modbusRtuActions.updateByteLenSelected(value)}
              placeholder="Select byte length or enter template (e.g., {{serial_databits}})"
              error={getError(fieldPath("byteLenSelected"))}
            />
          </FormGroup>

          <FormGroup>
            <ComboboxField
              label="Parity Selected"
              name="modbusRtuParitySelected"
              required={true}
              options={PARITY_OPTIONS}
              value={modbusRtu.paritySelected}
              onChange={(value) => modbusRtuActions.updateParitySelected(value)}
              placeholder="Select parity or enter template (e.g., {{serial_parity}})"
              error={getError(fieldPath("paritySelected"))}
            />
            <ComboboxField
              label="Stop Bit Length Selected"
              name="modbusRtuStopBitLenSelected"
              required={true}
              options={STOP_BIT_LENGTH_OPTIONS}
              value={modbusRtu.stopBitLenSelected}
              onChange={(value) => modbusRtuActions.updateStopBitLenSelected(value)}
              placeholder="Select stop bit length or enter template (e.g., {{serial_stopbits}})"
              error={getError(fieldPath("stopBitLenSelected"))}
            />
          </FormGroup>

          <SerialInterfaceCapabilityForm />
        </>
      )}
    </FormSection>
  );
}
