import Link from 'next/link';
import { mockCommitment } from '@/lib/mock-data';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default async function CommitmentDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const commitment = { ...mockCommitment, id };

  return (
    <main className="mx-auto min-h-screen w-full max-w-5xl px-6 py-10">
      <div className="mb-10 flex items-center justify-between border-b border-neutral-900 pb-6">
        <div>
          <p className="text-sm text-neutral-500">Commitment #{commitment.id}</p>
          <h1 className="mt-2 text-4xl font-semibold text-white">{commitment.description}</h1>
        </div>
        <Link href="/create">
          <Button variant="outline">New commitment</Button>
        </Link>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Public commitment</CardTitle>
                <CardDescription>Track the stake, deadline, beneficiary, and proof.</CardDescription>
              </div>
              <Badge variant="success">{commitment.status}</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <InfoRow label="Creator" value={commitment.creator} />
            <InfoRow label="Beneficiary" value={commitment.beneficiary} />
            <InfoRow label="Amount" value={commitment.amount} />
            <InfoRow label="Deadline" value="Apr 20, 2026 · 18:00 UTC" />
            <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-5 text-sm text-neutral-300">
              If the creator does not complete the goal before the deadline, the beneficiary can claim the deposit after expiry.
            </div>
            <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-5">
              <p className="text-sm text-neutral-500">Proof</p>
              <a href={commitment.proof} className="mt-2 block text-sm text-white underline" target="_blank" rel="noreferrer">
                {commitment.proof}
              </a>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Actions</CardTitle>
            <CardDescription>Available actions depend on role and current state.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-2xl border border-neutral-800 px-4 py-5">
              <p className="text-sm text-neutral-500">Countdown</p>
              <p className="mt-2 text-3xl font-semibold text-white">23h 14m</p>
            </div>
            <Button className="w-full">Submit proof and mark complete</Button>
            <Button className="w-full" variant="outline">Claim refund</Button>
            <Button className="w-full" variant="danger">Claim penalty</Button>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-neutral-800 px-4 py-3 text-sm">
      <span className="text-neutral-500">{label}</span>
      <span className="text-white">{value}</span>
    </div>
  );
}
