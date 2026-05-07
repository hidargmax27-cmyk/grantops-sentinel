# 就上传这些文件

你要上传的是整个 `grantops-sentinel` 文件夹里的内容。

不要把上一级目录里的中文工作草稿全部上传到公开 GitHub。那些是内部准备材料，不是给 Grant 评审看的正式仓库。

## GitHub 仓库应该长这样

仓库名：

```text
grantops-sentinel
```

仓库内容：

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

## 每个文件是干什么的

- `index.html`：公开 demo 页面。
- `styles.css`：demo 样式。
- `app.js`：实时特权配置扫描器和 proof page 逻辑。
- `README.md`：GitHub 首页，Grant 评审会先看这个。
- `LICENSE`：MIT 开源协议。
- `.gitignore`：防止上传本地垃圾文件。
- `.nojekyll`：让 GitHub Pages 正常展示静态文件。
- `vercel.json`：Vercel 部署配置。
- `netlify.toml`：Netlify 部署配置。
- `assets/grantops-sentinel-logo.png`：项目 logo。
- `contracts/GrantOpsProofRegistry.sol`：Arbitrum proof registry 合约。
- `contracts/GrantOpsLiveConfigRegistryV2.sol`：live privileged config scanner 的链上 V2 合约。
- `docs/base-proposal.md`：Base 申请材料。
- `docs/arbitrum-proposal.md`：Arbitrum 申请材料。
- `docs/arbitrum-contract-deploy.md`：Arbitrum 合约部署记录。
- `docs/roadmap.md`：开发路线图。
- `docs/live-privileged-config-scanner.md`：实时特权配置扫描器的技术范围。
- `docs/form-answers.md`：申请表常见字段答案。
- `docs/submission-copy-v2.md`：升级后的最新复制粘贴字段。
- `docs/demo-video-script.md`：录屏逐字稿。
- `docs/build-log-posts.md`：X/Farcaster 可直接发的帖子。
- `docs/submission-checklist.md`：提交前检查表。

## 当前公开链接

```text
GitHub:   https://github.com/hidargmax27-cmyk/grantops-sentinel
Demo:     https://grantops-sentinel.vercel.app/
X:        https://x.com/cognibridgeai
Contract: 0xb47349c83381f9C8EFeDB89354f89C2a699B9F05
```

## 这次升级重点

项目已经从静态 risk signal dashboard 升级为 live privileged config scanner。

新的 MVP 会读取当前链上状态：

- `owner()`
- `admin()`
- `implementation()`
- `paused()`
- EIP-1967 proxy slots
- Safe threshold / owners where exposed

评审要看的重点话术是：

```text
GrantOps Sentinel reads what the contract actually authorizes today, not what the deploy artifact said yesterday.
```

