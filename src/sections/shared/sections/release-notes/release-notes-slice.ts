import { ChangeLog, ReleaseNotes, ReleaseState } from "@/models";
import { ensureArray, removeArrayItem, normalizeString } from "@/sections/shared/utils/slice-utils";

export interface ReleaseNotesSlice {
  // Main operations
  addReleaseNotes: () => void;
  removeReleaseNotes: () => void;

  // Field-specific updates
  updateReleaseState: (state: ReleaseState) => void;
  updateRemarks: (remarks: string | undefined) => void;

  // ChangeLog operations
  addChangeLog: (changeLog: ChangeLog) => void;
  removeChangeLog: (index: number) => void;
  updateChangeLogField: (index: number, field: keyof ChangeLog, value: string) => void;

  // Convenience methods
  addEmptyChangeLog: () => void;
}

const createEmptyChangeLog = (): ChangeLog => ({
  version: "",
  date: new Date().toISOString().split("T")[0],
  author: "",
  comment: "",
});

/**
 * Creates a generic release notes slice that works with any store state
 * @param set - The Zustand set function
 * @param getReleaseNotes - Function to get releaseNotes from the store state
 * @param setReleaseNotes - Function to set releaseNotes in the store state
 * @param isOptional - Whether releaseNotes is optional (true for FunctionalProfileFrame, false for DeviceFrame)
 */
export function createReleaseNotesSlice<TState>(
  set: (fn: (state: TState) => void) => void,
  getReleaseNotes: (state: TState) => ReleaseNotes | undefined,
  setReleaseNotes: (state: TState, releaseNotes: ReleaseNotes | undefined) => void,
  isOptional: boolean = true
): ReleaseNotesSlice {
  return {
    addReleaseNotes: () =>
      set((state) => {
        const current = getReleaseNotes(state);
        if (!current) {
          setReleaseNotes(state, { state: "Draft" });
        }
      }),

    removeReleaseNotes: () =>
      set((state) => {
        if (isOptional) {
          setReleaseNotes(state, undefined);
        }
      }),

    updateReleaseState: (releaseState) =>
      set((state) => {
        const releaseNotes = getReleaseNotes(state);
        if (releaseNotes) {
          releaseNotes.state = releaseState;
        }
      }),

    updateRemarks: (remarks) =>
      set((state) => {
        const releaseNotes = getReleaseNotes(state);
        if (releaseNotes) {
          releaseNotes.remarks = normalizeString(remarks);
        }
      }),

    addChangeLog: (changeLog) =>
      set((state) => {
        const releaseNotes = getReleaseNotes(state);
        if (releaseNotes) {
          const list = ensureArray(releaseNotes.changeLog, () => []);
          list.push(changeLog);
          releaseNotes.changeLog = list;
        }
      }),

    removeChangeLog: (index) =>
      set((state) => {
        const releaseNotes = getReleaseNotes(state);
        if (releaseNotes?.changeLog) {
          removeArrayItem(releaseNotes.changeLog, index, () => {
            if (releaseNotes) {
              releaseNotes.changeLog = undefined;
            }
          });
        }
      }),

    updateChangeLogField: (index, field, value) =>
      set((state) => {
        const releaseNotes = getReleaseNotes(state);
        const array = releaseNotes?.changeLog;
        if (array?.[index]) {
          array[index] = { ...array[index], [field]: value };
        }
      }),

    addEmptyChangeLog: () =>
      set((state) => {
        const releaseNotes = getReleaseNotes(state);
        if (releaseNotes) {
          const list = ensureArray(releaseNotes.changeLog, () => []);
          list.push(createEmptyChangeLog());
          releaseNotes.changeLog = list;
        }
      }),
  };
}
