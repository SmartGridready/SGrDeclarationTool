"use client";

import { ReactNode, useMemo } from "react";
import { useShallow } from "zustand/react/shallow";
import { DeviceFormProvider, DeviceFormContextValue } from "@/context/device-form-context";
import { useDeviceStore, DeviceStoreState } from "@/sections/device/device-store";
import { useDeviceValidation } from "@/hooks/use-device-validation";

interface StandaloneDeviceFormProviderProps {
  children: ReactNode;
}

/**
 * Custom hook for standalone device state selection with shallow comparison.
 * Uses useShallow to prevent infinite loops when selectors return objects.
 * Defined at module level so it's a stable reference.
 */
function useStandaloneDeviceState<T>(selector: (device: DeviceStoreState["device"]) => T): T {
  // Use useShallow to do shallow comparison of returned objects
  return useDeviceStore(useShallow((state) => selector(state.device)));
}

/**
 * Provider for standalone Device editor.
 * Wraps the useDeviceStore to provide the DeviceFormContext.
 */
export function StandaloneDeviceFormProvider({ children }: StandaloneDeviceFormProviderProps) {
  // Get actions from the store (these are stable references)
  const store = useDeviceStore();

  // Create the context value with memoization for actions only
  const contextValue = useMemo<DeviceFormContextValue>(() => {
    return {
      // State selector hook - stable reference defined at module level
      useDeviceState: useStandaloneDeviceState,

      // Validation hook
      useValidation: useDeviceValidation,

      // No prefix for standalone device
      pathPrefix: "",

      // Device identification actions
      deviceIdentificationActions: {
        updateDeviceName: store.updateDeviceName,
        updateManufacturerName: store.updateManufacturerName,
        updateSpecificationOwnerIdentification: store.updateSpecificationOwnerIdentification,
      },

      // Device information actions (includes all sub-slices)
      deviceInformationActions: {
        // Core device info
        updateDeviceCategory: store.updateDeviceCategory,
        updateIsLocalControl: store.updateIsLocalControl,
        updateSoftwareRevision: store.updateSoftwareRevision,
        updateHardwareRevision: store.updateHardwareRevision,
        updateBrandName: store.updateBrandName,
        updatePowerSource: store.updatePowerSource,
        updateNominalPower: store.updateNominalPower,
        updateManufacturerSpecificationIdentification:
          store.updateManufacturerSpecificationIdentification,
        updateManufacturerLabel: store.updateManufacturerLabel,
        updateGeneralRemarks: store.updateGeneralRemarks,
        updateLevelOfOperation: store.updateLevelOfOperation,
        updatePrimaryVersionNumber: store.updatePrimaryVersionNumber,
        updateSecondaryVersionNumber: store.updateSecondaryVersionNumber,
        updateSubReleaseVersionNumber: store.updateSubReleaseVersionNumber,
        updateTestState: store.updateTestState,
        // Alternative names (composed) - using shared interface
        addAlternativeNames: store.addAlternativeNames,
        removeAlternativeNames: store.removeAlternativeNames,
        updateSLV1Name: store.updateSLV1Name,
        updateWorkName: store.updateWorkName,
        updateManufName: store.updateManufName,
        updateIec61850Name: store.updateIec61850Name,
        updateSarefName: store.updateSarefName,
        updateEebusName: store.updateEebusName,
        updateSunSpecName: store.updateSunSpecName,
        updateHpBwpName: store.updateHpBwpName,
        updateEn17609Name: store.updateEn17609Name,
        // Legible description (composed) - using shared interface
        addLegibleDescription: store.addLegibleDescription,
        removeLegibleDescription: store.removeLegibleDescription,
        removeAllLegibleDescriptions: store.removeAllLegibleDescriptions,
        updateTextElement: store.updateTextElement,
        updateLanguage: store.updateLanguage,
        updateUri: store.updateUri,
        addEmptyLegibleDescription: store.addEmptyLegibleDescription,
        // Programmer hints (composed) - using shared pattern
        addProgrammerHint: store.addProgrammerHint,
        removeProgrammerHint: store.removeProgrammerHint,
        removeAllProgrammerHints: store.removeAllProgrammerHints,
        updateProgrammerHintTextElement: store.updateProgrammerHintTextElement,
        updateProgrammerHintLanguage: store.updateProgrammerHintLanguage,
        updateProgrammerHintUri: store.updateProgrammerHintUri,
        addEmptyProgrammerHint: store.addEmptyProgrammerHint,
      },

      // Release notes actions
      releaseNotesActions: {
        addReleaseNotes: store.addReleaseNotes,
        removeReleaseNotes: store.removeReleaseNotes,
        updateReleaseState: store.updateReleaseState,
        updateRemarks: store.updateRemarks,
        addChangeLog: store.addChangeLog,
        removeChangeLog: store.removeChangeLog,
        updateChangeLogField: store.updateChangeLogField,
        addEmptyChangeLog: store.addEmptyChangeLog,
      },

      // Configuration list actions
      configurationListActions: {
        addConfigurationList: store.addConfigurationList,
        removeConfigurationList: store.removeConfigurationList,
        addConfigurationListElement: store.addConfigurationListElement,
        removeConfigurationListElement: store.removeConfigurationListElement,
        updateConfigurationListElementName: store.updateConfigurationListElementName,
        updateConfigurationListElementDataType: store.updateConfigurationListElementDataType,
        updateConfigurationListElementDefaultValue:
          store.updateConfigurationListElementDefaultValue,
        // Enum actions
        setConfigurationListEnumDataType: store.setConfigurationListEnumDataType,
        addConfigurationListEnumEntry: store.addConfigurationListEnumEntry,
        removeConfigurationListEnumEntry: store.removeConfigurationListEnumEntry,
        updateConfigurationListEnumEntryLiteral: store.updateConfigurationListEnumEntryLiteral,
        updateConfigurationListEnumEntryOrdinal: store.updateConfigurationListEnumEntryOrdinal,
        updateConfigurationListEnumEntryDescription:
          store.updateConfigurationListEnumEntryDescription,
        updateConfigurationListEnumHexMask: store.updateConfigurationListEnumHexMask,
        addEmptyConfigurationListEnumEntry: store.addEmptyConfigurationListEnumEntry,
        // Bitmap actions
        setConfigurationListBitmapDataType: store.setConfigurationListBitmapDataType,
        addConfigurationListBitmapEntry: store.addConfigurationListBitmapEntry,
        removeConfigurationListBitmapEntry: store.removeConfigurationListBitmapEntry,
        updateConfigurationListBitmapEntryLiteral: store.updateConfigurationListBitmapEntryLiteral,
        updateConfigurationListBitmapEntryHexMask: store.updateConfigurationListBitmapEntryHexMask,
        updateConfigurationListBitmapEntryDescription:
          store.updateConfigurationListBitmapEntryDescription,
        addEmptyConfigurationListBitmapEntry: store.addEmptyConfigurationListBitmapEntry,
        // Description actions
        addConfigurationDescription: store.addConfigurationDescription,
        removeConfigurationDescription: store.removeConfigurationDescription,
        updateConfigurationDescriptionText: store.updateConfigurationDescriptionText,
        updateConfigurationDescriptionLanguage: store.updateConfigurationDescriptionLanguage,
        updateConfigurationDescriptionUri: store.updateConfigurationDescriptionUri,
        updateConfigurationDescriptionLabel: store.updateConfigurationDescriptionLabel,
        addEmptyConfigurationDescription: store.addEmptyConfigurationDescription,
      },

      // Generic attribute list actions
      genericAttributeListActions: {
        addGenericAttributeList: store.addGenericAttributeList,
        removeGenericAttributeList: store.removeGenericAttributeList,
        addGenericAttributeListElement: store.addGenericAttributeListElement,
        removeGenericAttributeListElement: store.removeGenericAttributeListElement,
        updateGenericAttributeListElementName: store.updateGenericAttributeListElementName,
        // Simple attribute actions
        setGenericAttributeListElementAsSimple: store.setGenericAttributeListElementAsSimple,
        updateGenericAttributeListElementDataType: store.updateGenericAttributeListElementDataType,
        updateGenericAttributeListElementValue: store.updateGenericAttributeListElementValue,
        updateGenericAttributeListElementUnit: store.updateGenericAttributeListElementUnit,
        // Nested attribute actions
        setGenericAttributeListElementAsNested: store.setGenericAttributeListElementAsNested,
        addNestedGenericAttributeListElement: store.addNestedGenericAttributeListElement,
        removeNestedGenericAttributeListElement: store.removeNestedGenericAttributeListElement,
        updateNestedGenericAttributeListElementName:
          store.updateNestedGenericAttributeListElementName,
        updateNestedGenericAttributeListElementDataType:
          store.updateNestedGenericAttributeListElementDataType,
        updateNestedGenericAttributeListElementValue:
          store.updateNestedGenericAttributeListElementValue,
        updateNestedGenericAttributeListElementUnit:
          store.updateNestedGenericAttributeListElementUnit,
        // Simple enum actions
        setGenericAttributeListSimpleEnumDataType: store.setGenericAttributeListSimpleEnumDataType,
        addGenericAttributeListSimpleEnumEntry: store.addGenericAttributeListSimpleEnumEntry,
        removeGenericAttributeListSimpleEnumEntry: store.removeGenericAttributeListSimpleEnumEntry,
        updateGenericAttributeListSimpleEnumEntryLiteral:
          store.updateGenericAttributeListSimpleEnumEntryLiteral,
        updateGenericAttributeListSimpleEnumEntryOrdinal:
          store.updateGenericAttributeListSimpleEnumEntryOrdinal,
        updateGenericAttributeListSimpleEnumEntryDescription:
          store.updateGenericAttributeListSimpleEnumEntryDescription,
        updateGenericAttributeListSimpleEnumHexMask:
          store.updateGenericAttributeListSimpleEnumHexMask,
        addEmptyGenericAttributeListSimpleEnumEntry:
          store.addEmptyGenericAttributeListSimpleEnumEntry,
        // Simple bitmap actions
        setGenericAttributeListSimpleBitmapDataType:
          store.setGenericAttributeListSimpleBitmapDataType,
        addGenericAttributeListSimpleBitmapEntry: store.addGenericAttributeListSimpleBitmapEntry,
        removeGenericAttributeListSimpleBitmapEntry:
          store.removeGenericAttributeListSimpleBitmapEntry,
        updateGenericAttributeListSimpleBitmapEntryLiteral:
          store.updateGenericAttributeListSimpleBitmapEntryLiteral,
        updateGenericAttributeListSimpleBitmapEntryHexMask:
          store.updateGenericAttributeListSimpleBitmapEntryHexMask,
        updateGenericAttributeListSimpleBitmapEntryDescription:
          store.updateGenericAttributeListSimpleBitmapEntryDescription,
        addEmptyGenericAttributeListSimpleBitmapEntry:
          store.addEmptyGenericAttributeListSimpleBitmapEntry,
        // Nested enum actions
        setGenericAttributeListNestedEnumDataType: store.setGenericAttributeListNestedEnumDataType,
        addGenericAttributeListNestedEnumEntry: store.addGenericAttributeListNestedEnumEntry,
        removeGenericAttributeListNestedEnumEntry: store.removeGenericAttributeListNestedEnumEntry,
        updateGenericAttributeListNestedEnumEntryLiteral:
          store.updateGenericAttributeListNestedEnumEntryLiteral,
        updateGenericAttributeListNestedEnumEntryOrdinal:
          store.updateGenericAttributeListNestedEnumEntryOrdinal,
        updateGenericAttributeListNestedEnumEntryDescription:
          store.updateGenericAttributeListNestedEnumEntryDescription,
        updateGenericAttributeListNestedEnumHexMask:
          store.updateGenericAttributeListNestedEnumHexMask,
        addEmptyGenericAttributeListNestedEnumEntry:
          store.addEmptyGenericAttributeListNestedEnumEntry,
        // Nested bitmap actions
        setGenericAttributeListNestedBitmapDataType:
          store.setGenericAttributeListNestedBitmapDataType,
        addGenericAttributeListNestedBitmapEntry: store.addGenericAttributeListNestedBitmapEntry,
        removeGenericAttributeListNestedBitmapEntry:
          store.removeGenericAttributeListNestedBitmapEntry,
        updateGenericAttributeListNestedBitmapEntryLiteral:
          store.updateGenericAttributeListNestedBitmapEntryLiteral,
        updateGenericAttributeListNestedBitmapEntryHexMask:
          store.updateGenericAttributeListNestedBitmapEntryHexMask,
        updateGenericAttributeListNestedBitmapEntryDescription:
          store.updateGenericAttributeListNestedBitmapEntryDescription,
        addEmptyGenericAttributeListNestedBitmapEntry:
          store.addEmptyGenericAttributeListNestedBitmapEntry,
      },

      // Interface list actions
      interfaceListActions: {
        setInterfaceType: store.setInterfaceType,
        // Modbus interface description actions are included through slice composition
        updateModbusInterfaceSelection: store.updateModbusInterfaceSelection,
        updateFirstRegisterAddressIsOne: store.updateFirstRegisterAddressIsOne,
        updateBitOrder: store.updateBitOrder,
        // Modbus TCP actions
        addModbusTcp: store.addModbusTcp,
        removeModbusTcp: store.removeModbusTcp,
        updatePort: store.updatePort,
        updateAddress: store.updateAddress,
        updateSlaveId: store.updateSlaveId,
        // Modbus RTU actions
        addModbusRtu: store.addModbusRtu,
        removeModbusRtu: store.removeModbusRtu,
        updateSlaveAddr: store.updateSlaveAddr,
        updatePortName: store.updatePortName,
        updateBaudRateSelected: store.updateBaudRateSelected,
        updateByteLenSelected: store.updateByteLenSelected,
        updateParitySelected: store.updateParitySelected,
        updateStopBitLenSelected: store.updateStopBitLenSelected,
        updateSerialInterfaceCapability: store.updateSerialInterfaceCapability,
        // Serial interface capability actions
        addBaudRateSupported: store.addBaudRateSupported,
        removeBaudRateSupported: store.removeBaudRateSupported,
        addByteLenSupported: store.addByteLenSupported,
        removeByteLenSupported: store.removeByteLenSupported,
        addParitySupported: store.addParitySupported,
        removeParitySupported: store.removeParitySupported,
        addStopBitLenSupported: store.addStopBitLenSupported,
        removeStopBitLenSupported: store.removeStopBitLenSupported,
        // Modbus attributes actions
        addModbusAttributes: store.addModbusAttributes,
        removeModbusAttributes: store.removeModbusAttributes,
        updateStepByIncrement: store.updateStepByIncrement,
        updateSunssf: store.updateSunssf,
        updatePollingLatencyMs: store.updatePollingLatencyMs,
        updateLayer6Deviation: store.updateLayer6Deviation,
        // Scaling factor actions
        addScalingFactor: store.addScalingFactor,
        removeScalingFactor: store.removeScalingFactor,
        updateMultiplicator: store.updateMultiplicator,
        updatePowerOf10: store.updatePowerOf10,
        // Access protection actions
        addAccessProtection: store.addAccessProtection,
        removeAccessProtection: store.removeAccessProtection,
        updateIsEnabled: store.updateIsEnabled,
        addModbusExceptionCode: store.addModbusExceptionCode,
        removeModbusExceptionCode: store.removeModbusExceptionCode,
        updateModbusExceptionCode: store.updateModbusExceptionCode,
        // Master functions supported list actions
        addMasterFunctionsSupportedList: store.addMasterFunctionsSupportedList,
        removeMasterFunctionsSupportedList: store.removeMasterFunctionsSupportedList,
        addMasterFunctionSupported: store.addMasterFunctionSupported,
        removeMasterFunctionSupported: store.removeMasterFunctionSupported,
        updateMasterFunctionSupported: store.updateMasterFunctionSupported,
        // Functional profile list actions
        functionalProfileListActions: store.functionalProfileListActions,
      },

      // Modbus interface description actions (exposed separately for convenience)
      modbusInterfaceDescriptionActions: {
        updateModbusInterfaceSelection: store.updateModbusInterfaceSelection,
        updateFirstRegisterAddressIsOne: store.updateFirstRegisterAddressIsOne,
        updateBitOrder: store.updateBitOrder,
        // Modbus TCP actions
        addModbusTcp: store.addModbusTcp,
        removeModbusTcp: store.removeModbusTcp,
        updatePort: store.updatePort,
        updateAddress: store.updateAddress,
        updateSlaveId: store.updateSlaveId,
        // Modbus RTU actions
        addModbusRtu: store.addModbusRtu,
        removeModbusRtu: store.removeModbusRtu,
        updateSlaveAddr: store.updateSlaveAddr,
        updatePortName: store.updatePortName,
        updateBaudRateSelected: store.updateBaudRateSelected,
        updateByteLenSelected: store.updateByteLenSelected,
        updateParitySelected: store.updateParitySelected,
        updateStopBitLenSelected: store.updateStopBitLenSelected,
        updateSerialInterfaceCapability: store.updateSerialInterfaceCapability,
        // Serial interface capability actions
        addBaudRateSupported: store.addBaudRateSupported,
        removeBaudRateSupported: store.removeBaudRateSupported,
        addByteLenSupported: store.addByteLenSupported,
        removeByteLenSupported: store.removeByteLenSupported,
        addParitySupported: store.addParitySupported,
        removeParitySupported: store.removeParitySupported,
        addStopBitLenSupported: store.addStopBitLenSupported,
        removeStopBitLenSupported: store.removeStopBitLenSupported,
        // Master functions supported list actions
        addMasterFunctionsSupportedList: store.addMasterFunctionsSupportedList,
        removeMasterFunctionsSupportedList: store.removeMasterFunctionsSupportedList,
        addMasterFunctionSupported: store.addMasterFunctionSupported,
        removeMasterFunctionSupported: store.removeMasterFunctionSupported,
        updateMasterFunctionSupported: store.updateMasterFunctionSupported,
        // Modbus attributes actions
        addModbusAttributes: store.addModbusAttributes,
        removeModbusAttributes: store.removeModbusAttributes,
        updateStepByIncrement: store.updateStepByIncrement,
        updateSunssf: store.updateSunssf,
        updatePollingLatencyMs: store.updatePollingLatencyMs,
        updateLayer6Deviation: store.updateLayer6Deviation,
        // Scaling factor actions
        addScalingFactor: store.addScalingFactor,
        removeScalingFactor: store.removeScalingFactor,
        updateMultiplicator: store.updateMultiplicator,
        updatePowerOf10: store.updatePowerOf10,
        // Access protection actions
        addAccessProtection: store.addAccessProtection,
        removeAccessProtection: store.removeAccessProtection,
        updateIsEnabled: store.updateIsEnabled,
        addModbusExceptionCode: store.addModbusExceptionCode,
        removeModbusExceptionCode: store.removeModbusExceptionCode,
        updateModbusExceptionCode: store.updateModbusExceptionCode,
      },

      // Modbus TCP actions (exposed separately for convenience)
      modbusTcpActions: {
        addModbusTcp: store.addModbusTcp,
        removeModbusTcp: store.removeModbusTcp,
        updatePort: store.updatePort,
        updateAddress: store.updateAddress,
        updateSlaveId: store.updateSlaveId,
      },

      // Modbus RTU actions (exposed separately for convenience)
      modbusRtuActions: {
        addModbusRtu: store.addModbusRtu,
        removeModbusRtu: store.removeModbusRtu,
        updateSlaveAddr: store.updateSlaveAddr,
        updatePortName: store.updatePortName,
        updateBaudRateSelected: store.updateBaudRateSelected,
        updateByteLenSelected: store.updateByteLenSelected,
        updateParitySelected: store.updateParitySelected,
        updateStopBitLenSelected: store.updateStopBitLenSelected,
        updateSerialInterfaceCapability: store.updateSerialInterfaceCapability,
        // Serial interface capability actions
        addBaudRateSupported: store.addBaudRateSupported,
        removeBaudRateSupported: store.removeBaudRateSupported,
        addByteLenSupported: store.addByteLenSupported,
        removeByteLenSupported: store.removeByteLenSupported,
        addParitySupported: store.addParitySupported,
        removeParitySupported: store.removeParitySupported,
        addStopBitLenSupported: store.addStopBitLenSupported,
        removeStopBitLenSupported: store.removeStopBitLenSupported,
      },

      // Serial interface capability actions (exposed separately for convenience)
      serialInterfaceCapabilityActions: {
        addBaudRateSupported: store.addBaudRateSupported,
        removeBaudRateSupported: store.removeBaudRateSupported,
        addByteLenSupported: store.addByteLenSupported,
        removeByteLenSupported: store.removeByteLenSupported,
        addParitySupported: store.addParitySupported,
        removeParitySupported: store.removeParitySupported,
        addStopBitLenSupported: store.addStopBitLenSupported,
        removeStopBitLenSupported: store.removeStopBitLenSupported,
      },

      // Master functions supported list actions (exposed separately for convenience)
      masterFunctionsSupportedListActions: {
        addMasterFunctionsSupportedList: store.addMasterFunctionsSupportedList,
        removeMasterFunctionsSupportedList: store.removeMasterFunctionsSupportedList,
        addMasterFunctionSupported: store.addMasterFunctionSupported,
        removeMasterFunctionSupported: store.removeMasterFunctionSupported,
        updateMasterFunctionSupported: store.updateMasterFunctionSupported,
      },

      // Modbus attributes actions (exposed separately for convenience)
      modbusAttributesActions: {
        addModbusAttributes: store.addModbusAttributes,
        removeModbusAttributes: store.removeModbusAttributes,
        updateStepByIncrement: store.updateStepByIncrement,
        updateSunssf: store.updateSunssf,
        updatePollingLatencyMs: store.updatePollingLatencyMs,
        updateLayer6Deviation: store.updateLayer6Deviation,
        // Scaling factor actions
        addScalingFactor: store.addScalingFactor,
        removeScalingFactor: store.removeScalingFactor,
        updateMultiplicator: store.updateMultiplicator,
        updatePowerOf10: store.updatePowerOf10,
        // Access protection actions
        addAccessProtection: store.addAccessProtection,
        removeAccessProtection: store.removeAccessProtection,
        updateIsEnabled: store.updateIsEnabled,
        addModbusExceptionCode: store.addModbusExceptionCode,
        removeModbusExceptionCode: store.removeModbusExceptionCode,
        updateModbusExceptionCode: store.updateModbusExceptionCode,
      },

      // Scaling factor actions (exposed separately for convenience)
      scalingFactorActions: {
        addScalingFactor: store.addScalingFactor,
        removeScalingFactor: store.removeScalingFactor,
        updateMultiplicator: store.updateMultiplicator,
        updatePowerOf10: store.updatePowerOf10,
      },

      // Access protection actions (exposed separately for convenience)
      accessProtectionActions: {
        addAccessProtection: store.addAccessProtection,
        removeAccessProtection: store.removeAccessProtection,
        updateIsEnabled: store.updateIsEnabled,
        addModbusExceptionCode: store.addModbusExceptionCode,
        removeModbusExceptionCode: store.removeModbusExceptionCode,
        updateModbusExceptionCode: store.updateModbusExceptionCode,
      },

      // Modbus interface actions (includes functional profile list)
      modbusInterfaceActions: {
        // Interface description actions
        updateModbusInterfaceSelection: store.updateModbusInterfaceSelection,
        updateFirstRegisterAddressIsOne: store.updateFirstRegisterAddressIsOne,
        updateBitOrder: store.updateBitOrder,
        addModbusTcp: store.addModbusTcp,
        removeModbusTcp: store.removeModbusTcp,
        updatePort: store.updatePort,
        updateAddress: store.updateAddress,
        updateSlaveId: store.updateSlaveId,
        addModbusRtu: store.addModbusRtu,
        removeModbusRtu: store.removeModbusRtu,
        updateSlaveAddr: store.updateSlaveAddr,
        updatePortName: store.updatePortName,
        updateBaudRateSelected: store.updateBaudRateSelected,
        updateByteLenSelected: store.updateByteLenSelected,
        updateParitySelected: store.updateParitySelected,
        updateStopBitLenSelected: store.updateStopBitLenSelected,
        updateSerialInterfaceCapability: store.updateSerialInterfaceCapability,
        addBaudRateSupported: store.addBaudRateSupported,
        removeBaudRateSupported: store.removeBaudRateSupported,
        addByteLenSupported: store.addByteLenSupported,
        removeByteLenSupported: store.removeByteLenSupported,
        addParitySupported: store.addParitySupported,
        removeParitySupported: store.removeParitySupported,
        addStopBitLenSupported: store.addStopBitLenSupported,
        removeStopBitLenSupported: store.removeStopBitLenSupported,
        addMasterFunctionsSupportedList: store.addMasterFunctionsSupportedList,
        removeMasterFunctionsSupportedList: store.removeMasterFunctionsSupportedList,
        addMasterFunctionSupported: store.addMasterFunctionSupported,
        removeMasterFunctionSupported: store.removeMasterFunctionSupported,
        updateMasterFunctionSupported: store.updateMasterFunctionSupported,
        // Modbus attributes actions
        addModbusAttributes: store.addModbusAttributes,
        removeModbusAttributes: store.removeModbusAttributes,
        updateStepByIncrement: store.updateStepByIncrement,
        updateSunssf: store.updateSunssf,
        updatePollingLatencyMs: store.updatePollingLatencyMs,
        updateLayer6Deviation: store.updateLayer6Deviation,
        addScalingFactor: store.addScalingFactor,
        removeScalingFactor: store.removeScalingFactor,
        updateMultiplicator: store.updateMultiplicator,
        updatePowerOf10: store.updatePowerOf10,
        addAccessProtection: store.addAccessProtection,
        removeAccessProtection: store.removeAccessProtection,
        updateIsEnabled: store.updateIsEnabled,
        addModbusExceptionCode: store.addModbusExceptionCode,
        removeModbusExceptionCode: store.removeModbusExceptionCode,
        updateModbusExceptionCode: store.updateModbusExceptionCode,
        // Functional profile list actions
        functionalProfileListActions: store.functionalProfileListActions,
      },

      // Functional profile list actions (exposed separately for convenience)
      functionalProfileListActions: store.functionalProfileListActions,
    };
  }, [store]);

  return <DeviceFormProvider value={contextValue}>{children}</DeviceFormProvider>;
}
