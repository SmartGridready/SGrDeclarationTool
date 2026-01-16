"use client";

import { FormSection } from "@/components/forms/form-section";
import { InputField } from "@/components/forms/input-field";
import { FormGroup } from "@/components/forms/form-group";
import { useDeviceStore } from "@/sections/device/device-store";
import { useDeviceValidation } from "@/hooks/use-validation";
import { useDeviceField } from "@/hooks/use-store-field";

export function ModbusTcpForm() {
  // Granular selector
  const modbusTcp = useDeviceField((d) => d?.interfaceList?.modbusInterface?.modbusInterfaceDescription?.modbusTcp);
  const { getError } = useDeviceValidation();
  const store = useDeviceStore.getState();

  const fieldPath = (field: string) => `interfaceList.modbusInterface.modbusInterfaceDescription.modbusTcp.${field}`;

  return (
    <FormSection
      title="Modbus TCP"
      description="Configure Modbus TCP/IP settings"
      required={false}
      isAdded={!!modbusTcp}
      onAdd={() => store.addModbusTcp()}
      onRemove={() => store.removeModbusTcp()}
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
            onChange={(value) => store.updatePort(value)}
            placeholder="Enter port"
            error={getError(fieldPath("port"))}
          />
          <InputField
            label="IP Address"
            name="modbusTcpAddress"
            required={true}
            type="text"
            value={modbusTcp.address}
            onChange={(value) => store.updateAddress(value)}
            placeholder="Enter IP address"
            error={getError(fieldPath("address"))}
          />
          <InputField
            label="Slave ID"
            name="modbusTcpSlaveId"
            required={true}
            type="text"
            value={modbusTcp.slaveId}
            onChange={(value) => store.updateSlaveId(value)}
            placeholder="Enter slave ID"
            error={getError(fieldPath("slaveId"))}
          />
          <InputField
            label="Timeout"
            name="modbusTcpTimeout"
            required={false}
            type="text"
            value={modbusTcp.timeout || ""}
            onChange={(value) => store.updateTimeout(value)}
            placeholder="Enter timeout (optional)"
            error={getError(fieldPath("timeout"))}
          />
        </FormGroup>
      )}
    </FormSection>
  );
}
