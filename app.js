const STORAGE_KEY = "grantops-sentinel-projects-v2";

const chainConfig = {
  base: {
    label: "Base",
    group: "base",
    explorer: "https://basescan.org/address/",
    rpc: "https://mainnet.base.org",
  },
  arbitrum: {
    label: "Arbitrum",
    group: "arbitrum",
    explorer: "https://arbiscan.io/address/",
    rpc: "https://arb1.arbitrum.io/rpc",
  },
  "base-sepolia": {
    label: "Base Sepolia",
    group: "base",
    explorer: "https://sepolia.basescan.org/address/",
    rpc: "https://sepolia.base.org",
  },
  "arbitrum-sepolia": {
    label: "Arbitrum Sepolia",
    group: "arbitrum",
    explorer: "https://sepolia.arbiscan.io/address/",
    rpc: "https://sepolia-rollup.arbitrum.io/rpc",
  },
};

const selectors = {
  owner: "0x8da5cb5b",
  admin: "0xf851a440",
  implementation: "0x5c60da1b",
  paused: "0x5c975abb",
  getThreshold: "0xe75235b8",
  getOwners: "0xa0e67e2b",
};

const eip1967Slots = {
  implementation: "0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc",
  admin: "0xb53127684a568b3173ae13b9f8a6016e243e63b6e8ee1178d6a717850b5d6103",
  beacon: "0xa3f0ad74e5423aebfd80d3ef4346578335a9a72aeaee59ff6cb3582b35133d50",
};

const seedProjects = [
  {
    id: crypto.randomUUID(),
    name: "GrantOps Sentinel",
    chain: "arbitrum",
    address: "0x6c8a8d204770d76078161bc391213524fdb6c4e7",
    github: "https://github.com/hidargmax27-cmyk/grantops-sentinel",
    milestone: "Arbitrum Open House MVP",
    verified: true,
    proxy: false,
    functions: "owner, registerProof",
    weeklyCalls: 28,
    liveScan: null,
  },
  {
    id: crypto.randomUUID(),
    name: "Orbit Upgrade Watch",
    chain: "arbitrum",
    address: "0x912CE59144191C1204E64559FE8253a0e49E6548",
    github: "https://github.com/OffchainLabs",
    milestone: "Privilege scanner sample",
    verified: true,
    proxy: true,
    functions: "upgrade, admin, pause",
    weeklyCalls: 642,
    liveScan: null,
  },
  {
    id: crypto.randomUUID(),
    name: "Base Proof Monitor",
    chain: "base",
    address: "0x4200000000000000000000000000000000000006",
    github: "https://github.com/base",
    milestone: "Base proof-page sample",
    verified: true,
    proxy: false,
    functions: "deposit, withdraw",
    weeklyCalls: 1284,
    liveScan: null,
  },
];

let projects = loadProjects();
let selectedId = projects[0]?.id ?? null;
let activeFilter = "all";

const projectForm = document.querySelector("#projectForm");
const projectList = document.querySelector("#projectList");
const projectDetail = document.querySelector("#projectDetail");
const searchInput = document.querySelector("#searchInput");
const segments = document.querySelectorAll(".segment");

projectForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(projectForm);
  const project = {
    id: crypto.randomUUID(),
    name: clean(formData.get("name")),
    chain: clean(formData.get("chain")),
    address: clean(formData.get("address")),
    github: clean(formData.get("github")),
    milestone: clean(formData.get("milestone")) || "Not provided",
    functions: clean(formData.get("functions")),
    verified: document.querySelector("#verifiedInput").checked,
    proxy: document.querySelector("#proxyInput").checked,
    weeklyCalls: Math.floor(Math.random() * 1200) + 20,
    liveScan: null,
  };

  projects = [project, ...projects];
  selectedId = project.id;
  saveProjects();
  projectForm.reset();
  document.querySelector("#verifiedInput").checked = true;
  render();
});

searchInput.addEventListener("input", render);

segments.forEach((button) => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;
    segments.forEach((segment) => segment.classList.toggle("active", segment === button));
    render();
  });
});

document.querySelector("#focusFormButton").addEventListener("click", () => {
  document.querySelector("#nameInput").focus();
});

