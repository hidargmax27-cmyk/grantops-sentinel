# GrantOps Sentinel Roadmap

## Product Direction

GrantOps Sentinel is being developed as a lightweight public proof and risk-signal layer for ecosystem grant workflows. The long-term goal is to help builders produce clean evidence pages and help reviewers inspect deployments, milestones, contract verification, and basic control risks more efficiently.

The MVP is a static application focused on clarity and speed. The next phases should move from manual evidence entry toward automated explorer ingestion, persistent public pages, and reviewer-oriented exports.

## Roadmap Overview

| Phase | Focus | Target Result |
|---|---|---|
| Phase 0 | Static MVP | Public demo, documentation, and manual project registry |
| Phase 1 | Explorer ingestion | Automated BaseScan and Arbiscan evidence checks |
| Phase 2 | Public proof pages | Shareable project pages with stable URLs |
| Phase 3 | Reviewer workflows | Markdown, JSON, and checklist exports for grant review |
| Phase 4 | Multi-ecosystem expansion | OP Stack and Solana evidence support |

## Phase 0: Static MVP

The static MVP includes the public dashboard, sample projects, local project registration, risk-signal tags, explorer links, milestone evidence, and JSON report export. This phase proves the core user experience without requiring backend infrastructure.

| Deliverable | Status |
|---|---|
| Static frontend | Complete |
| Base and Arbitrum chain options | Complete |
| Project registry form | Complete |
| Risk keyword detection | Complete |
| Explorer links | Complete |
| JSON export | Complete |
| Public documentation | Complete |

## Phase 1: Explorer Ingestion

The next phase should automate the evidence collection process. Builders should be able to enter a contract address and chain, then receive verification status, explorer links, transaction/activity information, and contract metadata automatically.

| Deliverable | Priority |
|---|---|
| BaseScan API integration | High |
| Arbiscan API integration | High |
| Source verification lookup | High |
| Transaction count and recent activity | Medium |
| Contract creation date | Medium |
| Basic ABI keyword scan | Medium |

## Phase 2: Public Proof Pages

The MVP currently stores data in the browser. A production workflow needs persistent public pages that builders can share in grant applications.

| Deliverable | Priority |
|---|---|
| Hosted project profile URLs | High |
| Project edit workflow | High |
| Public read-only pages | High |
| Evidence timestamping | Medium |
| Exportable reviewer packet | Medium |

## Phase 3: Reviewer Workflows

Grant reviewers need consistent summaries and archives. This phase should create outputs that are useful during application screening and follow-up diligence.

| Deliverable | Priority |
|---|---|
| Markdown report export | High |
| JSON evidence export improvements | High |
| Submission checklist generator | Medium |
| Reviewer notes field | Medium |
| Risk explanation copy | Medium |

## Phase 4: Multi-Ecosystem Expansion

Once Base and Arbitrum workflows are validated, GrantOps Sentinel can expand to OP Stack ecosystems, Solana program evidence, and additional grant programs.

| Deliverable | Priority |
|---|---|
| OP Stack chain templates | Medium |
| Solana program evidence fields | Medium |
| Multi-chain project grouping | Medium |
| Public API for proof pages | Low |

## Near-Term Build Priorities

The immediate engineering priority is to keep the tool simple, credible, and reviewer-friendly. The first production upgrade should add automated explorer verification and persistent share URLs. These two features would turn the MVP from a static demonstration into a practical grant application utility.

## Success Metrics

| Metric | Why It Matters |
|---|---|
| Number of registered projects | Shows builder adoption |
| Number of generated proof pages | Shows workflow utility |
| Number of exported reports | Shows reviewer or applicant usage |
| Verified source coverage | Measures evidence quality |
| Reviewer feedback | Measures whether the tool reduces review friction |
