import { StateCreator } from "zustand";
import { ReleaseNotes, ChangeLog } from "@/lib/models";

export interface ReleaseNotesSlice {
  releaseNotes?: ReleaseNotes;
  setReleaseNotes: (releaseNotes: ReleaseNotes) => void;
  updateReleaseNotesState: (state: ReleaseNotes["state"]) => void;
  updateReleaseNotesRemarks: (remarks: string | undefined) => void;
  addChangeLog: (changeLog: ChangeLog) => void;
  removeChangeLog: (index: number) => void;
  updateChangeLog: (index: number, changeLog: ChangeLog) => void;
}

export const createReleaseNotesSlice: StateCreator<
  ReleaseNotesSlice,
  [["zustand/immer", never]],
  [],
  ReleaseNotesSlice
> = (set) => ({
  releaseNotes: undefined,
  setReleaseNotes: (releaseNotes) =>
    set((state) => {
      state.releaseNotes = releaseNotes;
    }),
  updateReleaseNotesState: (releaseState) =>
    set((state) => {
      if (state.releaseNotes) {
        state.releaseNotes.state = releaseState;
      }
    }),
  updateReleaseNotesRemarks: (remarks) =>
    set((state) => {
      if (state.releaseNotes) {
        state.releaseNotes.remarks = remarks;
      }
    }),
  addChangeLog: (changeLog) =>
    set((state) => {
      if (state.releaseNotes) {
        if (!state.releaseNotes.changeLog) {
          state.releaseNotes.changeLog = [];
        }
        state.releaseNotes.changeLog.push(changeLog);
      }
    }),
  removeChangeLog: (index) =>
    set((state) => {
      if (state.releaseNotes?.changeLog) {
        state.releaseNotes.changeLog.splice(index, 1);
      }
    }),
  updateChangeLog: (index, changeLog) =>
    set((state) => {
      if (state.releaseNotes?.changeLog?.[index]) {
        state.releaseNotes.changeLog[index] = changeLog;
      }
    }),
});