document.querySelector("#exportButton").addEventListener("click", exportReport);

function loadProjects() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return seedProjects;

  try {
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) && parsed.length ? parsed : seedProjects;
  } catch {
    return seedProjects;
  }
}

function saveProjects() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
}

function clean(value) {
  return String(value ?? "").trim();
}

function staticRiskSignals(project) {
  const raw = `${project.functions} ${project.proxy ? "proxy upgrade" : ""}`.toLowerCase();
  const signals = [];

  if (!project.verified) {
    signals.push({ level: "medium", label: "Source not verified" });
  }
  if (project.proxy) {
    signals.push({ level: "medium", label: "Declared proxy" });
  }
  if (/(upgrade|owner|admin)/.test(raw)) {
    signals.push({ level: "medium", label: "Declared admin surface" });
  }
  if (/(pause|blacklist|freeze)/.test(raw)) {
    signals.push({ level: "medium", label: "Declared pause/restrict control" });
  }
  if (/(mint|sweep|withdraw)/.test(raw)) {
    signals.push({ level: "high", label: "Declared fund/mint control" });
  }

  return signals.length ? signals : [{ level: "low", label: "No declared privileged surface" }];
}

function liveSignals(project) {
  const scan = project.liveScan;
  if (!scan) return [];

  const signals = [];
  if (scan.error) {
    signals.push({ level: "high", label: "Live scan failed" });
  }
  if (!scan.isContract) {
    signals.push({ level: "high", label: "No contract code found" });
  }
  if (scan.owner) {
    signals.push({ level: "medium", label: "Current owner detected" });
  }
  if (scan.proxyAdmin || scan.eip1967Admin) {
    signals.push({ level: "medium", label: "Current proxy admin detected" });
  }
  if (scan.implementation || scan.eip1967Implementation) {
    signals.push({ level: "medium", label: "Current implementation detected" });
  }
  if (scan.paused === true) {
    signals.push({ level: "high", label: "Contract currently paused" });
  }
  if (scan.safeThreshold) {
    signals.push({ level: "low", label: `Safe threshold ${scan.safeThreshold}` });
  }

  return signals;
}

function riskSignals(project) {
  const combined = [...liveSignals(project), ...staticRiskSignals(project)];
  return combined.length ? combined : [{ level: "low", label: "No obvious signal" }];
}

function riskLevel(project) {
  const levels = riskSignals(project).map((signal) => signal.level);
  if (levels.includes("high")) return "high";
  if (levels.includes("medium")) return "medium";
  return "low";
}

function filteredProjects() {
  const query = searchInput.value.toLowerCase().trim();
  return projects.filter((project) => {
    const chainGroup = chainConfig[project.chain]?.group ?? project.chain;
    const matchesFilter = activeFilter === "all" || chainGroup === activeFilter;
    const haystack = `${project.name} ${project.address} ${project.milestone}`.toLowerCase();
    return matchesFilter && (!query || haystack.includes(query));
  });
}

function render() {
  const visibleProjects = filteredProjects();
  renderMetrics();
  renderList(visibleProjects);
  renderDetail(projects.find((project) => project.id === selectedId) ?? visibleProjects[0]);
}

function renderMetrics() {
  const scanCount = projects.filter((project) => project.liveScan && !project.liveScan.pending).length;
  const alertCount = projects.reduce((sum, project) => {
    return sum + liveSignals(project).filter((signal) => signal.level !== "low").length;
  }, 0);
  const latestBlock = projects
    .map((project) => project.liveScan?.blockNumber)
    .filter(Boolean)
    .sort((a, b) => b - a)[0];

  document.querySelector("#totalProjects").textContent = projects.length;
  document.querySelector("#liveScans").textContent = scanCount;
  document.querySelector("#privilegeAlerts").textContent = alertCount;
  document.querySelector("#latestBlock").textContent = latestBlock ? latestBlock.toLocaleString("en-US") : "-";
  document.querySelector("#projectCount").textContent = projects.length;
}

