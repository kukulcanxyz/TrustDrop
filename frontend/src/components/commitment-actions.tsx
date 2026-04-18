'use client';

import { useState } from 'react';
import { parseEther } from 'viem';
import { useWriteContract } from 'wagmi';
import { trustDropAbi, trustDropAddress } from '@/lib/contract';

export function CreateCommitmentAction({
  description,
  amount,
  deadline,
  beneficiary,
}: {
  description: string;
  amount: string;
  deadline: string;
  beneficiary: string;
}) {
  const [feedback, setFeedback] = useState<string>('');
  const { writeContractAsync, isPending } = useWriteContract();

  async function handleCreate() {
    if (!trustDropAddress) {
      setFeedback('Set NEXT_PUBLIC_TRUSTDROP_ADDRESS to enable onchain create.');
      return;
    }

    try {
      const tx = await writeContractAsync({
        address: trustDropAddress,
        abi: trustDropAbi,
        functionName: 'createCommitment',
        args: [description, BigInt(Math.floor(new Date(deadline).getTime() / 1000)), beneficiary as `0x${string}`],
        value: parseEther(amount || '0'),
      });
      setFeedback(`Transaction submitted: ${tx}`);
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : 'Failed to create commitment');
    }
  }

  return (
    <div className="space-y-3">
      <button
        type="button"
        onClick={handleCreate}
        disabled={isPending}
        className="rounded-2xl bg-violet-600 px-5 py-3 font-medium text-white transition hover:bg-violet-500 disabled:opacity-60"
      >
        {isPending ? 'Submitting...' : 'Create commitment on Monad'}
      </button>
      {feedback ? <p className="text-sm text-neutral-300">{feedback}</p> : null}
    </div>
  );
}
