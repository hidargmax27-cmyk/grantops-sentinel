# Submission Copy V2

Use this version after upgrading GrantOps Sentinel into a live privileged configuration scanner.

## Intro

GrantOps Sentinel is an open-source live privileged configuration scanner for Arbitrum/Base contracts. It shows what a contract actually authorizes today: owner, proxy admin, implementation, pause state, and Safe config.

## MVP Link

```text
https://grantops-sentinel.vercel.app/
```

## GitHub

```text
https://github.com/hidargmax27-cmyk/grantops-sentinel
```

## Arbitrum One Contract

```text
Deploy GrantOpsLiveConfigRegistryV2 and use the new contract address.
```

## Description

GrantOps Sentinel is an open-source live privileged configuration scanner for Arbitrum and Base builders.

The project helps builders, grant reviewers, and users inspect what smart contracts actually authorize today, not only what a deploy artifact claimed at launch. It creates public proof pages for projects and reads live onchain configuration from public RPC, including current owner, proxy admin, implementation address, pause status, EIP-1967 proxy slots, and Safe threshold/owners where exposed.

For the Arbitrum ecosystem, this makes the hidden control layer easier to review. A project can be live, verified, and milestone-ready, but still have privileged settings that are hard to inspect manually. GrantOps Sentinel turns those settings into a public, grant-ready dashboard.

MVP:
https://grantops-sentinel.vercel.app/

GitHub:
https://github.com/hidargmax27-cmyk/grantops-sentinel

Arbitrum One contract:
0xb47349c83381f9C8EFeDB89354f89C2a699B9F05

## Progress During Buildathon

I upgraded the MVP into a live privileged config scanner, deployed an Arbitrum proof contract, added owner/admin/implementation/EIP-1967/pause/Safe checks, updated docs, and prepared the project for grant submission.

## Deployment Details

Frontend deployed on Vercel:
https://grantops-sentinel.vercel.app/

Repository:
https://github.com/hidargmax27-cmyk/grantops-sentinel

Arbitrum One live config registry contract:
0xb47349c83381f9C8EFeDB89354f89C2a699B9F05

Network:
Arbitrum One, Chain ID 42161

Contract source:
contracts/GrantOpsProofRegistry.sol

The current MVP scans live contract state through public Base and Arbitrum RPC endpoints and surfaces current privileged configuration such as owner, admin, implementation, EIP-1967 proxy slots, pause state, and Safe threshold/owners where exposed.

## Tech Stack

Select:

```text
React
Next
Web3
Ethers
Node
Solidity
```

If more are allowed:

```text
Python
```

## Product Category

Select:

```text
Infra
AI
Other
```

If available, prefer:

```text
Developer Tools
Infrastructure
Security
```

## Sponsor / Partner Technologies

Select:

```text
Have not used any
```

## Fundraising Status

The project is pre-grant and bootstrapped. I am applying for ecosystem support through Arbitrum Open House and related grant programs to continue development, keep the project open-source, index more Arbitrum/Base projects, and improve live privileged configuration monitoring.

## Bio

Builder behind Cognitive Bridge and GrantOps Sentinel. Working on live privileged configuration monitoring for Arbitrum/Base contracts, helping builders and reviewers see what smart contracts actually authorize today, not just what deploy artifacts claimed at launch.

