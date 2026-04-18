import Link from "next/link";
import { WalletConnectButton } from "@/components/wallet/connect-button";

const features = [
  "Create a public commitment with a deposit in MON",
  "Set a deadline and a beneficiary if you fail",
  "Submit proof before the deadline",
  "Claim your refund or let the penalty execute onchain",
];

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6 py-12">
      <section className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
        <div className="space-y-6">
          <div className="inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-neutral-300">
            Monad Blitz MVP
          </div>
          <div className="space-y-4">
            <h1 className="max-w-3xl text-5xl font-semibold tracking-tight text-white sm:text-6xl">
              TrustDrop turns promises into programmable commitments.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-neutral-300">
              Create a goal, lock a deposit on Monad, define who gets paid if you fail,
              and make the consequence public. If you complete it, you get your money back.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <WalletConnectButton />
            <Link
              href="/create"
              className="rounded-xl bg-violet-600 px-5 py-3 font-medium text-white transition hover:bg-violet-500"
            >
              Create commitment
            </Link>
            <Link
              href="/commitment/demo"
              className="rounded-xl border border-white/15 px-5 py-3 font-medium text-white transition hover:bg-white/5"
            >
              View demo commitment
            </Link>
          </div>
          <div className="grid gap-3 pt-4 sm:grid-cols-2">
            {features.map((feature) => (
              <div key={feature} className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-neutral-200">
                {feature}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-black/30 p-6 shadow-2xl shadow-violet-950/30 backdrop-blur">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-400">Live example</p>
              <h2 className="text-2xl font-semibold">Ship Monad Blitz demo</h2>
            </div>
            <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-sm text-emerald-300">
              Active
            </span>
          </div>
          <div className="space-y-4 text-sm text-neutral-300">
            <div className="rounded-2xl border border-white/10 p-4">
              <p className="text-neutral-500">At stake</p>
              <p className="mt-1 text-3xl font-semibold text-white">0.10 MON</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 p-4">
                <p className="text-neutral-500">Deadline</p>
                <p className="mt-1 text-white">Apr 20, 2026, 18:00 UTC</p>
              </div>
              <div className="rounded-2xl border border-white/10 p-4">
                <p className="text-neutral-500">Beneficiary</p>
                <p className="mt-1 truncate text-white">0xBri...0MON</p>
              </div>
            </div>
            <div className="rounded-2xl border border-dashed border-violet-500/40 bg-violet-500/5 p-4 text-violet-100">
              If this builder fails to ship the demo before the deadline, the deposit goes to the beneficiary wallet automatically once claimed.
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
