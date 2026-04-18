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
