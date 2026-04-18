export const trustDropAddress = process.env.NEXT_PUBLIC_TRUSTDROP_ADDRESS as `0x${string}` | undefined;

export const trustDropAbi = [
  {
    type: 'function',
    name: 'createCommitment',
    stateMutability: 'payable',
    inputs: [
      { name: 'description', type: 'string' },
      { name: 'deadline', type: 'uint256' },
      { name: 'beneficiary', type: 'address' },
    ],
    outputs: [{ name: 'id', type: 'uint256' }],
  },
  {
    type: 'function',
    name: 'submitProofAndMarkComplete',
    stateMutability: 'nonpayable',
    inputs: [
      { name: 'id', type: 'uint256' },
      { name: 'proof', type: 'string' },
    ],
    outputs: [],
  },
  {
    type: 'function',
    name: 'claimRefund',
    stateMutability: 'nonpayable',
    inputs: [{ name: 'id', type: 'uint256' }],
    outputs: [],
  },
  {
    type: 'function',
    name: 'claimPenalty',
    stateMutability: 'nonpayable',
    inputs: [{ name: 'id', type: 'uint256' }],
    outputs: [],
  },
] as const;
