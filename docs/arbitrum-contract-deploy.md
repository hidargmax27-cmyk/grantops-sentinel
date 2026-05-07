# Deploy GrantOpsProofRegistry To Arbitrum One

This file is for the Arbitrum Open House form field that asks for a contract address.

## Contract

Use:

```text
contracts/GrantOpsProofRegistry.sol
```

## Network

Deploy to Arbitrum One mainnet if the form requires a production ecosystem contract.

```text
Network name: Arbitrum One
Chain ID: 42161
Currency: ETH
RPC: https://arb1.arbitrum.io/rpc
Explorer: https://arbiscan.io/
```

## Deployment Steps With Remix

1. Open https://remix.ethereum.org/
2. Create a new file named `GrantOpsProofRegistry.sol`
3. Paste the code from `contracts/GrantOpsProofRegistry.sol`
4. Open the Solidity Compiler tab
5. Select compiler `0.8.20` or newer
6. Click Compile
7. Open Deploy & Run Transactions
8. Environment: `Injected Provider - MetaMask`
9. In MetaMask, switch to `Arbitrum One`
10. Select contract `GrantOpsProofRegistry`
11. Click Deploy
12. Confirm the transaction in MetaMask
13. Copy the deployed contract address
14. Paste that address into the buildathon form

## After Deploying

Deployed Arbitrum One contract:

```text
0x6c8a8d204770d76078161bc391213524fdb6c4e7
```

In Remix, call `registerProof` with:

```text
name: GrantOps Sentinel
demoUrl: https://grantops-sentinel.vercel.app/
githubUrl: https://github.com/hidargmax27-cmyk/grantops-sentinel
milestone: Arbitrum Open House MVP
```

This optional transaction creates a public proof event onchain.
