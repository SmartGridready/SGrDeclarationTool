import { AlternativeNames } from "@/models";
import { SetState, normalizeString } from "@/sections/shared/utils/slice-utils";

export interface AlternativeNamesSlice {
  // Main operations
  addAlternativeNames: () => void;
  removeAlternativeNames: () => void;

  // Field-specific updates
  updateSLV1Name: (sLV1Name: string | undefined) => void;
  updateWorkName: (workName: string | undefined) => void;
  updateManufName: (manufName: string | undefined) => void;
  updateIec61850Name: (iec61850Name: string | undefined) => void;
  updateSarefName: (sarefName: string | undefined) => void;
  updateEebusName: (eebusName: string | undefined) => void;
  updateSunSpecName: (sunSpecName: string | undefined) => void;
  updateHpBwpName: (hpBwpName: string | undefined) => void;
  updateEn17609Name: (en17609Name: string | undefined) => void;
}

const updateField =
  (field: keyof AlternativeNames) =>
  (value: string | undefined) =>
  (state: {
    profile?: { functionalProfile: { alternativeNames?: AlternativeNames } };
  }) => {
    if (state.profile?.functionalProfile.alternativeNames) {
      state.profile.functionalProfile.alternativeNames[field] =
        normalizeString(value);
    }
  };

export const createAlternativeNamesSlice = (
  set: SetState
): AlternativeNamesSlice => ({
  addAlternativeNames: () =>
    set((state) => {
      if (state.profile) {
        state.profile.functionalProfile.alternativeNames = {};
      }
    }),

  removeAlternativeNames: () =>
    set((state) => {
      if (state.profile) {
        state.profile.functionalProfile.alternativeNames = undefined;
      }
    }),

  updateSLV1Name: (value) => set(updateField("sLV1Name")(value)),
  updateWorkName: (value) => set(updateField("workName")(value)),
  updateManufName: (value) => set(updateField("manufName")(value)),
  updateIec61850Name: (value) => set(updateField("iec61850Name")(value)),
  updateSarefName: (value) => set(updateField("sarefName")(value)),
  updateEebusName: (value) => set(updateField("eebusName")(value)),
  updateSunSpecName: (value) => set(updateField("sunSpecName")(value)),
  updateHpBwpName: (value) => set(updateField("hpBwpName")(value)),
  updateEn17609Name: (value) => set(updateField("en17609Name")(value)),
});
