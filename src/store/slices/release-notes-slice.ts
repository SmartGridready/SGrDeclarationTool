import { ReleaseNotes, ChangeLog, FunctionalProfileFrame } from "@/lib/models";

export interface ReleaseNotesSlice {
  setReleaseNotes: (releaseNotes: ReleaseNotes) => void;
  updateReleaseNotesState: (state: ReleaseNotes["state"]) => void;
  updateReleaseNotesRemarks: (remarks: string | undefined) => void;
  addChangeLog: (changeLog: ChangeLog) => void;
  removeChangeLog: (index: number) => void;
  updateChangeLog: (index: number, changeLog: ChangeLog) => void;
  handleAddChangeLog: () => void;
  handleRemoveChangeLog: (index: number) => void;
  handleUpdateChangeLog: (
    index: number,
    field: keyof ChangeLog,
    value: string
  ) => void;
}

type StoreState = {
  profile?: FunctionalProfileFrame;
};

export const createReleaseNotesSlice = (
  set: (fn: (state: StoreState) => void) => void
): ReleaseNotesSlice => ({
  setReleaseNotes: (releaseNotes) =>
    set((state) => {
      if (state.profile) {
        state.profile.releaseNotes = releaseNotes;
      }
    }),

  updateReleaseNotesState: (releaseState) =>
    set((state) => {
      if (state.profile?.releaseNotes) {
        state.profile.releaseNotes.state = releaseState;
      }
    }),

  updateReleaseNotesRemarks: (remarks) =>
    set((state) => {
      if (state.profile?.releaseNotes) {
        state.profile.releaseNotes.remarks = remarks;
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
      if (state.profile?.releaseNotes?.changeLog) {
        state.profile.releaseNotes.changeLog.splice(index, 1);
      }
    }),

  updateChangeLog: (index, changeLog) =>
    set((state) => {
      if (state.profile?.releaseNotes?.changeLog?.[index]) {
        state.profile.releaseNotes.changeLog[index] = changeLog;
      }
    }),

  handleAddChangeLog: () =>
    set((state) => {
      if (state.profile?.releaseNotes) {
        if (!state.profile.releaseNotes.changeLog) {
          state.profile.releaseNotes.changeLog = [];
        }
        const newChangeLog: ChangeLog = {
          version: "",
          date: new Date().toISOString().split("T")[0], // Default to today's date in YYYY-MM-DD format
          author: "",
          comment: "",
        };
        state.profile.releaseNotes.changeLog.push(newChangeLog);
      }
    }),

  handleRemoveChangeLog: (index) =>
    set((state) => {
      if (state.profile?.releaseNotes?.changeLog) {
        state.profile.releaseNotes.changeLog.splice(index, 1);
      }
    }),

  handleUpdateChangeLog: (index, field, value) =>
    set((state) => {
      if (state.profile?.releaseNotes?.changeLog?.[index]) {
        state.profile.releaseNotes.changeLog[index] = {
          ...state.profile.releaseNotes.changeLog[index],
          [field]: value,
        };
      }
    }),
});
