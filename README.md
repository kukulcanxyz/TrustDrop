# TrustDrop

TrustDrop is a Monad hackathon project that turns promises into programmable commitments.

## Structure

- `frontend/` Next.js MVP frontend
- `contracts/` Foundry smart contract scaffold
- `docs/` product and MVP documentation

## Quick start

### Frontend

```bash
cd frontend
pnpm install
pnpm dev
```

### Contracts

```bash
cd contracts
forge build
forge test
```

## MVP flow

1. Create commitment with deposit, deadline, and beneficiary
2. Publish a public commitment page
3. Submit proof and mark it complete
4. Claim refund or let beneficiary claim penalty after expiry

## Environment variables

### Frontend
Copy `frontend/.env.example` to `frontend/.env.local` and fill:
- `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID`
- `NEXT_PUBLIC_TRUSTDROP_ADDRESS`

### Contracts
Copy `contracts/.env.example` to `contracts/.env` and fill:
- `MONAD_RPC_URL`
- `PRIVATE_KEY`