function renderList(visibleProjects) {
  projectList.innerHTML = "";

  if (!visibleProjects.length) {
    projectList.innerHTML = '<div class="project-card">No matching projects</div>';
    return;
  }

  visibleProjects.forEach((project) => {
    const card = document.createElement("div");
    const scanLabel = project.liveScan?.pending
      ? "Scanning"
      : project.liveScan
        ? "Live scanned"
        : "Not scanned";
    card.className = `project-card ${project.id === selectedId ? "active" : ""}`;
    card.innerHTML = `
      <button type="button" data-id="${project.id}">
        <div class="card-head">
          <div>
            <p class="project-name">${escapeHtml(project.name)}</p>
            <div class="project-address">${shortAddress(project.address)}</div>
          </div>
          <span class="chain-pill">${chainConfig[project.chain]?.label ?? project.chain}</span>
        </div>
        <div class="card-meta">
          <span class="risk-pill ${riskLevel(project)}">${riskLabel(project)}</span>
          <span class="status-pill ${project.liveScan ? "" : "unverified"}">${scanLabel}</span>
        </div>
      </button>
    `;
    card.querySelector("button").addEventListener("click", () => {
      selectedId = project.id;
      render();
    });
    projectList.appendChild(card);
  });
}

function renderDetail(project) {
  if (!project) {
    projectDetail.innerHTML = `
      <div class="empty-state">
        <div class="empty-mark">GS</div>
        <h2>No projects yet</h2>
        <p>Add a project to generate a public summary that can be referenced in grant applications.</p>
      </div>
    `;
    return;
  }

  selectedId = project.id;
  const explorer = `${chainConfig[project.chain]?.explorer ?? "#"}${project.address}`;
  const signals = riskSignals(project)
    .map((signal) => `<span class="risk-pill ${signal.level}">${escapeHtml(signal.label)}</span>`)
    .join("");
  const scan = project.liveScan;

  projectDetail.innerHTML = `
    <div class="detail-head">
      <div>
        <h2 class="project-name">${escapeHtml(project.name)}</h2>
        <div class="project-address">${escapeHtml(project.address)}</div>
      </div>
      <span class="chain-pill">${chainConfig[project.chain]?.label ?? project.chain}</span>
    </div>

    <div class="scanner-bar">
      <div>
        <strong>Live Privileged Config</strong>
        <span>${scanStatusText(scan)}</span>
      </div>
      <button class="primary-button scan-button" id="scanButton" type="button">
        ${scan?.pending ? "Scanning..." : "Scan Live Config"}
      </button>
    </div>

    <div class="detail-grid">
      <section class="detail-section">
        <h3>Onchain Evidence</h3>
        <div class="kv">
          <div><span>Contract</span><a href="${explorer}" target="_blank" rel="noreferrer">Explorer</a></div>
          <div><span>Source</span><strong>${project.verified ? "Verified" : "Pending"}</strong></div>
          <div><span>Calls</span><strong>${Number(project.weeklyCalls || 0).toLocaleString("en-US")} / week</strong></div>
        </div>
      </section>

      <section class="detail-section">
        <h3>Current Authorization</h3>
        ${renderLiveConfig(scan)}
      </section>

      <section class="detail-section">
        <h3>Privilege Signals</h3>
        <div class="risk-list">${signals}</div>
      </section>

      <section class="detail-section">
        <h3>Milestone</h3>
        <p>${escapeHtml(project.milestone || "Not provided")}</p>
      </section>

      <section class="detail-section detail-wide">
        <h3>Grant Summary</h3>
        <p>${grantSummary(project)}</p>
      </section>
    </div>

    <div class="detail-section">
      <h3>Links</h3>
      <div class="link-row">
        <a href="${explorer}" target="_blank" rel="noreferrer">Explorer</a>
        ${project.github ? `<a href="${escapeAttribute(project.github)}" target="_blank" rel="noreferrer">GitHub</a>` : ""}
      </div>
    </div>
  `;

  document.querySelector("#scanButton").addEventListener("click", () => {
    scanProject(project.id);
  });
}

