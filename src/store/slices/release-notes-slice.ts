import { ReleaseNotes, ChangeLog, FunctionalProfileFrame } from "@/lib/models";

export interface ReleaseNotesSlice {
  // Main update function
  setReleaseNotes: (releaseNotes: ReleaseNotes) => void;
  removeReleaseNotes: () => void;

  // Field-specific updates
  updateReleaseNotesState: (state: ReleaseNotes["state"]) => void;
  updateReleaseNotesRemarks: (remarks: string | undefined) => void;

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
    date: "",
    author: "",
    comment: "",
  };
}

export const createReleaseNotesSlice = (set: SetState): ReleaseNotesSlice => ({
  setReleaseNotes: (releaseNotes) =>
    set((state) => {
      if (state.profile) {
        state.profile.releaseNotes = releaseNotes;
      }
    }),

  removeReleaseNotes: () =>
    set((state) => {
      if (state.profile) {
        state.profile.releaseNotes = undefined;
      }
    }),

  updateReleaseNotesState: (releaseState) =>
    set((state) => {
      if (state.profile) {
        if (!state.profile.releaseNotes) {
          state.profile.releaseNotes = { state: releaseState };
        } else {
          state.profile.releaseNotes.state = releaseState;
        }
      }
    }),

  updateReleaseNotesRemarks: (remarks) =>
    set((state) => {
      if (state.profile) {
        if (!state.profile.releaseNotes) {
          state.profile.releaseNotes = { state: "Draft" };
        }
        // Set to undefined if empty string, otherwise set the value
        state.profile.releaseNotes.remarks =
          !remarks || remarks.trim() === "" ? undefined : remarks;
      }
    }),

  addChangeLog: (changeLog) =>
    set((state) => {
      if (state.profile) {
        if (!state.profile.releaseNotes) {
          state.profile.releaseNotes = { state: "Draft" };
        }
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
        if (changeLogArray.length === 0) {
          state.profile!.releaseNotes!.changeLog = undefined;
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
      if (state.profile) {
        if (!state.profile.releaseNotes) {
          state.profile.releaseNotes = { state: "Draft" };
        }
        if (!state.profile.releaseNotes.changeLog) {
          state.profile.releaseNotes.changeLog = [];
        }
        state.profile.releaseNotes.changeLog.push(createEmptyChangeLog());
      }
    }),
});
