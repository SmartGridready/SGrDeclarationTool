import { DeviceCategory, DeviceFrame, LevelOfOperation, PowerSource } from "@/models";
import { TestState } from "@/models/product/product";
import { normalizeString } from "@/utils/slice-utils";
import {
  createAlternativeNamesSliceForDevice,
  AlternativeNamesSlice,
} from "@/sections/device/device-information/alternative-names/alternative-names-slice";
import {
  createLegibleDescriptionSliceForDevice,
  LegibleDescriptionSlice,
} from "@/sections/device/device-information/legible-description/legible-description-slice";
import {
  createProgrammerHintsSliceForDevice,
  ProgrammerHintsSlice,
} from "@/sections/device/device-information/programmer-hints/programmer-hints-slice";

export interface DeviceInformationSlice
  extends AlternativeNamesSlice,
    LegibleDescriptionSlice,
    ProgrammerHintsSlice {
  updateDeviceCategory: (deviceCategory: DeviceCategory) => void;
  updateIsLocalControl: (isLocalControl: boolean) => void;
  updateSoftwareRevision: (softwareRevision: string | undefined) => void;
  updateHardwareRevision: (hardwareRevision: string | undefined) => void;
  updateBrandName: (brandName: string | undefined) => void;
  updatePowerSource: (powerSource: PowerSource | undefined) => void;
  updateNominalPower: (nominalPower: string | undefined) => void;
  updateManufacturerSpecificationIdentification: (
    manufacturerSpecificationIdentification: string | undefined
  ) => void;
  updateManufacturerLabel: (manufacturerLabel: string | undefined) => void;
  updateGeneralRemarks: (generalRemarks: string | undefined) => void;
  updateLevelOfOperation: (levelOfOperation: LevelOfOperation | undefined) => void;
  updatePrimaryVersionNumber: (primaryVersionNumber: number | undefined) => void;
  updateSecondaryVersionNumber: (secondaryVersionNumber: number | undefined) => void;
  updateSubReleaseVersionNumber: (subReleaseVersionNumber: number | undefined) => void;
  updateTestState: (testState: TestState | undefined) => void;
}

/**
 * Creates a device information slice specifically for device stores.
 * Composes alternative names, legible description, and programmer hints slices.
 */
export function createDeviceInformationSlice<TState extends { device?: DeviceFrame }>(
  set: (fn: (state: TState) => void) => void
): DeviceInformationSlice {
  const getDeviceInformation = (state: TState) => state.device?.deviceInformation;

  // Create composed sub-slices using the shared pattern
  const alternativeNamesSlice = createAlternativeNamesSliceForDevice(set);
  const legibleDescriptionSlice = createLegibleDescriptionSliceForDevice(set);
  const programmerHintsSlice = createProgrammerHintsSliceForDevice(set);

  return {
    // Spread composed sub-slices
    ...alternativeNamesSlice,
    ...legibleDescriptionSlice,
    ...programmerHintsSlice,

    // Core device information actions
    updateDeviceCategory: (value) =>
      set((state) => {
        const info = getDeviceInformation(state);
        if (info) info.deviceCategory = value;
      }),

    updateIsLocalControl: (value) =>
      set((state) => {
        const info = getDeviceInformation(state);
        if (info) info.isLocalControl = value;
      }),

    updateSoftwareRevision: (value) =>
      set((state) => {
        const info = getDeviceInformation(state);
        if (info) info.softwareRevision = normalizeString(value);
      }),

    updateHardwareRevision: (value) =>
      set((state) => {
        const info = getDeviceInformation(state);
        if (info) info.hardwareRevision = normalizeString(value);
      }),

    updateBrandName: (value) =>
      set((state) => {
        const info = getDeviceInformation(state);
        if (info) info.brandName = normalizeString(value);
      }),

    updatePowerSource: (value) =>
      set((state) => {
        const info = getDeviceInformation(state);
        if (info) info.powerSource = value;
      }),

    updateNominalPower: (value) =>
      set((state) => {
        const info = getDeviceInformation(state);
        if (info) info.nominalPower = normalizeString(value);
      }),

    updateManufacturerSpecificationIdentification: (value) =>
      set((state) => {
        const info = getDeviceInformation(state);
        if (info) info.manufacturerSpecificationIdentification = normalizeString(value);
      }),

    updateManufacturerLabel: (value) =>
      set((state) => {
        const info = getDeviceInformation(state);
        if (info) info.manufacturerLabel = normalizeString(value);
      }),

    updateGeneralRemarks: (value) =>
      set((state) => {
        const info = getDeviceInformation(state);
        if (info) info.generalRemarks = normalizeString(value);
      }),

    updateLevelOfOperation: (value) =>
      set((state) => {
        const info = getDeviceInformation(state);
        if (info) info.levelOfOperation = value;
      }),

    updatePrimaryVersionNumber: (value) =>
      set((state) => {
        const info = getDeviceInformation(state);
        if (info) {
          if (value !== undefined) {
            if (!info.versionNumber) {
              info.versionNumber = {
                primaryVersionNumber: 0,
                secondaryVersionNumber: 0,
                subReleaseVersionNumber: 0,
              };
            }
            info.versionNumber.primaryVersionNumber = value;
          } else if (info.versionNumber) {
            info.versionNumber = undefined;
          }
        }
      }),

    updateSecondaryVersionNumber: (value) =>
      set((state) => {
        const info = getDeviceInformation(state);
        if (info && info.versionNumber) info.versionNumber.secondaryVersionNumber = value ?? 0;
      }),

    updateSubReleaseVersionNumber: (value) =>
      set((state) => {
        const info = getDeviceInformation(state);
        if (info && info.versionNumber) info.versionNumber.subReleaseVersionNumber = value ?? 0;
      }),

    updateTestState: (value) =>
      set((state) => {
        const info = getDeviceInformation(state);
        if (info) info.testState = value;
      }),
  };
}