function renderLiveConfig(scan) {
  if (!scan) {
    return `<p>Not scanned yet.</p>`;
  }
  if (scan.pending) {
    return `<p>Reading current chain state...</p>`;
  }
  if (scan.error) {
    return `<p>${escapeHtml(scan.error)}</p>`;
  }

  return `
    <div class="kv live-kv">
      <div><span>Block</span><strong>${scan.blockNumber?.toLocaleString("en-US") ?? "Unknown"}</strong></div>
      <div><span>Code</span><strong>${scan.isContract ? "Contract found" : "No code found"}</strong></div>
      <div><span>owner()</span><strong>${formatValue(scan.owner)}</strong></div>
      <div><span>admin()</span><strong>${formatValue(scan.proxyAdmin)}</strong></div>
      <div><span>EIP-1967 admin</span><strong>${formatValue(scan.eip1967Admin)}</strong></div>
      <div><span>implementation()</span><strong>${formatValue(scan.implementation)}</strong></div>
      <div><span>EIP-1967 impl</span><strong>${formatValue(scan.eip1967Implementation)}</strong></div>
      <div><span>paused()</span><strong>${scan.paused === null ? "Not exposed" : String(scan.paused)}</strong></div>
      <div><span>Safe threshold</span><strong>${formatValue(scan.safeThreshold)}</strong></div>
      <div><span>Safe owners</span><strong>${scan.safeOwners?.length ? scan.safeOwners.map(shortAddress).join(", ") : "Not exposed"}</strong></div>
    </div>
  `;
}

async function scanProject(projectId) {
  const project = projects.find((item) => item.id === projectId);
  if (!project) return;

  if (!isAddress(project.address)) {
    project.liveScan = {
      pending: false,
      scannedAt: new Date().toISOString(),
      error: "Invalid contract address.",
    };
    saveProjects();
    render();
    return;
  }

  project.liveScan = {
    pending: true,
    scannedAt: new Date().toISOString(),
  };
  saveProjects();
  render();

  try {
    const scan = await readLiveConfig(project);
    project.liveScan = scan;
  } catch (error) {
    project.liveScan = {
      pending: false,
      scannedAt: new Date().toISOString(),
      error: error.message || "Unable to read live config.",
    };
  }

  saveProjects();
  render();
}

async function readLiveConfig(project) {
  const config = chainConfig[project.chain];
  if (!config?.rpc) {
    throw new Error("No RPC configured for this chain.");
  }

  const [blockHex, code, owner, proxyAdmin, implementation, paused, safeThreshold, safeOwners] =
    await Promise.all([
      rpc(config.rpc, "eth_blockNumber", []),
      rpc(config.rpc, "eth_getCode", [project.address, "latest"]),
      callAddress(config.rpc, project.address, selectors.owner),
      callAddress(config.rpc, project.address, selectors.admin),
      callAddress(config.rpc, project.address, selectors.implementation),
      callBool(config.rpc, project.address, selectors.paused),
      callUint(config.rpc, project.address, selectors.getThreshold),
      callAddressArray(config.rpc, project.address, selectors.getOwners),
    ]);

  const [implementationSlot, adminSlot, beaconSlot] = await Promise.all([
    rpc(config.rpc, "eth_getStorageAt", [project.address, eip1967Slots.implementation, "latest"]),
    rpc(config.rpc, "eth_getStorageAt", [project.address, eip1967Slots.admin, "latest"]),
    rpc(config.rpc, "eth_getStorageAt", [project.address, eip1967Slots.beacon, "latest"]),
  ]);

  return {
    pending: false,
    scannedAt: new Date().toISOString(),
    chain: project.chain,
    blockNumber: Number.parseInt(blockHex, 16),
    isContract: Boolean(code && code !== "0x"),
    owner,
    proxyAdmin,
    implementation,
    eip1967Admin: slotToAddress(adminSlot),
    eip1967Implementation: slotToAddress(implementationSlot),
    eip1967Beacon: slotToAddress(beaconSlot),
    paused,
    safeThreshold,
    safeOwners,
  };
}

async function rpc(rpcUrl, method, params) {
  const response = await fetch(rpcUrl, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: Date.now(),
      method,
      params,
    }),
  });

  if (!response.ok) {
    throw new Error(`RPC request failed: ${response.status}`);
  }

  const payload = await response.json();
  if (payload.error) {
    throw new Error(payload.error.message || "RPC error");
  }

  return payload.result;
}

