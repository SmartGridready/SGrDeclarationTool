import { ReleaseState } from "@/models";

export const RELEASE_STATE_OPTIONS: { value: ReleaseState; label: string }[] = [
  { value: "Draft", label: "Draft" },
  { value: "Review", label: "Review" },
  { value: "Published", label: "Published" },
  { value: "Revoked", label: "Revoked" },
];
