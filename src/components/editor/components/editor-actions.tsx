import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Upload, ChevronDown, HardDrive, Library } from "lucide-react";

interface EditorActionsProps {
  title: string;
  onNew: () => void;
  onImportFromFilesystem?: () => void;
  onImportFromLibrary?: () => void;
  onEmpty?: () => void;
  onClear: () => void;
  newButtonLabel?: string;
  emptyButtonLabel?: string;
  isLoading?: boolean;
}

export function EditorActions({
  title,
  onNew,
  onImportFromFilesystem,
  onImportFromLibrary,
  onEmpty,
  onClear,
  newButtonLabel = "New",
  emptyButtonLabel = "Empty",
  isLoading = false,
}: EditorActionsProps) {
  return (
    <div className="flex justify-between items-center">
      <h1 className="text-2xl font-bold">{title}</h1>
      <div className="flex items-center space-x-2">
        <Button onClick={onNew}>{newButtonLabel}</Button>
        {onEmpty && (
          <Button variant="outline" onClick={onEmpty}>
            {emptyButtonLabel}
          </Button>
        )}

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" disabled={isLoading}>
              <Upload className="h-4 w-4 mr-2" />
              Importieren
              <ChevronDown className="h-4 w-4 ml-2" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={onImportFromFilesystem}>
              <HardDrive className="h-4 w-4 mr-2" />
              Dateisystem
            </DropdownMenuItem>

            <DropdownMenuItem onClick={onImportFromLibrary}>
              <Library className="h-4 w-4 mr-2" />
              Bibliothek
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button variant="outline" onClick={onClear}>
          Clear
        </Button>
      </div>
    </div>
  );
}