async function ethCall(rpcUrl, to, data) {
  try {
    return await rpc(rpcUrl, "eth_call", [{ to, data }, "latest"]);
  } catch {
    return null;
  }
}

async function callAddress(rpcUrl, to, selector) {
  const result = await ethCall(rpcUrl, to, selector);
  if (!result || result === "0x" || result.length < 66) return null;
  return slotToAddress(result);
}

async function callBool(rpcUrl, to, selector) {
  const result = await ethCall(rpcUrl, to, selector);
  if (!result || result === "0x" || result.length < 66) return null;
  return BigInt(result) === 1n;
}

async function callUint(rpcUrl, to, selector) {
  const result = await ethCall(rpcUrl, to, selector);
  if (!result || result === "0x" || result.length < 66) return null;
  return BigInt(result).toString();
}

async function callAddressArray(rpcUrl, to, selector) {
  const result = await ethCall(rpcUrl, to, selector);
  if (!result || result === "0x" || result.length < 130) return [];

  const words = result.slice(2).match(/.{1,64}/g) ?? [];
  const lengthWord = words[1];
  if (!lengthWord) return [];

  const length = Number.parseInt(lengthWord, 16);
  if (!Number.isFinite(length) || length < 1 || length > 50) return [];

  return words
    .slice(2, 2 + length)
    .map((word) => slotToAddress(`0x${word}`))
    .filter(Boolean);
}

function slotToAddress(value) {
  if (!value || value === "0x") return null;
  const normalized = value.toLowerCase().replace(/^0x/, "").padStart(64, "0");
  const tail = normalized.slice(-40);
  if (/^0+$/.test(tail)) return null;
  return `0x${tail}`;
}

function scanStatusText(scan) {
  if (!scan) return "Reads current authorization from chain when scanned.";
  if (scan.pending) return "Reading latest block state.";
  if (scan.error) return "Scan needs attention.";
  return `Last scanned at block ${scan.blockNumber?.toLocaleString("en-US") ?? "unknown"}.`;
}

function grantSummary(project) {
  const scan = project.liveScan;
  const chain = chainConfig[project.chain]?.label ?? project.chain;
  const liveText = scan && !scan.error && !scan.pending
    ? ` Live config was read at block ${scan.blockNumber?.toLocaleString("en-US") ?? "unknown"}, with owner ${formatValue(scan.owner)} and implementation ${formatValue(scan.eip1967Implementation || scan.implementation)}.`
    : " Live privileged config has not been scanned yet.";

  return `${escapeHtml(project.name)} is registered on ${chain} with contract ${shortAddress(project.address)}. Current milestone: "${escapeHtml(project.milestone || "Not provided")}".${liveText}`;
}

function formatValue(value) {
  if (value === null || value === undefined || value === "") return "Not exposed";
  if (Array.isArray(value)) return value.length ? value.map(shortAddress).join(", ") : "Not exposed";
  return escapeHtml(String(value));
}

function isAddress(value) {
  return /^0x[a-fA-F0-9]{40}$/.test(String(value ?? ""));
}

function shortAddress(address) {
  if (!address || String(address).length < 12) return escapeHtml(address || "");
  const value = String(address);
  return `${value.slice(0, 6)}...${value.slice(-4)}`;
}

function riskLabel(project) {
  const level = riskLevel(project);
  if (level === "high") return "High risk signal";
  if (level === "medium") return "Medium risk signal";
  return "Low risk signal";
}

function exportReport() {
  const report = {
    generatedAt: new Date().toISOString(),
    projectCount: projects.length,
    projects: projects.map((project) => ({
      ...project,
      riskLevel: riskLevel(project),
      riskSignals: riskSignals(project),
      explorer: `${chainConfig[project.chain]?.explorer ?? ""}${project.address}`,
    })),
  };

  const blob = new Blob([JSON.stringify(report, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "grantops-sentinel-live-config-report.json";
  link.click();
  URL.revokeObjectURL(url);
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function escapeAttribute(value) {
  return escapeHtml(value).replaceAll("`", "&#096;");
}

render();
