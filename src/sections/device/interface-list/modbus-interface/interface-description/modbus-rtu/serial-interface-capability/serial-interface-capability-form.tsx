"use client";

import { FormSection } from "@/components/forms/form-section";
import { SelectField } from "@/components/forms/select-field";
import { ArrayField } from "@/components/forms/array-field";
import { FormGroup } from "@/components/forms/form-group";
import { useDeviceFormContext, buildDeviceFieldPath } from "@/context/device-form-context";
import {
  BaudRate,
  ByteLength,
  Parity,
  StopBitLength,
  BAUD_RATE_VALUES,
  BYTE_LENGTH_VALUES,
  PARITY_VALUES,
  STOP_BIT_LENGTH_VALUES,
} from "@/models/generic/base-types";
import { createFormOptions } from "@/models/form-options-helper";

const BAUD_RATE_OPTIONS = createFormOptions(BAUD_RATE_VALUES);
const BYTE_LENGTH_OPTIONS = createFormOptions(BYTE_LENGTH_VALUES);
const PARITY_OPTIONS = createFormOptions(PARITY_VALUES);
const STOP_BIT_LENGTH_OPTIONS = createFormOptions(STOP_BIT_LENGTH_VALUES);

export function SerialInterfaceCapabilityForm() {
  const { useDeviceState, useValidation, serialInterfaceCapabilityActions, pathPrefix } =
    useDeviceFormContext();

  const serialInterfaceCapability = useDeviceState(
    (d) =>
      d?.interfaceList?.modbusInterface?.modbusInterfaceDescription?.modbusRtu
        ?.serialInterfaceCapability
  );
  const { getError } = useValidation();

  const fieldPath = (field: string) =>
    buildDeviceFieldPath(
      pathPrefix,
      `interfaceList.modbusInterface.modbusInterfaceDescription.modbusRtu.serialInterfaceCapability.${field}`
    );

  if (!serialInterfaceCapability) {
    return null;
  }

  return (
    <FormSection
      title="Serial Interface Capability"
      description="Configure supported serial interface capabilities"
      required={true}
      nested={true}
    >
      <ArrayField
        label="Baud Rates Supported"
        items={serialInterfaceCapability.baudRatesSupported || []}
        onAdd={() => {
          const existing = serialInterfaceCapability.baudRatesSupported || [];
          const available = BAUD_RATE_VALUES.find((rate) => !existing.includes(rate));
          if (available) {
            serialInterfaceCapabilityActions.addBaudRateSupported(available);
          }
        }}
        onRemove={(index) => serialInterfaceCapabilityActions.removeBaudRateSupported(index)}
        emptyMessage="No baud rates added"
        renderItem={(rate, index) => (
          <FormGroup>
            <SelectField
              label="Baud Rate"
              name={`baudRate-${index}`}
              required={true}
              options={BAUD_RATE_OPTIONS}
              value={rate}
              onChange={(value) => {
                serialInterfaceCapabilityActions.removeBaudRateSupported(index);
                serialInterfaceCapabilityActions.addBaudRateSupported(value as BaudRate);
              }}
              error={getError(`baudRatesSupported.${index}`)}
            />
          </FormGroup>
        )}
      />

      <ArrayField
        label="Byte Lengths Supported"
        items={serialInterfaceCapability.byteLenSupported || []}
        onAdd={() => {
          const existing = serialInterfaceCapability.byteLenSupported || [];
          const available = BYTE_LENGTH_VALUES.find((len) => !existing.includes(len));
          if (available) {
            serialInterfaceCapabilityActions.addByteLenSupported(available);
          }
        }}
        onRemove={(index) => serialInterfaceCapabilityActions.removeByteLenSupported(index)}
        emptyMessage="No byte lengths added"
        renderItem={(len, index) => (
          <FormGroup>
            <SelectField
              label="Byte Length"
              name={`byteLen-${index}`}
              required={true}
              options={BYTE_LENGTH_OPTIONS}
              value={len}
              onChange={(value) => {
                serialInterfaceCapabilityActions.removeByteLenSupported(index);
                serialInterfaceCapabilityActions.addByteLenSupported(value as ByteLength);
              }}
              error={getError(`byteLenSupported.${index}`)}
            />
          </FormGroup>
        )}
      />

      <ArrayField
        label="Parity Options Supported"
        items={serialInterfaceCapability.paritySupported || []}
        onAdd={() => {
          const existing = serialInterfaceCapability.paritySupported || [];
          const available = PARITY_VALUES.find((parity) => !existing.includes(parity));
          if (available) {
            serialInterfaceCapabilityActions.addParitySupported(available);
          }
        }}
        onRemove={(index) => serialInterfaceCapabilityActions.removeParitySupported(index)}
        emptyMessage="No parity options added"
        renderItem={(parity, index) => (
          <FormGroup>
            <SelectField
              label="Parity"
              name={`parity-${index}`}
              required={true}
              options={PARITY_OPTIONS}
              value={parity}
              onChange={(value) => {
                serialInterfaceCapabilityActions.removeParitySupported(index);
                serialInterfaceCapabilityActions.addParitySupported(value as Parity);
              }}
              error={getError(`paritySupported.${index}`)}
            />
          </FormGroup>
        )}
      />

      <ArrayField
        label="Stop Bit Lengths Supported"
        items={serialInterfaceCapability.stopBitLenSupported || []}
        onAdd={() => {
          const existing = serialInterfaceCapability.stopBitLenSupported || [];
          const available = STOP_BIT_LENGTH_VALUES.find((len) => !existing.includes(len));
          if (available) {
            serialInterfaceCapabilityActions.addStopBitLenSupported(available);
          }
        }}
        onRemove={(index) => serialInterfaceCapabilityActions.removeStopBitLenSupported(index)}
        emptyMessage="No stop bit lengths added"
        renderItem={(len, index) => (
          <FormGroup>
            <SelectField
              label="Stop Bit Length"
              name={`stopBitLen-${index}`}
              required={true}
              options={STOP_BIT_LENGTH_OPTIONS}
              value={len}
              onChange={(value) => {
                serialInterfaceCapabilityActions.removeStopBitLenSupported(index);
                serialInterfaceCapabilityActions.addStopBitLenSupported(value as StopBitLength);
              }}
              error={getError(`stopBitLenSupported.${index}`)}
            />
          </FormGroup>
        )}
      />
    </FormSection>
  );
}
