import { FunctionalProfileFrame } from "@/models";

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

type StoreState = {
  profile?: FunctionalProfileFrame;
};

type SetState = (fn: (state: StoreState) => void) => void;

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

  updateSLV1Name: (sLV1Name) =>
    set((state) => {
      if (state.profile?.functionalProfile.alternativeNames) {
        state.profile.functionalProfile.alternativeNames.sLV1Name =
          !sLV1Name || sLV1Name.trim() === "" ? undefined : sLV1Name;
      }
    }),

  updateWorkName: (workName) =>
    set((state) => {
      if (state.profile?.functionalProfile.alternativeNames) {
        state.profile.functionalProfile.alternativeNames.workName =
          !workName || workName.trim() === "" ? undefined : workName;
      }
    }),

  updateManufName: (manufName) =>
    set((state) => {
      if (state.profile?.functionalProfile.alternativeNames) {
        state.profile.functionalProfile.alternativeNames.manufName =
          !manufName || manufName.trim() === "" ? undefined : manufName;
      }
    }),

  updateIec61850Name: (iec61850Name) =>
    set((state) => {
      if (state.profile?.functionalProfile.alternativeNames) {
        state.profile.functionalProfile.alternativeNames.iec61850Name =
          !iec61850Name || iec61850Name.trim() === ""
            ? undefined
            : iec61850Name;
      }
    }),

  updateSarefName: (sarefName) =>
    set((state) => {
      if (state.profile?.functionalProfile.alternativeNames) {
        state.profile.functionalProfile.alternativeNames.sarefName =
          !sarefName || sarefName.trim() === "" ? undefined : sarefName;
      }
    }),

  updateEebusName: (eebusName) =>
    set((state) => {
      if (state.profile?.functionalProfile.alternativeNames) {
        state.profile.functionalProfile.alternativeNames.eebusName =
          !eebusName || eebusName.trim() === "" ? undefined : eebusName;
      }
    }),

  updateSunSpecName: (sunSpecName) =>
    set((state) => {
      if (state.profile?.functionalProfile.alternativeNames) {
        state.profile.functionalProfile.alternativeNames.sunSpecName =
          !sunSpecName || sunSpecName.trim() === "" ? undefined : sunSpecName;
      }
    }),

  updateHpBwpName: (hpBwpName) =>
    set((state) => {
      if (state.profile?.functionalProfile.alternativeNames) {
        state.profile.functionalProfile.alternativeNames.hpBwpName =
          !hpBwpName || hpBwpName.trim() === "" ? undefined : hpBwpName;
      }
    }),

  updateEn17609Name: (en17609Name) =>
    set((state) => {
      if (state.profile?.functionalProfile.alternativeNames) {
        state.profile.functionalProfile.alternativeNames.en17609Name =
          !en17609Name || en17609Name.trim() === "" ? undefined : en17609Name;
      }
    }),
});
