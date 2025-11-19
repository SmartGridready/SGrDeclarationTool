import { Button } from "@/components/ui/button";
import { Upload, ChevronDown } from "lucide-react";

interface EditorActionsProps {
  title: string;
  onNew: () => void;
  onEmpty?: () => void;
  onClear: () => void;
  newButtonLabel?: string;
  emptyButtonLabel?: string;
  isLoading?: boolean;
}

export function EditorActions({
  title,
  onNew,
  onEmpty,
  onClear,
  newButtonLabel = "New",
  emptyButtonLabel = "Empty",
  isLoading = false,
}: EditorActionsProps) {
  return (
    <div className="flex justify-between items-center">
      <h1 className="text-2xl font-bold">{title}</h1>
      <div className="space-x-2">
        <Button onClick={onNew}>{newButtonLabel}</Button>
        {onEmpty && (
          <Button variant="outline" onClick={onEmpty}>
            {emptyButtonLabel}
          </Button>
        )}
        <Button variant="outline" size="sm" disabled={isLoading}>
          <Upload className="h-4 w-4 mr-2" />
          Importieren
          <ChevronDown className="h-4 w-4 ml-2" />
        </Button>

        <Button variant="outline" onClick={onClear}>
          Clear
        </Button>
      </div>
    </div>
  );
}
