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
├─ index.html
├─ styles.css
├─ app.js
├─ README.md
├─ LICENSE
├─ .gitignore
├─ .nojekyll
├─ vercel.json
├─ netlify.toml
├─ UPLOAD_THESE_FILES.md
├─ UPLOAD_THESE_FILES.zh-CN.md
└─ docs/
   ├─ base-proposal.md
   ├─ arbitrum-proposal.md
   ├─ roadmap.md
   ├─ form-answers.md
   ├─ demo-video-script.md
   ├─ build-log-posts.md
   └─ submission-checklist.md
```

## 每个文件是干什么的

- `index.html`：公开 demo 页面。
- `styles.css`：demo 样式。
- `app.js`：demo 交互逻辑和样例数据。
- `README.md`：GitHub 首页，Grant 评审会先看这个。
- `LICENSE`：MIT 开源协议。
- `.gitignore`：防止上传本地垃圾文件。
- `.nojekyll`：让 GitHub Pages 正常展示静态文件。
- `vercel.json`：Vercel 部署配置。
- `netlify.toml`：Netlify 部署配置。
- `docs/base-proposal.md`：Base 申请材料。
- `docs/arbitrum-proposal.md`：Arbitrum 申请材料。
- `docs/roadmap.md`：开发路线图。
- `docs/form-answers.md`：申请表常见字段答案。
- `docs/demo-video-script.md`：录屏逐字稿。
- `docs/build-log-posts.md`：X/Farcaster 可直接发的帖子。
- `docs/submission-checklist.md`：提交前检查表。

## 你现在具体怎么做

### 1. 在 GitHub 创建仓库

仓库名填：

```text
grantops-sentinel
```

Visibility 选：

```text
Public
```

不要勾选自动创建 README，因为我已经给你写好了。

### 2. 上传文件

进入新仓库后点：

```text
uploading an existing file
```

把本地 `grantops-sentinel/` 文件夹里的所有文件拖进去。

注意：拖进去的是文件夹里的内容，不是把父级整个工作区拖进去。

### 3. 部署 demo

最省事用 Vercel：

1. 打开 Vercel
2. Import Git Repository
3. 选择 `hidargmax27-cmyk/grantops-sentinel`
4. Framework Preset 选 `Other`
5. Build Command 留空
6. Output Directory 留空
7. Deploy

部署成功后你会得到一个 URL，例如：

```text
https://grantops-sentinel.vercel.app
```

这个 URL 就是 Grant 表单里的 Demo URL。

### 4. 更新两个地方

部署成功后，在 GitHub 里修改：

- `README.md` 里的 Live Demo
- `docs/base-proposal.md` 和 `docs/arbitrum-proposal.md` 里的 Demo 链接

把 `replace with deployed URL` 换成真实 demo URL。

### 5. 先发 3 条 build log

打开：

```text
docs/build-log-posts.md
```

把里面三条分别发到 X 和 Farcaster。

### 6. 再投 Grant

投递时优先顺序：

1. Arbitrum Open House / Buildathon
2. Base Builder Rewards / Builder Grants
3. OP Retro Funding / Atlas
4. Solana Foundation Grants

## 申请表复制哪里

如果表单问项目介绍，用：

```text
docs/form-answers.md
```

如果投 Base，用：

```text
docs/base-proposal.md
```

如果投 Arbitrum，用：

```text
docs/arbitrum-proposal.md
```

如果要录 demo，用：

```text
docs/demo-video-script.md
```

