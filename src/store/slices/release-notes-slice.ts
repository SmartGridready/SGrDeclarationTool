import { ReleaseNotes, ChangeLog, FunctionalProfileFrame } from "@/lib/models";

export interface ReleaseNotesSlice {
  setReleaseNotes: (releaseNotes: ReleaseNotes) => void;
  updateReleaseNotesState: (state: ReleaseNotes["state"]) => void;
  updateReleaseNotesRemarks: (remarks: string | undefined) => void;
  addChangeLog: (changeLog: ChangeLog) => void;
  removeChangeLog: (index: number) => void;
  updateChangeLog: (index: number, changeLog: ChangeLog) => void;
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
});
