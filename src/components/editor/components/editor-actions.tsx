import { Button } from "@/components/ui/button";

interface EditorActionsProps {
  title: string;
  onNew: () => void;
  onClear: () => void;
  newButtonLabel?: string;
}

export function EditorActions({
  title,
  onNew,
  onClear,
  newButtonLabel = "New",
}: EditorActionsProps) {
  return (
    <div className="flex justify-between items-center">
      <h1 className="text-2xl font-bold">{title}</h1>
      <div className="space-x-2">
        <Button onClick={onNew}>{newButtonLabel}</Button>
        <Button variant="outline" onClick={onClear}>
          Clear
        </Button>
      </div>
    </div>
  );
}
