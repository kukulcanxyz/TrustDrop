import Link from 'next/link';
import { ArrowRight, CheckCircle2, Shield, Wallet } from 'lucide-react';
import { WalletConnectButton } from '@/components/wallet/connect-button';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const features = [
  {
    title: 'Stake the promise',
    description: 'Define a goal and lock a deposit with a clear financial consequence.',
    icon: Wallet,
  },
  {
    title: 'Make it visible',
    description: 'Share a public page with the deadline, beneficiary, and current status.',
    icon: Shield,
  },
  {
    title: 'Resolve transparently',
    description: 'Recover funds on completion or let the beneficiary claim after expiry.',
    icon: CheckCircle2,
  },
];

export default function Home() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-6xl px-6 py-10">
      <header className="mb-16 flex items-center justify-between border-b border-[var(--line)] pb-6">
        <div>
          <p className="text-sm text-[var(--muted)]">TrustDrop</p>
          <h1 className="text-lg font-semibold text-[var(--ink)]">Programmable commitments on Monad</h1>
        </div>
        <WalletConnectButton />
      </header>

      <section className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
        <div className="space-y-6 pt-4">
          <Badge>Monad Blitz MVP</Badge>
          <div className="space-y-4">
            <h2 className="max-w-3xl text-5xl font-semibold tracking-tight text-[var(--ink)]">
              Give your word a real cost.
            </h2>
            <p className="max-w-2xl text-lg leading-8 text-[var(--muted)]">
              TrustDrop lets a builder commit publicly, lock value onchain, and define exactly who gets paid if the promise fails.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/create">
              <Button size="lg">
                Create commitment
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/commitment/demo">
              <Button variant="outline" size="lg">
                View public page
              </Button>
            </Link>
          </div>
        </div>

        <Card className="bg-[var(--surface)]">
          <CardContent className="p-6">
            <div className="mb-8 flex items-start justify-between">
              <div>
                <p className="text-sm text-[var(--muted)]">Active commitment</p>
                <h3 className="mt-2 text-2xl font-semibold text-[var(--ink)]">Ship Monad Blitz demo</h3>
              </div>
              <Badge variant="success">Active</Badge>
            </div>

            <div className="space-y-3">
              <Metric label="Amount at stake" value="0.10 MON" />
              <Metric label="Deadline" value="Apr 20, 2026 · 18:00 UTC" />
              <Metric label="Beneficiary" value="0x2fa1...bb09" />
            </div>

            <div className="mt-6 rounded-2xl border border-[var(--line)] bg-[var(--surface-2)] p-5 text-sm text-[var(--muted)]">
              If the deadline passes without completion, the beneficiary can claim the deposit onchain.
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="mt-20 grid gap-4 md:grid-cols-3">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <Card key={feature.title}>
              <CardContent className="p-6">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl border border-[var(--line)] bg-[var(--surface-2)]">
                  <Icon className="h-5 w-5 text-[var(--ink)]" />
                </div>
                <h3 className="text-lg font-semibold text-[var(--ink)]">{feature.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{feature.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </section>
    </main>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-[var(--line)] bg-[var(--surface)] px-4 py-3">
      <span className="text-sm text-[var(--muted)]">{label}</span>
      <span className="text-sm font-medium text-[var(--ink)]">{value}</span>
    </div>
  );
}
