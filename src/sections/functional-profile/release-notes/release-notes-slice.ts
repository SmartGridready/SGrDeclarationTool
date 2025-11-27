import { ChangeLog, ReleaseState } from "@/models";
import {
  SetState,
  ensureArray,
  removeArrayItem,
  normalizeString,
} from "@/sections/shared/utils/slice-utils";

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
  updateChangeLogField: (
    index: number,
    field: keyof ChangeLog,
    value: string
  ) => void;

  // Convenience methods
  addEmptyChangeLog: () => void;
}

const createEmptyChangeLog = (): ChangeLog => ({
  version: "",
  date: new Date().toISOString().split("T")[0],
  author: "",
  comment: "",
});

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
        state.profile.releaseNotes.remarks = normalizeString(remarks);
      }
    }),

  addChangeLog: (changeLog) =>
    set((state) => {
      if (state.profile?.releaseNotes) {
        const list = ensureArray(
          state.profile.releaseNotes.changeLog,
          () => []
        );
        list.push(changeLog);
        state.profile.releaseNotes.changeLog = list;
      }
    }),

  removeChangeLog: (index) =>
    set((state) => {
      if (state.profile?.releaseNotes?.changeLog) {
        removeArrayItem(state.profile.releaseNotes.changeLog, index, () => {
          if (state.profile?.releaseNotes) {
            state.profile.releaseNotes.changeLog = undefined;
          }
        });
      }
    }),

  updateChangeLogField: (index, field, value) =>
    set((state) => {
      const array = state.profile?.releaseNotes?.changeLog;
      if (array?.[index]) {
        array[index] = { ...array[index], [field]: value };
      }
    }),

  addEmptyChangeLog: () =>
    set((state) => {
      if (state.profile?.releaseNotes) {
        const list = ensureArray(
          state.profile.releaseNotes.changeLog,
          () => []
        );
        list.push(createEmptyChangeLog());
        state.profile.releaseNotes.changeLog = list;
      }
    }),
});
