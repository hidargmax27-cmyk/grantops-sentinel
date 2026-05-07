# Roadmap

## Phase 1: Live Config MVP

Timeline: immediate

- Project registry
- Base and Arbitrum chain selection
- contract address fields
- explorer links
- manual source verification status
- proxy and privileged function risk signals
- live RPC scan for current owner/admin/implementation state
- EIP-1967 implementation/admin/beacon slot reads
- pause status probing
- Safe threshold and owner probing when exposed
- public project proof page
- JSON report export

## Phase 2: Deeper Privilege Detection

Timeline: 2-3 weeks

- AccessControl role probing
- timelock delay detection
- proxy family detection
- multisig owner and threshold labeling
- config drift history by block

## Phase 3: Automated EVM Data

Timeline: 3-5 weeks

- BaseScan and Arbiscan API integration
- contract source verification detection
- deployment transaction lookup
- recent transaction count
- recent unique caller count
- simple project activity timeline

## Phase 4: Reviewer Workflow

Timeline: 4-6 weeks

- project comparison dashboard
- grant milestone evidence feed
- exportable reviewer summary
- public comments or reviewer notes
- user feedback collection

## Phase 5: Solana Support

Timeline: after EVM MVP validation

- Solana program address registry
- explorer links
- program upgrade authority signal
- token account and mint authority signals
- Solana project proof pages

## Phase 6: AI Reviewer Memo

Timeline: after enough structured data exists

- short project risk summary
- milestone evidence summary
- missing information checklist
- suggested follow-up questions for reviewers
