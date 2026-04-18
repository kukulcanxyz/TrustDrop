'use client';

import { useMemo, useState } from 'react';
import { CreateCommitmentAction } from '@/components/commitment-actions';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

function Input({ className = '', ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input className={`w-full rounded-xl border border-[var(--line)] bg-[var(--surface)] px-4 py-3 text-sm text-[var(--ink)] outline-none placeholder:text-[var(--muted)] ${className}`} {...props} />;
}

function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className="min-h-32 w-full rounded-xl border border-[var(--line)] bg-[var(--surface)] px-4 py-3 text-sm text-[var(--ink)] outline-none placeholder:text-[var(--muted)]" {...props} />;
}

export function CommitmentForm() {
  const [description, setDescription] = useState('Ship Monad Blitz demo before 6 PM');
  const [amount, setAmount] = useState('0.10');
  const [deadline, setDeadline] = useState('2026-04-20T18:00');
  const [beneficiary, setBeneficiary] = useState('0x000000000000000000000000000000000000dEaD');
  const [proofHint, setProofHint] = useState('Paste deploy URL, GitHub repo, or proof note');

  const summary = useMemo(
    () => [
      { label: 'Deposit', value: `${amount} MON` },
      { label: 'Deadline', value: deadline || 'Unset' },
      { label: 'Beneficiary', value: `${beneficiary.slice(0, 6)}...${beneficiary.slice(-4)}` },
    ],
    [amount, beneficiary, deadline],
  );

  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <Card>
        <CardHeader>
          <CardTitle>Create a commitment</CardTitle>
          <CardDescription>Define the promise, lock the deposit, and make the consequence explicit.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div>
            <label className="mb-2 block text-sm text-[var(--muted)]">Commitment</label>
            <Textarea value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm text-[var(--muted)]">Deposit</label>
              <Input value={amount} onChange={(e) => setAmount(e.target.value)} />
            </div>
            <div>
              <label className="mb-2 block text-sm text-[var(--muted)]">Deadline</label>
              <Input type="datetime-local" value={deadline} onChange={(e) => setDeadline(e.target.value)} />
            </div>
          </div>
          <div>
            <label className="mb-2 block text-sm text-[var(--muted)]">Beneficiary wallet</label>
            <Input value={beneficiary} onChange={(e) => setBeneficiary(e.target.value)} />
          </div>
          <div>
            <label className="mb-2 block text-sm text-[var(--muted)]">Proof placeholder</label>
            <Input value={proofHint} onChange={(e) => setProofHint(e.target.value)} />
          </div>
          <CreateCommitmentAction description={description} amount={amount} deadline={deadline} beneficiary={beneficiary} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Preview</CardTitle>
          <CardDescription>What the public commitment page will communicate.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-3xl border border-[var(--line)] bg-[var(--surface-2)] p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">Commitment</p>
            <p className="mt-3 text-lg font-medium text-[var(--ink)]">{description}</p>
          </div>
          <div className="grid gap-3">
            {summary.map((item) => (
              <div key={item.label} className="flex items-center justify-between rounded-xl border border-[var(--line)] bg-[var(--surface)] px-4 py-3 text-sm">
                <span className="text-[var(--muted)]">{item.label}</span>
                <span className="text-[var(--ink)]">{item.value}</span>
              </div>
            ))}
          </div>
          <div className="rounded-3xl border border-[var(--line)] bg-[var(--surface-2)] p-5 text-sm text-[var(--muted)]">
            <p className="text-[var(--muted)]">Proof guidance</p>
            <p className="mt-2 text-[var(--ink)]">{proofHint}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
