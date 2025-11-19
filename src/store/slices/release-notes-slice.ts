import { ChangeLog, FunctionalProfileFrame, ReleaseState } from "@/lib/models";

export interface ReleaseNotesSlice {
  // Main operations
  addReleaseNotes: () => void;
  removeReleaseNotes: () => void;

  // Field-specific updates
  updateReleaseState: (state: ReleaseState | undefined) => void;
  updateRemarks: (remarks: string | undefined) => void;

  // ChangeLog operations
  addChangeLog: (changeLog: ChangeLog) => void;
  removeChangeLog: (index: number) => void;
  updateChangeLogField: (
    index: number,
    field: keyof ChangeLog,
    value: string
  ) => void;

  // Convenience methods
  addEmptyChangeLog: () => void;
}

type StoreState = {
  profile?: FunctionalProfileFrame;
};

type SetState = (fn: (state: StoreState) => void) => void;

/**
 * Creates a new empty ChangeLog entry with default values
 */
function createEmptyChangeLog(): ChangeLog {
  return {
    version: "",
    date: new Date().toISOString().split("T")[0], // Format: YYYY-MM-DD
    author: "",
    comment: "",
  };
}

export const createReleaseNotesSlice = (set: SetState): ReleaseNotesSlice => ({
  addReleaseNotes: () =>
    set((state) => {
      if (state.profile) {
        state.profile.releaseNotes = { state: "Draft" };
      }
    }),

  removeReleaseNotes: () =>
    set((state) => {
      if (state.profile) {
        state.profile.releaseNotes = undefined;
      }
    }),

  updateReleaseState: (releaseState) =>
    set((state) => {
      if (state.profile?.releaseNotes && releaseState !== undefined) {
        state.profile.releaseNotes.state = releaseState;
      }
    }),

  updateRemarks: (remarks) =>
    set((state) => {
      if (state.profile?.releaseNotes) {
        // Set to undefined if empty string, otherwise set the value
        state.profile.releaseNotes.remarks =
          !remarks || remarks.trim() === "" ? undefined : remarks;
      }
    }),

  addChangeLog: (changeLog) =>
    set((state) => {
      if (state.profile?.releaseNotes) {
        if (!state.profile.releaseNotes.changeLog) {
          state.profile.releaseNotes.changeLog = [];
        }
        state.profile.releaseNotes.changeLog.push(changeLog);
      }
    }),

  removeChangeLog: (index) =>
    set((state) => {
      const changeLogArray = state.profile?.releaseNotes?.changeLog;
      if (changeLogArray && index >= 0 && index < changeLogArray.length) {
        changeLogArray.splice(index, 1);
        // Set to undefined if array becomes empty
        if (changeLogArray.length === 0 && state.profile?.releaseNotes) {
          state.profile.releaseNotes.changeLog = undefined;
        }
      }
    }),

  updateChangeLogField: (index, field, value) =>
    set((state) => {
      const changeLogArray = state.profile?.releaseNotes?.changeLog;
      if (changeLogArray?.[index]) {
        changeLogArray[index] = {
          ...changeLogArray[index],
          [field]: value,
        };
      }
    }),

  addEmptyChangeLog: () =>
    set((state) => {
      if (state.profile?.releaseNotes) {
        if (!state.profile.releaseNotes.changeLog) {
          state.profile.releaseNotes.changeLog = [];
        }
        state.profile.releaseNotes.changeLog.push(createEmptyChangeLog());
      }
    }),
});
