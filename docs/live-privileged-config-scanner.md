# Live Privileged Config Scanner

## Core Thesis

Privileged configuration is invisible until it breaks. GrantOps Sentinel should not only show what a deploy artifact claimed at launch; it should read what the contract actually authorizes today, at the latest block.

## Current MVP Reads

For Base and Arbitrum contracts, the browser demo reads current chain state through public RPC:

- `owner()`
- `admin()`
- `implementation()`
- `paused()`
- EIP-1967 implementation slot
- EIP-1967 admin slot
- EIP-1967 beacon slot
- Safe `getThreshold()`
- Safe `getOwners()`

## Why This Matters

Grant reviewers, users, and ecosystem teams need to know whether a project is still controlled by the addresses and roles they expect. Static metadata can go stale immediately after deployment. Live privileged config makes the hidden control layer visible.

## Next Detection Targets

- OpenZeppelin `AccessControl` roles
- `AccessControlEnumerable` role member enumeration
- Timelock delay and proposer/executor roles
- Proxy family detection
- Multisig owner labels and threshold changes
- Config drift history across blocks
- Alerts for owner/admin/implementation changes

## Boundary

This is not an audit certificate. It is a live risk signal layer that helps reviewers and builders know what to inspect next.

