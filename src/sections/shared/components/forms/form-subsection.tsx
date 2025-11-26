interface FormSubSectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export function FormSubSection({
  title,
  children,
  className = "",
}: FormSubSectionProps) {
  return (
    <div className={`border-t pt-4 mt-4 space-y-4 ${className}`}>
      <div className="font-semibold text-sm">{title}</div>
      {children}
    </div>
  );
}
