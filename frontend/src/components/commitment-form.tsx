'use client';

import { useMemo, useState } from 'react';
import { CreateCommitmentAction } from '@/components/commitment-actions';

export function CommitmentForm() {
  const [description, setDescription] = useState('Ship Monad Blitz demo before 6 PM');
  const [amount, setAmount] = useState('0.10');
  const [deadline, setDeadline] = useState('2026-04-20T18:00');
  const [beneficiary, setBeneficiary] = useState('0x000000000000000000000000000000000000dEaD');
  const [proofHint, setProofHint] = useState('Add your deploy link or GitHub repo before deadline');

  const summary = useMemo(
    () => [
      `${amount} MON locked`,
      `Beneficiary: ${beneficiary.slice(0, 6)}...${beneficiary.slice(-4)}`,
      `Deadline: ${deadline || 'Unset'}`,
    ],
    [amount, beneficiary, deadline],
  );

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
      <form className="space-y-5 rounded-3xl border border-white/10 bg-white/5 p-6">
        <div>
          <label className="mb-2 block text-sm text-neutral-300">Commitment</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="min-h-28 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none"
          />
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm text-neutral-300">Deposit (MON)</label>
            <input
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm text-neutral-300">Deadline</label>
            <input
              type="datetime-local"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none"
            />
          </div>
        </div>
        <div>
          <label className="mb-2 block text-sm text-neutral-300">Beneficiary wallet</label>
          <input
            value={beneficiary}
            onChange={(e) => setBeneficiary(e.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm text-neutral-300">Proof placeholder</label>
          <input
            value={proofHint}
            onChange={(e) => setProofHint(e.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none"
          />
        </div>
        <CreateCommitmentAction
          description={description}
          amount={amount}
          deadline={deadline}
          beneficiary={beneficiary}
        />
      </form>

      <aside className="rounded-3xl border border-white/10 bg-black/30 p-6">
        <p className="text-sm text-neutral-400">Preview</p>
        <h2 className="mt-2 text-2xl font-semibold text-white">Public commitment card</h2>
        <p className="mt-2 text-sm leading-6 text-neutral-300">{description}</p>
        <div className="mt-6 space-y-3">
          {summary.map((item) => (
            <div key={item} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-neutral-200">
              {item}
            </div>
          ))}
        </div>
        <div className="mt-6 rounded-2xl border border-dashed border-emerald-500/40 bg-emerald-500/5 p-4 text-sm text-emerald-200">
          Proof prompt: {proofHint}
        </div>
      </aside>
    </div>
  );
}
