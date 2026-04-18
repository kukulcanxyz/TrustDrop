# Contracts

Minimal Foundry setup for TrustDrop.

## Included
- `src/TrustDrop.sol` contract scaffold
- `test/TrustDrop.t.sol` Foundry tests draft
- `script/Deploy.s.sol` deploy script draft

## Current note
This machine does not currently have `forge` available in PATH, so tests and deployment need a Foundry-enabled environment.

## Commands

```bash
cd contracts
forge build
forge test
forge script script/Deploy.s.sol:DeployScript --rpc-url $MONAD_RPC_URL --broadcast
```
