# GrantOps Sentinel

![GrantOps Sentinel logo](./assets/grantops-sentinel-logo.png)

GrantOps Sentinel is an open-source live privileged configuration scanner for Base and Arbitrum builders.

It helps early dApp teams prove what they shipped and lets reviewers inspect what a contract currently authorizes onchain: current owner, proxy admin, implementation address, pause status, and Safe-style multisig configuration where exposed.

## Live Demo

Deployment target:

```text
https://grantops-sentinel.vercel.app/
```

The MVP is deployed and publicly accessible.

## What The MVP Does

- Register Base and Arbitrum projects.
- Create public project proof pages.
- Show contract addresses and explorer links.
- Track source verification status.
- Scan live privileged configuration from current chain state.
- Read common authorization surfaces such as `owner()`, `admin()`, `implementation()`, `paused()`, EIP-1967 proxy slots, and Safe `getThreshold()` / `getOwners()`.
- Flag live risk signals such as current owner, current proxy admin, current implementation, pause state, and declared privileged functions.
- Show milestone evidence and recent activity metrics.
- Export a JSON report for grant reviewers or internal tracking.

## Why This Matters

Grant reviewers and ecosystem teams often need to manually verify whether a project has actually shipped. The harder problem is that privileged configuration changes over time: the deploy artifact may say one thing, but the contract may authorize a different owner, proxy admin, or implementation today.

GrantOps Sentinel gives builders a standardized proof page and gives reviewers a faster way to inspect shipped work and current authorization state at the latest block.

## Supported Networks

- Base
- Base Sepolia
- Arbitrum One
- Arbitrum Sepolia

Planned:

- richer AccessControl role probing
- timelock delay detection
- Solana mainnet/devnet program evidence
- OP Stack ecosystem support
- automated explorer API ingestion

## Local Usage

This MVP is a static site. No build step is required.

Open:

```text
index.html
```

Or deploy the repository directly to Vercel, Netlify, Cloudflare Pages, or GitHub Pages.

## Applicant

- Applicant: Yutong Zhang
- Brand / Team: Cognitive Bridge
- Company entity: Shenzhen Witwith Technology Co., Ltd.
- Location: Hong Kong
- Email: hidargmax27@gmail.com
- X/Twitter: https://x.com/cognibridgeai
- Farcaster: nahtyra
- Telegram/Discord: nah058130
- Wallet: 0x066889167Ba3629ef8bBc6069Ed705b9105b9d2C
- GitHub: https://github.com/hidargmax27-cmyk/grantops-sentinel
- Arbitrum One contract: 0xb47349c83381f9C8EFeDB89354f89C2a699B9F05

## Disclaimer

GrantOps Sentinel provides public risk signals, project evidence, and live authorization readings. It is not a smart contract audit, a security certification, financial advice, or an endorsement of any project.

## License

MIT

