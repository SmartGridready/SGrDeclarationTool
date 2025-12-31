"use client";

import { useState, useEffect, ReactNode } from "react";
import { useValidationStore } from "@/sections/shared/validation-store";
import { useFileImport } from "@/hooks/use-file-import";
import { useFileExport } from "@/hooks/use-file-export";
import { useXslPreview } from "@/hooks/use-xsl-preview";
import { LibraryItem } from "@/utils/library-api-utils";
import { ValidationResult } from "@/utils/validation-utils";
import { DEBUG } from "@/debug-config";
import { ERROR_MESSAGES } from "@/constants/error-messages";
import { SUCCESS_MESSAGES } from "@/constants/success-messages";
import { INFO_MESSAGES } from "@/constants/info-messages";
import { toast } from "sonner";
import { EditorActions } from "@/components/editor/editor-actions";
import { ConfirmationDialog } from "@/components/editor/confirmation-dialog";
import { LibraryImportModal } from "@/components/editor/library-import-modal";
import { XmlPreviewModal } from "@/components/editor/xml-preview-modal";
import { Button } from "@/components/shadcn/button";

export interface EditorConfig<T> {
  // Store interface
  getData: () => T | undefined;
  setData: (data: T) => void;
  createEmpty: () => void;
  clear: () => void;

  // File operations
  parser: (xmlString: string) => Promise<T>;
  builder: (data: T) => Promise<string>;
  validator: (data: T) => ValidationResult<T>;

  // Library operations
  fetchLibraryItems: () => Promise<LibraryItem[]>;
  fetchLibraryItemXml: (identifier: string) => Promise<string>;

  // Labels and text
  title: string;
  emptyButtonLabel: string;
  itemName: string; // "device" or "profile"
  itemNameCapitalized: string; // "Device" or "Profile"
  exportFilename: string;
  exportErrorMessage: string;
  searchPlaceholder: string;

  // Form component
  FormComponent: ReactNode;
}

interface GenericEditorProps<T> {
  config: EditorConfig<T>;
}

