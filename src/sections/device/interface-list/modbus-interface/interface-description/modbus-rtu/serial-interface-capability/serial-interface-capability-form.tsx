"use client";

import { FormSection } from "@/components/forms/form-section";
import { SelectField } from "@/components/forms/select-field";
import { ArrayField } from "@/components/forms/array-field";
import { FormGroup } from "@/components/forms/form-group";
import { useDeviceStore } from "@/sections/device/device-store";
import { useDeviceValidation } from "@/hooks/use-validation";
import { useShallow } from "zustand/react/shallow";
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
import { createFormOptions } from "@/utils/form-options-utils";

const BAUD_RATE_OPTIONS = createFormOptions(BAUD_RATE_VALUES);
const BYTE_LENGTH_OPTIONS = createFormOptions(BYTE_LENGTH_VALUES);
const PARITY_OPTIONS = createFormOptions(PARITY_VALUES);
const STOP_BIT_LENGTH_OPTIONS = createFormOptions(STOP_BIT_LENGTH_VALUES);

export function SerialInterfaceCapabilityForm() {
  const { getError } = useDeviceValidation();
  const store = useDeviceStore.getState();

  const serialInterfaceCapability = useDeviceStore(
    useShallow(
      (state) =>
        state.device?.interfaceList?.modbusInterface?.modbusInterfaceDescription?.modbusRtu?.serialInterfaceCapability
    )
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
            store.addBaudRateSupported(available);
          }
        }}
        onRemove={(index) => store.removeBaudRateSupported(index)}
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
                store.removeBaudRateSupported(index);
                store.addBaudRateSupported(value as BaudRate);
              }}
              error={getError(`baudRatesSupported[${index}]`)}
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
            store.addByteLenSupported(available);
          }
        }}
        onRemove={(index) => store.removeByteLenSupported(index)}
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
                store.removeByteLenSupported(index);
                store.addByteLenSupported(value as ByteLength);
              }}
              error={getError(`byteLenSupported[${index}]`)}
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
            store.addParitySupported(available);
          }
        }}
        onRemove={(index) => store.removeParitySupported(index)}
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
                store.removeParitySupported(index);
                store.addParitySupported(value as Parity);
              }}
              error={getError(`paritySupported[${index}]`)}
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
            store.addStopBitLenSupported(available);
          }
        }}
        onRemove={(index) => store.removeStopBitLenSupported(index)}
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
                store.removeStopBitLenSupported(index);
                store.addStopBitLenSupported(value as StopBitLength);
              }}
              error={getError(`stopBitLenSupported[${index}]`)}
            />
          </FormGroup>
        )}
      />
    </FormSection>
  );
}
