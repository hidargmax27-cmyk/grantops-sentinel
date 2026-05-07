# Deploy GrantOpsLiveConfigRegistryV2 To Arbitrum One

This file is for the Arbitrum Open House form field that asks for a contract address.

## Contract

Use:

```text
contracts/GrantOpsLiveConfigRegistryV2.sol
```

The original deployed contract was:

```text
0x6c8a8d204770d76078161bc391213524fdb6c4e7
```

That contract is not upgradeable, so the live privileged config scanner upgrade requires deploying a new V2 contract and using the new address in submissions.

The deployed V2 contract is:

```text
0xb47349c83381f9C8EFeDB89354f89C2a699B9F05
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
2. Create a new file named `GrantOpsLiveConfigRegistryV2.sol`
3. Paste the code from `contracts/GrantOpsLiveConfigRegistryV2.sol`
4. Open the Solidity Compiler tab
5. Select compiler `0.8.20` or newer
6. Click Compile
7. Open Deploy & Run Transactions
8. Environment: `Injected Provider - MetaMask`
9. In MetaMask, switch to `Arbitrum One`
10. Select contract `GrantOpsLiveConfigRegistryV2`
11. Constructor argument `demoUrl`: `https://grantops-sentinel.vercel.app/`
12. Constructor argument `githubUrl`: `https://github.com/hidargmax27-cmyk/grantops-sentinel`
13. Click Deploy
14. Confirm the transaction in MetaMask/Rabby
15. Copy the deployed V2 contract address
16. Paste that V2 address into the buildathon form

## After Deploying

Deployed V2 Arbitrum One contract:

```text
0xb47349c83381f9C8EFeDB89354f89C2a699B9F05
```

Old deployed Arbitrum One contract:

```text
0x6c8a8d204770d76078161bc391213524fdb6c4e7
```

Use the V2 address in current submissions.

In Remix, call `registerProof` on the V2 contract with:

```text
name: GrantOps Sentinel
demoUrl: https://grantops-sentinel.vercel.app/
githubUrl: https://github.com/hidargmax27-cmyk/grantops-sentinel
milestone: Live privileged config scanner MVP
```

This optional transaction creates a public proof event onchain.

## Submission Text

Use this format after V2 is deployed:

```text
Ecosystem: Arbitrum One
Network: Mainnet
Contract: 0xb47349c83381f9C8EFeDB89354f89C2a699B9F05
Arbiscan: https://arbiscan.io/address/0xb47349c83381f9C8EFeDB89354f89C2a699B9F05
Frontend: https://grantops-sentinel.vercel.app/
GitHub: https://github.com/hidargmax27-cmyk/grantops-sentinel
```
