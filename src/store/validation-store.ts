import { create } from "zustand";

interface ValidationStore {
  validationAttempted: boolean;
  setValidationAttempted: (attempted: boolean) => void;
  resetValidation: () => void;
}

export const useValidationStore = create<ValidationStore>((set) => ({
  validationAttempted: false,
  setValidationAttempted: (attempted) =>
    set({ validationAttempted: attempted }),
  resetValidation: () => set({ validationAttempted: false }),
}));
