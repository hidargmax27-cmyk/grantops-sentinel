const STORAGE_KEY = "grantops-sentinel-projects";

const chainConfig = {
  base: {
    label: "Base",
    explorer: "https://basescan.org/address/",
  },
  arbitrum: {
    label: "Arbitrum",
    explorer: "https://arbiscan.io/address/",
  },
  "base-sepolia": {
    label: "Base Sepolia",
    explorer: "https://sepolia.basescan.org/address/",
  },
  "arbitrum-sepolia": {
    label: "Arbitrum Sepolia",
    explorer: "https://sepolia.arbiscan.io/address/",
  },
};

const seedProjects = [
  {
    id: crypto.randomUUID(),
    name: "Base Builder Proof",
    chain: "base",
    address: "0x4200000000000000000000000000000000000006",
    github: "https://github.com/base",
    milestone: "Mainnet proof page",
    verified: true,
    proxy: false,
    functions: "deposit, withdraw",
    weeklyCalls: 1284,
  },
  {
    id: crypto.randomUUID(),
    name: "Orbit Milestone Vault",
    chain: "arbitrum",
    address: "0x912CE59144191C1204E64559FE8253a0e49E6548",
    github: "https://github.com/OffchainLabs",
    milestone: "Grant escrow prototype",
    verified: true,
    proxy: true,
    functions: "upgrade, pause, claim",
    weeklyCalls: 642,
  },
  {
    id: crypto.randomUUID(),
    name: "Sepolia Risk Probe",
    chain: "base-sepolia",
    address: "0x0000000000000000000000000000000000000001",
    github: "",
    milestone: "Testnet scanner",
    verified: false,
    proxy: false,
    functions: "mint, blacklist, sweep",
    weeklyCalls: 89,
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

function riskSignals(project) {
  const raw = `${project.functions} ${project.proxy ? "proxy upgrade" : ""}`.toLowerCase();
  const signals = [];

  if (!project.verified) {
    signals.push({ level: "medium", label: "Source not verified" });
  }
  if (project.proxy) {
    signals.push({ level: "medium", label: "Upgradeable proxy" });
  }
  if (/(upgrade|owner|admin)/.test(raw)) {
    signals.push({ level: "medium", label: "Admin permission" });
  }
  if (/(pause|blacklist|freeze)/.test(raw)) {
    signals.push({ level: "medium", label: "Pause/restrict control" });
  }
  if (/(mint|sweep|withdraw)/.test(raw)) {
    signals.push({ level: "high", label: "Fund/mint control" });
  }

  return signals.length ? signals : [{ level: "low", label: "No obvious signal" }];
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
    const chainGroup = project.chain.includes("arbitrum") ? "arbitrum" : "base";
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
  const verifiedCount = projects.filter((project) => project.verified).length;
  const highRiskCount = projects.filter((project) => riskLevel(project) === "high").length;
  const calls = projects.reduce((sum, project) => sum + Number(project.weeklyCalls || 0), 0);

  document.querySelector("#totalProjects").textContent = projects.length;
  document.querySelector("#verifiedProjects").textContent = verifiedCount;
  document.querySelector("#highRiskProjects").textContent = highRiskCount;
  document.querySelector("#weeklyCalls").textContent = calls.toLocaleString("en-US");
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
          <span class="status-pill ${project.verified ? "" : "unverified"}">
            ${project.verified ? "Source verified" : "Pending verification"}
          </span>
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
    .map((signal) => `<span class="risk-pill ${signal.level}">${signal.label}</span>`)
    .join("");

  projectDetail.innerHTML = `
    <div class="detail-head">
      <div>
        <h2 class="project-name">${escapeHtml(project.name)}</h2>
        <div class="project-address">${escapeHtml(project.address)}</div>
      </div>
      <span class="chain-pill">${chainConfig[project.chain]?.label ?? project.chain}</span>
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
        <h3>Milestone</h3>
        <p>${escapeHtml(project.milestone || "Not provided")}</p>
      </section>

      <section class="detail-section">
        <h3>Risk Signals</h3>
        <div class="risk-list">${signals}</div>
      </section>

      <section class="detail-section">
        <h3>Grant Summary</h3>
        <p>${escapeHtml(project.name)} is registered on ${chainConfig[project.chain]?.label ?? project.chain} with contract ${shortAddress(project.address)}. Current milestone: "${escapeHtml(project.milestone || "Not provided")}". Recent activity: ${Number(project.weeklyCalls || 0).toLocaleString("en-US")} calls in the last week.</p>
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
}

function shortAddress(address) {
  if (!address || address.length < 12) return escapeHtml(address || "");
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
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
  link.download = "grantops-sentinel-report.json";
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
