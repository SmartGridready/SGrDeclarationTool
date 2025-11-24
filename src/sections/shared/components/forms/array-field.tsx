import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/sections/shared/components/shadcn/button";

interface ArrayFieldProps<T> {
  label: string;
  items: T[] | undefined;
  onAdd: () => void;
  onRemove: (index: number) => void;
  renderItem: (item: T, index: number) => React.ReactNode;
  emptyMessage?: string;
  className?: string;
}

export function ArrayField<T>({
  label,
  items = [],
  onAdd,
  onRemove,
  renderItem,
  emptyMessage = "No items",
  className = "",
}: ArrayFieldProps<T>) {
  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium">{label}</label>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onAdd}
          className="flex items-center gap-1"
        >
          <Plus className="h-4 w-4" />
          Add {label}
        </Button>
      </div>

      {items.length === 0 ? (
        <p className="text-sm text-muted-foreground italic">{emptyMessage}</p>
      ) : (
        <div className="space-y-4">
          {items.map((item, index) => (
            <div
              key={index}
              className="flex items-start gap-4 p-4 border rounded-md bg-card"
            >
              <div className="flex-1 space-y-3">{renderItem(item, index)}</div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => onRemove(index)}
                className="shrink-0 mt-1"
                title={`Remove ${label}`}
              >
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