export function GenericEditor<T>({ config }: GenericEditorProps<T>) {
  const {
    getData,
    setData,
    createEmpty,
    clear,
    parser,
    builder,
    validator,
    fetchLibraryItems,
    fetchLibraryItemXml,
    title,
    emptyButtonLabel,
    itemName,
    itemNameCapitalized,
    exportFilename,
    exportErrorMessage,
    searchPlaceholder,
    FormComponent,
  } = config;

  const resetValidation = useValidationStore((state) => state.resetValidation);
  const [showClearDialog, setShowClearDialog] = useState(false);
  const [showLoadEmptyDialog, setShowLoadEmptyDialog] = useState(false);
  const [showImportDialog, setShowImportDialog] = useState(false);
  const [showLibraryImportDialog, setShowLibraryImportDialog] = useState(false);
  const [showLibraryImportConfirmation, setShowLibraryImportConfirmation] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [libraryItems, setLibraryItems] = useState<LibraryItem[]>([]);
  const [libraryLoading, setLibraryLoading] = useState(false);
  const [libraryError, setLibraryError] = useState<string | null>(null);

  const data = getData();

  const handleSetData = (newData: T) => {
    setData(newData);
    resetValidation();
  };

  const { importFile, inputRef, handleFileChange, accept } = useFileImport({
    parser,
    onSuccess: handleSetData,
    accept: ".xml",
  });

  const { exportFile } = useFileExport({
    builder,
    data,
    filename: exportFilename,
    errorMessage: exportErrorMessage,
    validator,
  });

  const {
    generatePreview,
    previewHtml,
    isLoading: previewLoading,
    setPreviewHtml,
  } = useXslPreview({
    builder,
    data,
    errorMessage: exportErrorMessage,
    validator,
  });

  const handleEmpty = () => {
    if (data) {
      setShowLoadEmptyDialog(true);
    } else {
      createEmpty();
      resetValidation();
      toast.info(INFO_MESSAGES.PROFILE.EMPTY_LOADED);
    }
  };

  const confirmLoadEmpty = () => {
    createEmpty();
    resetValidation();
    toast.info(INFO_MESSAGES.PROFILE.EMPTY_LOADED);
    setShowLoadEmptyDialog(false);
  };

  const handleClear = () => {
    if (data) {
      setShowClearDialog(true);
    } else {
      clear();
      resetValidation();
    }
  };

  const confirmClear = () => {
    clear();
    resetValidation();
    setShowClearDialog(false);
  };

  const handleImport = () => {
    if (data) {
      setShowImportDialog(true);
    } else {
      importFile();
    }
  };

  const confirmImport = () => {
    setShowImportDialog(false);
    importFile();
  };

  const handleLibraryImport = () => {
    if (data) {
      setShowLibraryImportConfirmation(true);
    } else {
      setShowLibraryImportDialog(true);
      loadLibraryItems();
    }
  };

  const confirmLibraryImport = () => {
    setShowLibraryImportConfirmation(false);
    setShowLibraryImportDialog(true);
    loadLibraryItems();
  };

  const loadLibraryItems = async () => {
    setLibraryLoading(true);
    setLibraryError(null);
    try {
      const items = await fetchLibraryItems();
      setLibraryItems(items);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      setLibraryError(message);
      toast.error(ERROR_MESSAGES.FILE_IMPORT.FAILED, {
        description: message,
      });
    } finally {
      setLibraryLoading(false);
    }
  };

  const handleLibraryItemSelect = async (selectedItem: LibraryItem) => {
    const loadingToast = toast.loading("Importing from library...", {
      description: `Fetching and parsing ${itemName}`,
    });

    try {
      // Fetch XML from API using identifier
      const xmlSource = await fetchLibraryItemXml(selectedItem.identifier);

      // Parse and set data
      const parsedData = await parser(xmlSource);
      handleSetData(parsedData);

      toast.dismiss(loadingToast);
      toast.success(SUCCESS_MESSAGES.FILE_IMPORT.SUCCESS, {
        description: `Imported ${selectedItem.identifier} from library`,
      });
    } catch (error) {
      toast.dismiss(loadingToast);
      const errorMessage = error instanceof Error ? error.message : ERROR_MESSAGES.FILE_IMPORT.UNKNOWN_ERROR;
      toast.error(ERROR_MESSAGES.FILE_IMPORT.FAILED, {
        description: errorMessage,
        duration: 5000,
      });
    }
  };

  // Load items when library dialog opens
  useEffect(() => {
    if (showLibraryImportDialog && libraryItems.length === 0 && !libraryLoading && !libraryError) {
      loadLibraryItems();
    }
  }, [showLibraryImportDialog, libraryItems.length, libraryLoading, libraryError]);

  const handlePreview = async () => {
    const html = await generatePreview();
    if (html) {
      setShowPreviewModal(true);
    }
  };

  const handleDebugPrint = () => {
    if (data) {
      const jsonString = JSON.stringify(data, null, 2);
      console.log(`Current ${itemNameCapitalized}:`, jsonString);
      console.log(`${itemNameCapitalized} Object:`, data);
    } else {
      console.log(`No ${itemName} loaded`);
    }
  };

  return (
    <div className="space-y-6">
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleFileChange}
        className="hidden"
        aria-label="Import XML file"
      />
      <EditorActions
        title={title}
        onEmpty={handleEmpty}
        onClear={handleClear}
        onImportFromFilesystem={handleImport}
        onImportFromLibrary={handleLibraryImport}
        onPreview={handlePreview}
        onExport={exportFile}
        emptyButtonLabel={emptyButtonLabel}
        isLoading={previewLoading || libraryLoading}
      />

      <ConfirmationDialog
        open={showClearDialog}
        onOpenChange={setShowClearDialog}
        title={`Clear ${itemNameCapitalized}`}
        description={`Current ${itemName} will not be saved. Are you sure you want to clear the current ${itemName}?`}
        confirmLabel="Clear"
        onConfirm={confirmClear}
      />

      <ConfirmationDialog
        open={showLoadEmptyDialog}
        onOpenChange={setShowLoadEmptyDialog}
        title={`Load Empty ${itemNameCapitalized}`}
        description={`Current ${itemName} will not be saved. Are you sure you want to load an empty ${itemName}?`}
        confirmLabel="Load Empty"
        onConfirm={confirmLoadEmpty}
      />

      <ConfirmationDialog
        open={showImportDialog}
        onOpenChange={setShowImportDialog}
        title={`Import ${itemNameCapitalized}`}
        description={`Current ${itemName} will not be saved. Are you sure you want to import a new ${itemName}?`}
        confirmLabel="Import"
        onConfirm={confirmImport}
      />

      <ConfirmationDialog
        open={showLibraryImportConfirmation}
        onOpenChange={setShowLibraryImportConfirmation}
        title="Import from Library"
        description={`Current ${itemName} will not be saved. Are you sure you want to import a ${itemName} from the library?`}
        confirmLabel="Import"
        onConfirm={confirmLibraryImport}
      />

      <LibraryImportModal
        open={showLibraryImportDialog}
        onOpenChange={setShowLibraryImportDialog}
        title="Import from Library"
        description={`Select a ${itemName} from the library to import`}
        profiles={libraryItems}
        loading={libraryLoading}
        error={libraryError}
        onSelect={handleLibraryItemSelect}
        confirmLabel="Import"
        searchPlaceholder={searchPlaceholder}
      />

      <XmlPreviewModal
        open={showPreviewModal}
        onOpenChange={(open) => {
          setShowPreviewModal(open);
          if (!open) {
            setPreviewHtml(null);
          }
        }}
        previewHtml={previewHtml}
        isLoading={previewLoading}
        title={`${itemNameCapitalized} Preview`}
      />

      {data ? (
        FormComponent
      ) : (
        <div className="text-center text-muted-foreground py-12">No {itemNameCapitalized} loaded.</div>
      )}

      {DEBUG && (
        <div className="fixed bottom-4 right-4 z-50 shadow-lg">
          <Button onClick={handleDebugPrint} size="sm">
            Debug JSON
          </Button>
        </div>
      )}
    </div>
  );
}
