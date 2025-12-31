"use client";

import { FormSection } from "@/components/forms/form-section";
import { InputField } from "@/components/forms/input-field";
import { FormGroup } from "@/components/forms/form-group";
import { useDeviceFormContext, buildDeviceFieldPath } from "@/context/device-form-context";

export function ModbusTcpForm() {
  const { useDeviceState, useValidation, modbusTcpActions, pathPrefix } = useDeviceFormContext();

  const modbusTcp = useDeviceState((d) => d?.interfaceList?.modbusInterface?.modbusInterfaceDescription?.modbusTcp);
  const { getError } = useValidation();

  const fieldPath = (field: string) =>
    buildDeviceFieldPath(pathPrefix, `interfaceList.modbusInterface.modbusInterfaceDescription.modbusTcp.${field}`);

  return (
    <FormSection
      title="Modbus TCP"
      description="Configure Modbus TCP/IP settings"
      required={false}
      isAdded={!!modbusTcp}
      onAdd={() => modbusTcpActions.addModbusTcp()}
      onRemove={() => modbusTcpActions.removeModbusTcp()}
      nested={true}
    >
      {modbusTcp && (
        <FormGroup>
          <InputField
            label="Port"
            name="modbusTcpPort"
            required={true}
            type="text"
            value={modbusTcp.port}
            onChange={(value) => modbusTcpActions.updatePort(value)}
            placeholder="Enter port"
            error={getError(fieldPath("port"))}
          />
          <InputField
            label="IP Address"
            name="modbusTcpAddress"
            required={true}
            type="text"
            value={modbusTcp.address}
            onChange={(value) => modbusTcpActions.updateAddress(value)}
            placeholder="Enter IP address"
            error={getError(fieldPath("address"))}
          />
          <InputField
            label="Slave ID"
            name="modbusTcpSlaveId"
            required={true}
            type="text"
            value={modbusTcp.slaveId}
            onChange={(value) => modbusTcpActions.updateSlaveId(value)}
            placeholder="Enter slave ID"
            error={getError(fieldPath("slaveId"))}
          />
        </FormGroup>
      )}
    </FormSection>
  );
}
