# Demo Video Script

Target length: 60-90 seconds.

## Script

Hi, I am Yutong Zhang, building Cognitive Bridge.

We are building GrantOps Sentinel, an open-source live privileged configuration scanner for Base and Arbitrum builders.

The problem is simple: early dApp teams often have scattered proof, and privileged configuration is invisible until it breaks. A deploy artifact may say one thing, but the contract may authorize a different owner, proxy admin, implementation, or pause state today.

GrantOps Sentinel gives each project a clean public proof page plus a live authorization scan.

In the demo, I can register a project, select Base or Arbitrum, add a contract address, link GitHub, add a milestone, and scan live privileged configuration.

The page then reads current chain state through public RPC: owner, proxy admin, implementation address, EIP-1967 proxy slots, pause status, and Safe threshold or owners where exposed.

This is not an audit certificate. It is a public risk signal and evidence layer that helps builders prove shipped work and helps reviewers know what to inspect next.

Our first milestone is Base and Arbitrum support. Next, we will add AccessControl roles, timelock detection, config drift history, and more indexed ecosystem examples.

We are applying for ecosystem support to keep this open-source, improve automated risk signals, and make proof pages useful for more builders.
