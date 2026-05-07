# Upload These Files

Upload the entire `grantops-sentinel` folder to GitHub.

Do not upload the Chinese working notes from the parent folder unless you intentionally want them public.

## Exact GitHub Repository Structure

Your GitHub repository should look like this:

```text
grantops-sentinel/
|- index.html
|- styles.css
|- app.js
|- README.md
|- LICENSE
|- .gitignore
|- .nojekyll
|- vercel.json
|- netlify.toml
|- assets/
|  `- grantops-sentinel-logo.png
|- contracts/
|  `- GrantOpsProofRegistry.sol
|  `- GrantOpsLiveConfigRegistryV2.sol
`- docs/
   |- base-proposal.md
   |- arbitrum-proposal.md
   |- arbitrum-contract-deploy.md
   |- roadmap.md
   |- live-privileged-config-scanner.md
   |- form-answers.md
   |- submission-copy-v2.md
   |- demo-video-script.md
   |- build-log-posts.md
   `- submission-checklist.md
```

## What Each File Is For

- `index.html`: the public demo page.
- `styles.css`: demo styling.
- `app.js`: live privileged config scanner and proof-page logic.
- `README.md`: public GitHub landing page for reviewers.
- `LICENSE`: open-source license.
- `.gitignore`: prevents local junk files from being committed.
- `.nojekyll`: keeps GitHub Pages from running Jekyll processing.
- `vercel.json`: Vercel deployment config.
- `netlify.toml`: Netlify deployment config.
- `assets/grantops-sentinel-logo.png`: project logo.
- `contracts/GrantOpsProofRegistry.sol`: Arbitrum proof registry contract.
- `contracts/GrantOpsLiveConfigRegistryV2.sol`: V2 chain deployment contract for the live privileged config scanner.
- `docs/base-proposal.md`: copy/paste material for Base.
- `docs/arbitrum-proposal.md`: copy/paste material for Arbitrum.
- `docs/arbitrum-contract-deploy.md`: Arbitrum contract deployment notes.
- `docs/roadmap.md`: milestone roadmap.
- `docs/live-privileged-config-scanner.md`: technical product thesis and scanner scope.
- `docs/form-answers.md`: ready answers for common grant forms.
- `docs/submission-copy-v2.md`: latest copy/paste fields after the live scanner upgrade.
- `docs/demo-video-script.md`: recording script.
- `docs/build-log-posts.md`: posts for X/Farcaster.
- `docs/submission-checklist.md`: final checklist before submitting.

## Minimum Before Submitting Grants

You need these public links:

```text
GitHub:  https://github.com/hidargmax27-cmyk/grantops-sentinel
Demo:    https://grantops-sentinel.vercel.app/
X:       https://x.com/cognibridgeai
Contract: 0xb47349c83381f9C8EFeDB89354f89C2a699B9F05
```

The demo and grant materials now position the project as a live privileged configuration scanner.

