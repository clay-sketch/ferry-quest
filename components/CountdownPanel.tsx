type CountdownPanelProps = {
  label: string;
  time: string;
  helperText?: string;
};

export function CountdownPanel({
  label,
  time,
  helperText,
}: CountdownPanelProps) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm">
      <p className="text-sm font-medium text-slate-500">{label}</p>
      <p className="mt-2 text-3xl font-bold">{time}</p>
      {helperText ? (
        <p className="mt-2 text-sm text-slate-500">{helperText}</p>
      ) : null}
    </div>
  );
}