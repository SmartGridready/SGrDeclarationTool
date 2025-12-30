"use client";

import { useProfileStore } from "@/sections/functional-profile/functional-profile-store";
import { FunctionalProfileForm } from "@/sections/functional-profile/functional-profile-form";
import { parseFunctionalProfile } from "@/sections/functional-profile/functional-profile-mapper";
import { buildFunctionalProfileToXml } from "@/sections/functional-profile/functional-profile-builder";
import { validateFunctionalProfileFrame } from "@/sections/functional-profile/functional-profile-schema";
import { fetchFunctionalProfiles, fetchFunctionalProfileXml } from "@/utils/library-api-utils";
import { ERROR_MESSAGES } from "@/constants/error-messages";
import { FunctionalProfileFrame } from "@/models";
import { GenericEditor, EditorConfig } from "@/components/editor/generic-editor";

export default function FunctionalProfileEditor() {
  const { profile, createEmpty, clear, setProfile } = useProfileStore();

  const config: EditorConfig<FunctionalProfileFrame> = {
    getData: () => profile,
    setData: setProfile,
    createEmpty,
    clear,
    parser: parseFunctionalProfile,
    builder: buildFunctionalProfileToXml,
    validator: validateFunctionalProfileFrame,
    fetchLibraryItems: fetchFunctionalProfiles,
    fetchLibraryItemXml: fetchFunctionalProfileXml,
    title: "Functional Profile Editor",
    emptyButtonLabel: "Load Empty Profile",
    itemName: "profile",
    itemNameCapitalized: "Profile",
    exportFilename: "functional-profile.xml",
    exportErrorMessage: ERROR_MESSAGES.FILE_EXPORT.PROFILE_REQUIRED,
    searchPlaceholder: "Search functional profiles...",
    FormComponent: <FunctionalProfileForm />,
  };

  return <GenericEditor config={config} />;
}
