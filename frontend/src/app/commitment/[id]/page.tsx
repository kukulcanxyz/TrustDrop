import Link from "next/link";
import { mockCommitment } from "@/lib/mock-data";

export default async function CommitmentDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const commitment = { ...mockCommitment, id };

  return (
    <main className="mx-auto min-h-screen w-full max-w-5xl px-6 py-12">
      <div className="mb-8 flex items-center justify-between gap-4">
        <div>
          <p className="text-sm text-neutral-400">Commitment #{commitment.id}</p>
          <h1 className="text-4xl font-semibold text-white">{commitment.description}</h1>
        </div>
        <Link href="/create" className="rounded-xl border border-white/15 px-4 py-2 text-sm text-white hover:bg-white/5">
          New commitment
        </Link>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="space-y-6 rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="flex items-center justify-between">
            <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-sm text-emerald-300">
              {commitment.status}
            </span>
            <span className="text-sm text-neutral-400">Public page</span>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <InfoCard label="Creator" value={commitment.creator} />
            <InfoCard label="Beneficiary" value={commitment.beneficiary} />
            <InfoCard label="Amount" value={commitment.amount} />
            <InfoCard label="Deadline" value="Apr 20, 2026, 18:00 UTC" />
          </div>

          <div className="rounded-2xl border border-violet-500/30 bg-violet-500/5 p-5">
            <p className="text-sm text-violet-200">If the creator completes the goal before the deadline, they can reclaim the deposit. Otherwise, the beneficiary claims the penalty after expiry.</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
            <p className="text-sm text-neutral-400">Proof of completion</p>
            <a href={commitment.proof} className="mt-2 block text-white underline" target="_blank" rel="noreferrer">
              {commitment.proof}
            </a>
          </div>
        </section>

        <aside className="space-y-4 rounded-3xl border border-white/10 bg-black/30 p-6">
          <div className="rounded-2xl border border-white/10 p-4">
            <p className="text-sm text-neutral-400">Countdown</p>
            <p className="mt-2 text-3xl font-semibold text-white">23h 14m</p>
          </div>
          <button className="w-full rounded-2xl bg-violet-600 px-4 py-3 font-medium text-white hover:bg-violet-500">
            Submit proof and mark complete
          </button>
          <button className="w-full rounded-2xl border border-white/15 px-4 py-3 font-medium text-white hover:bg-white/5">
            Claim refund
          </button>
          <button className="w-full rounded-2xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 font-medium text-rose-200 hover:bg-rose-500/20">
            Claim penalty
          </button>
        </aside>
      </div>
    </main>
  );
}

function InfoCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
      <p className="text-sm text-neutral-400">{label}</p>
      <p className="mt-2 text-white">{value}</p>
    </div>
  );
}
