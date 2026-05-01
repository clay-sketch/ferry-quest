type QuestStatusCardProps = {
  status: string;
};

export function QuestStatusCard({ status }: QuestStatusCardProps) {
  return (
    <div className="rounded-3xl bg-emerald-100 p-6 shadow-sm">
      <p className="text-sm font-medium text-emerald-700">Quest Status</p>
      <p className="mt-2 text-3xl font-bold text-emerald-900">{status}</p>
      <p className="mt-2 text-sm text-emerald-700">
        All crews have plenty of pixie dust left.
      </p>
    </div>
  );
}