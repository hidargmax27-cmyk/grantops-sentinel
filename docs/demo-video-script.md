# GrantOps Sentinel Demo Video Script

## Goal

Record a short demo video that shows how GrantOps Sentinel helps builders create a grant-ready proof page and helps reviewers inspect basic evidence quickly. The target length is 90 to 150 seconds.

## Suggested Video Title

GrantOps Sentinel: Public Proof Pages for Base and Arbitrum Builders

## Script

### 0:00–0:10 — Opening

Hello, this is GrantOps Sentinel, an open-source public proof and risk-signal dashboard for Base and Arbitrum builders.

The goal is simple: help early teams show what they have shipped, where contracts are deployed, whether source code is verified, what privileged controls may exist, and which milestones can be referenced in grant applications.

### 0:10–0:25 — Problem

Grant reviewers often need to verify evidence across multiple places: block explorers, GitHub repositories, milestone notes, social posts, and private documents. For early builders, this makes grant applications harder to prepare. For reviewers, it makes first-pass review slower and less consistent.

GrantOps Sentinel creates one structured proof view that can be shared with reviewers.

### 0:25–0:45 — Dashboard Overview

On the dashboard, we can see a project registry, overview metrics, chain filters, search, and a detail panel. The MVP supports Base, Base Sepolia, Arbitrum One, and Arbitrum Sepolia.

Each project can show the contract address, explorer link, source verification status, milestone evidence, recent activity, and a grant-ready summary.

### 0:45–1:10 — Add a Project

Now I will add a sample project. I enter the project name, select the chain, paste the contract address, add a GitHub repository, describe the current milestone, and include any privileged function keywords such as upgrade, pause, mint, blacklist, sweep, or withdraw.

After clicking Generate Proof Page, the project is added to the registry and the detail panel updates immediately.

### 1:10–1:30 — Review Risk Signals and Evidence

The generated page includes explorer access, verification status, weekly activity, milestone evidence, and risk signals. These signals are not an audit. They are basic public indicators that help reviewers know what to inspect next.

For example, if a contract uses a proxy or includes privileged functions, the dashboard surfaces those as medium or high risk signals.

### 1:30–1:45 — Export Report

The export button creates a JSON report containing all registered projects, explorer links, risk levels, and evidence fields. This can be attached to internal tracking or used as a lightweight reviewer packet.

### 1:45–2:00 — Closing

The current MVP is static and open source. The next roadmap items are automated BaseScan and Arbiscan ingestion, persistent public proof pages, and reviewer-friendly Markdown exports.

GrantOps Sentinel is built to make grant evidence clearer, faster to review, and easier for builders to maintain.

## Recording Checklist

| Item | Status |
|---|---|
| Open deployed demo URL | Pending |
| Show dashboard overview | Pending |
| Add one project | Pending |
| Show explorer link | Pending |
| Show risk signals | Pending |
| Export JSON report | Pending |
| Mention disclaimer | Pending |

## Notes

Keep the tone clear and practical. Do not overclaim security benefits. The product provides public evidence and basic risk signals, not a smart contract audit or certification.
