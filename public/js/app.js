/**
 * Main Application Logic & Interactive Financial Simulator
 */

document.addEventListener("DOMContentLoaded", () => {
  initNavigation();
  renderFMAIStreams();
  renderFMAIEconomics();
  renderWatchSchematics();
  renderFMAICaseStudies();
  renderFMAIProjections();
  renderNeoGenServices();
  renderNeoGenProjections();
  renderBloomPackages();
  renderBloomProjections();
  renderConsolidatedTable();
  initSimulator();
});

// Tab Navigation System & Mobile Responsive Controls
function initNavigation() {
  const allTabs = document.querySelectorAll(".tab-btn");
  const drawerItems = document.querySelectorAll(".drawer-nav-item");
  const views = document.querySelectorAll(".view-section");
  const mobileToggle = document.getElementById("btn-mobile-menu");
  const mobileDrawer = document.getElementById("mobile-drawer");

  function switchTab(targetId) {
    if (!targetId) return;

    // Sync all tab buttons (desktop + mobile subnav)
    allTabs.forEach(t => {
      if (t.getAttribute("data-target") === targetId) {
        t.classList.add("active");
      } else {
        t.classList.remove("active");
      }
    });

    // Sync drawer items
    drawerItems.forEach(item => {
      if (item.getAttribute("data-target") === targetId) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    });

    // Switch view
    views.forEach(v => v.classList.remove("active"));
    const targetView = document.getElementById(targetId);
    if (targetView) {
      targetView.classList.add("active");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    // Auto-close drawer if open
    closeMobileDrawer();
  }

  // Bind tab buttons
  allTabs.forEach(tab => {
    tab.addEventListener("click", () => {
      const targetId = tab.getAttribute("data-target");
      switchTab(targetId);
    });
  });

  // Bind mobile drawer items
  drawerItems.forEach(item => {
    item.addEventListener("click", () => {
      const targetId = item.getAttribute("data-target");
      switchTab(targetId);
    });
  });

  // Mobile Hamburger Toggle
  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      const isOpen = mobileDrawer.classList.contains("open");
      if (isOpen) {
        closeMobileDrawer();
      } else {
        mobileDrawer.classList.add("open");
        mobileToggle.classList.add("active");
        mobileToggle.setAttribute("aria-expanded", "true");
      }
    });

    // Close when clicking outside
    document.addEventListener("click", (e) => {
      if (!mobileDrawer.contains(e.target) && !mobileToggle.contains(e.target)) {
        closeMobileDrawer();
      }
    });
  }

  // CPA Audit shortcut button in navbar
  const cpaBtn = document.getElementById("btn-nav-cpa");
  if (cpaBtn) {
    cpaBtn.addEventListener("click", () => {
      switchTab("view-cpa");
    });
  }

  // Brand logo click returns to overview
  const brandLogo = document.getElementById("brand-logo-trigger");
  if (brandLogo) {
    brandLogo.addEventListener("click", () => {
      switchTab("view-overview");
    });
  }
}

// Global helper to close drawer
function closeMobileDrawer() {
  const mobileDrawer = document.getElementById("mobile-drawer");
  const mobileToggle = document.getElementById("btn-mobile-menu");
  if (mobileDrawer) {
    mobileDrawer.classList.remove("open");
  }
  if (mobileToggle) {
    mobileToggle.classList.remove("active");
    mobileToggle.setAttribute("aria-expanded", "false");
  }
}
window.closeMobileDrawer = closeMobileDrawer;

// 1. Render FM AI Revenue Streams
function renderFMAIStreams() {
  const container = document.getElementById("fmai-streams-container");
  if (!container || !window.VENTURE_DATA) return;

  const streams = window.VENTURE_DATA.fmai.revenueStreams;
  container.innerHTML = streams.map(s => {
    let highlightClass = "";
    let featuredTag = "";

    if (s.id === "sub-pro") {
      highlightClass = "tier-card-pro";
      featuredTag = `<span class="tier-badge-flagship">★ FLAGSHIP AI TIER</span>`;
    } else if (s.id === "sub-ultra") {
      highlightClass = "tier-card-ultra";
      featuredTag = `<span class="tier-badge-ultra">💎 HIGH-TICKET VIP</span>`;
    } else if (s.id === "sub-basic") {
      highlightClass = "tier-card-basic";
      featuredTag = `<span class="tier-badge-basic">CORE STARTER</span>`;
    } else if (s.id === "enterprise") {
      highlightClass = "tier-card-enterprise";
      featuredTag = `<span class="tier-badge-enterprise">🏢 B2B GYM LICENSING</span>`;
    } else if (s.id === "ad-free") {
      highlightClass = "tier-card-adfree";
      featuredTag = `<span class="tier-badge-adfree">⚡ 85%+ NET MARGIN</span>`;
    }

    return `
      <div class="stream-card ${highlightClass}">
        <div>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.65rem; flex-wrap: wrap; gap: 0.35rem;">
            <span class="stream-cat-badge">${s.category}</span>
            ${featuredTag}
          </div>
          <h3 class="stream-title">${s.title}</h3>
          <div class="stream-pricing">${s.pricing}</div>
          <p class="stream-desc">${s.description}</p>
        </div>
        <div class="stream-metrics-box">
          <strong>Unit Dynamics:</strong> ${s.metrics}
        </div>
      </div>
    `;
  }).join("");
}

// 2. Render FM AI Unit Economics & LTV Matrix
function renderFMAIEconomics() {
  const tbody = document.getElementById("fmai-ltv-tbody");
  if (!tbody || !window.VENTURE_DATA) return;

  const economics = window.VENTURE_DATA.fmai.unitEconomics;
  tbody.innerHTML = economics.map(e => `
    <tr>
      <td><strong>${e.segment}</strong></td>
      <td class="mono">${e.cac}</td>
      <td class="mono">${e.monthlyRevenue}</td>
      <td class="mono">${e.lifespanMonths} mos</td>
      <td class="mono highlight-cell">${e.ltv}</td>
      <td class="mono text-positive"><strong>${e.ltvCacRatio}</strong></td>
      <td style="font-size: 0.8rem; color: #64748B;">${e.notes}</td>
    </tr>
  `).join("");
}

// 3. Render FM AI Watch Hardware Schematics (Coming Soon - Q2 2027 - No Pricing Outlined)
function renderWatchSchematics() {
  const container = document.getElementById("watch-schematics-content");
  if (!container || !window.VENTURE_DATA) return;

  const watch = window.VENTURE_DATA.fmai.watchHardware;
  const arch = watch.hardwareArchitecture;
  const milestones = watch.engineeringMilestones;

  container.innerHTML = `
    <div class="schematics-container">
      <!-- Hardware Diagram & Architecture -->
      <div class="schematic-diagram-card">
        <div>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; flex-wrap: wrap; gap: 0.5rem;">
            <span class="section-tag" style="background: rgba(245, 158, 11, 0.2); color: #FBBF24; border: 1px solid rgba(245, 158, 11, 0.4);">COMING SOON • Q2 2027</span>
            <span class="font-mono" style="font-size: 0.8rem; color: #94A3B8;">PRE-PRODUCTION • IN R&D</span>
          </div>
          <h3 style="color: white; font-size: 1.45rem; margin-bottom: 0.5rem;">${watch.productName}</h3>
          <p style="color: #94A3B8; font-size: 0.85rem; line-height: 1.5;">${watch.description}</p>
          
          <div class="schematic-blueprint">
            <div style="text-align: center; color: #38BDF8; font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; margin-bottom: 1rem; letter-spacing: 0.1em;">
              [ SYSTEM ARCHITECTURE & COMPONENT TOPOLOGY ]
            </div>
            <div class="schematic-hotspot-list">
              <div class="schematic-hotspot">
                <div class="hotspot-badge">1</div>
                <div class="hotspot-text">
                  <h4>${arch.sensorArray.name}</h4>
                  <p>${arch.sensorArray.spec}</p>
                </div>
              </div>
              <div class="schematic-hotspot">
                <div class="hotspot-badge">2</div>
                <div class="hotspot-text">
                  <h4>${arch.displayAndTouch.name}</h4>
                  <p>${arch.displayAndTouch.spec}</p>
                </div>
              </div>
              <div class="schematic-hotspot">
                <div class="hotspot-badge">3</div>
                <div class="hotspot-text">
                  <h4>${arch.mcuAndConnectivity.name}</h4>
                  <p>${arch.mcuAndConnectivity.spec}</p>
                </div>
              </div>
              <div class="schematic-hotspot">
                <div class="hotspot-badge">4</div>
                <div class="hotspot-text">
                  <h4>${arch.casingAndStrap.name}</h4>
                  <p>${arch.casingAndStrap.spec}</p>
                </div>
              </div>
              <div class="schematic-hotspot">
                <div class="hotspot-badge">5</div>
                <div class="hotspot-text">
                  <h4>${arch.batteryAndPower.name}</h4>
                  <p>${arch.batteryAndPower.spec}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div style="background: rgba(0, 0, 0, 0.5); padding: 1rem; border-radius: 8px; border: 1px solid rgba(255, 255, 255, 0.12); font-size: 0.78rem; color: #94A3B8; display: flex; flex-direction: column; gap: 0.35rem;">
          <div><strong style="color: #FBBF24;">Target Rollout:</strong> Q2 2027 In Active Development</div>
          <div><strong style="color: #38BDF8;">Companion Platform:</strong> FitMind AI Native iOS & Android Synchronization</div>
        </div>
      </div>

      <!-- Q2 2027 Engineering Roadmap & Milestone Validation -->
      <div style="background: #FFFFFF; border: 1px solid var(--border-color); border-radius: var(--radius-lg); padding: 2rem; box-shadow: var(--shadow-card); display: flex; flex-direction: column; justify-content: space-between;">
        <div>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.25rem; border-bottom: 1px solid var(--border-color); padding-bottom: 0.85rem; flex-wrap: wrap; gap: 0.5rem;">
            <div>
              <span class="section-tag" style="background: #EFF6FF; color: #2563EB;">Pre-Production Gates</span>
              <h3 style="font-size: 1.3rem; font-weight: 800; color: var(--text-main);">Hardware Development Roadmap</h3>
            </div>
            <span class="tab-pill" style="background: #FEF3C7; color: #B45309; border: 1px solid #FDE68A; font-weight: 800;">Q2 2027 PIPELINE</span>
          </div>

          <div style="display: flex; flex-direction: column; gap: 0.85rem; margin-bottom: 1.5rem;">
            ${milestones.map((m, idx) => `
              <div style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 10px; padding: 1rem 1.15rem; display: flex; justify-content: space-between; align-items: flex-start; gap: 1rem; flex-wrap: wrap;">
                <div>
                  <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.25rem;">
                    <span style="font-size: 0.7rem; font-weight: 800; background: #0052FF; color: white; width: 20px; height: 20px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center;">${idx + 1}</span>
                    <strong style="font-size: 0.9rem; color: var(--text-main);">${m.phase}</strong>
                  </div>
                  <p style="font-size: 0.8rem; color: #64748B; margin-left: 1.75rem;">${m.note}</p>
                </div>
                <div style="text-align: right; shrink: 0;">
                  <span style="font-size: 0.72rem; font-weight: 700; font-family: 'JetBrains Mono', monospace; background: ${m.status === 'Completed' ? '#ECFDF5' : (m.status === 'In Progress' ? '#EFF6FF' : '#FEF3C7')}; color: ${m.status === 'Completed' ? '#059669' : (m.status === 'In Progress' ? '#2563EB' : '#B45309')}; padding: 0.25rem 0.6rem; border-radius: 6px; border: 1px solid ${m.status === 'Completed' ? '#A7F3D0' : (m.status === 'In Progress' ? '#BFDBFE' : '#FDE68A')}; display: inline-block;">${m.timeframe} • ${m.status.toUpperCase()}</span>
                </div>
              </div>
            `).join("")}
          </div>
        </div>

        <div style="padding: 1.15rem; background: #FFFBEB; border-radius: 10px; font-size: 0.84rem; color: #92400E; border: 1px solid #FDE68A; border-left: 4px solid #F59E0B; line-height: 1.55;">
          <div style="font-weight: 800; display: flex; align-items: center; gap: 0.4rem; margin-bottom: 0.35rem; color: #B45309;">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            COMMERCIAL PRICING ANNOUNCEMENT
          </div>
          This section is currently in the works for a <strong>targeted Q2 2027 rollout</strong>. Commercial retail pricing, subscription bundle structures, and pre-order terms are being finalized with manufacturing partners and will be officially announced closer to launch in Q2 2027.
        </div>
      </div>
    </div>
  `;
}

// 3b. Render FM AI Verified Real-World Case Studies (Whoop & Ladder)
function renderFMAICaseStudies() {
  const container = document.getElementById("fmai-casestudies-container");
  if (!container || !window.VENTURE_DATA) return;

  const cases = window.VENTURE_DATA.fmai.caseStudies;
  if (!cases) return;

  container.innerHTML = cases.map(c => `
    <div class="case-study-card">
      <div class="case-study-header">
        <div>
          <span class="verified-pill">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
            VERIFIED PUBLIC DISCLOSURE / SEC & INVESTOR DATA
          </span>
          <h3 class="case-study-title">${c.name}</h3>
          <div class="case-study-tagline">${c.tagline} • <span style="color: #64748B;">${c.company}</span></div>
        </div>
        <div class="case-study-arr-badge">
          <div class="case-arr-label">VERIFIED ANNUAL REVENUE</div>
          <div class="case-arr-value">${c.verifiedARR}</div>
          <div class="case-arr-sub">${c.verifiedARRSub}</div>
        </div>
      </div>

      <div class="case-metrics-bar">
        <div class="case-metric-item">
          <div class="case-metric-label">CORE PRICING</div>
          <div class="case-metric-val">${c.id === 'ladder' ? '$29.99 / mo' : '$30.00 / mo'}</div>
          <div class="case-metric-sub">${c.id === 'ladder' ? 'Pro Tier ($179.99/yr)' : 'HaaS Annual Sub'}</div>
        </div>
        <div class="case-metric-item">
          <div class="case-metric-label">PAYING SUBSCRIBERS</div>
          <div class="case-metric-val">${c.subscribers.split(' ')[0]}</div>
          <div class="case-metric-sub">Active Paid Members</div>
        </div>
        <div class="case-metric-item">
          <div class="case-metric-label">BLENDED ARPU</div>
          <div class="case-metric-val">${c.blendedARPU.split('/')[0]}</div>
          <div class="case-metric-sub">Monthly / Active User</div>
        </div>
        <div class="case-metric-item">
          <div class="case-metric-label">${c.id === 'whoop' ? 'ANNUAL RETENTION' : '30-DAY RETENTION'}</div>
          <div class="case-metric-val text-positive">${c.retentionRate.split(' ')[0]}</div>
          <div class="case-metric-sub">${c.id === 'whoop' ? 'Year-over-Year Cohort' : '5.4% Trial Conversion'}</div>
        </div>
      </div>

      <div class="case-study-body">
        <div class="case-detail-block">
          <strong style="color: var(--text-main);">Subscription & Business Architecture:</strong> 
          <p style="margin-top: 0.25rem; font-size: 0.88rem; color: #475569;">${c.pricingModel}</p>
        </div>
        <div class="case-detail-block">
          <strong style="color: var(--text-main);">Verified Operational Dynamics:</strong> 
          <p style="margin-top: 0.25rem; font-size: 0.88rem; color: #475569;">${c.keyDynamics}</p>
        </div>
        <div class="case-takeaway-block">
          <div class="takeaway-badge">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
            DIRECT STRATEGIC VALIDATION FOR FITMIND AI
          </div>
          <p class="takeaway-text">${c.takeawayForFMAI}</p>
        </div>

        <!-- Attached Review & Audit Links -->
        ${c.links && c.links.length > 0 ? `
          <div class="case-links-section">
            <div class="case-links-label">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
              <span>Verified Review & Audit Links:</span>
            </div>
            <div class="case-links-group">
              ${c.links.map(l => `
                <a href="${l.url}" target="_blank" rel="noopener noreferrer" class="case-source-link">
                  <div style="display: flex; align-items: center; gap: 0.5rem;">
                    <span class="link-badge ${l.type === 'Review' ? 'link-badge-review' : l.type === 'Financial' ? 'link-badge-financial' : 'link-badge-official'}">${l.type || 'Source'}</span>
                    <span class="link-label"><strong>${l.label}</strong></span>
                  </div>
                  <div style="display: flex; align-items: center; gap: 0.5rem;">
                    <span class="link-note">${l.note}</span>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                  </div>
                </a>
              `).join("")}
            </div>
          </div>
        ` : ''}
      </div>
    </div>
  `).join("");
}

// 4. Render FM AI Financial Projections
function renderFMAIProjections() {
  const tbody = document.getElementById("fmai-projections-tbody");
  if (!tbody || !window.VENTURE_DATA) return;

  const proj = window.VENTURE_DATA.fmai.projections;
  tbody.innerHTML = proj.map(p => `
    <tr>
      <td><strong>${p.period}</strong></td>
      <td class="mono">${p.mau}</td>
      <td class="mono font-bold">$${p.revenue.toLocaleString()}</td>
      <td class="mono" style="color: #DC2626;">$${p.expenses.toLocaleString()}</td>
      <td class="mono highlight-cell">$${p.netProfit.toLocaleString()}</td>
      <td class="mono text-positive"><strong>${p.margin}</strong></td>
      <td style="font-size: 0.78rem; color: #64748B;">${p.note}</td>
    </tr>
  `).join("");
}

// 5. Render NeoGen Services & Paid Campaign Model
function renderNeoGenServices() {
  const container = document.getElementById("neogen-services-container");
  if (!container || !window.VENTURE_DATA) return;

  const services = window.VENTURE_DATA.neogen.services;
  container.innerHTML = services.map(s => `
    <div class="stream-card" style="border-top: 3px solid #2563EB;">
      <div>
        <span class="stream-cat-badge" style="background: #EFF6FF; color: #2563EB;">Agency Solution</span>
        <h3 class="stream-title">${s.name}</h3>
        <div class="stream-pricing" style="color: #2563EB;">${s.pricing}</div>
        <p class="stream-desc"><strong>Client Value:</strong> ${s.valueOffered}</p>
      </div>
      <div class="stream-metrics-box" style="border-left-color: #2563EB;">
        <strong>Deliverables:</strong> ${s.deliverables}
      </div>
    </div>
  `).join("");

  // Render Paid Campaign Funnel Cards
  const model = window.VENTURE_DATA.neogen.paidCampaignModel;
  const funnelContainer = document.getElementById("neogen-funnel-container");
  if (funnelContainer) {
    funnelContainer.innerHTML = `
      <div class="neogen-lead-grid">
        <div class="neogen-funnel-card">
          <div class="funnel-step-num">Step 1 • Targeted Ad Spend</div>
          <div class="funnel-metric" style="color: #2563EB;">$${model.monthlyAdSpend.toLocaleString()}</div>
          <p style="font-size: 0.8rem; color: #64748B;">Meta Ads, Google Search & LinkedIn targeting B2B agency & local service owners.</p>
        </div>
        <div class="neogen-funnel-card">
          <div class="funnel-step-num">Step 2 • Qualified Inquiries</div>
          <div class="funnel-metric">${model.leadsGenerated} Leads</div>
          <p style="font-size: 0.8rem; color: #64748B;">$${model.cpl.toFixed(2)} Cost Per Qualified Lead via interactive audit funnels.</p>
        </div>
        <div class="neogen-funnel-card">
          <div class="funnel-step-num">Step 3 • Discovery Calls</div>
          <div class="funnel-metric">${model.callsBooked} Calls</div>
          <p style="font-size: 0.8rem; color: #64748B;">${model.discoveryCallBookingRate} booking conversion rate via automated SMS & calendar.</p>
        </div>
        <div class="neogen-funnel-card">
          <div class="funnel-step-num">Step 4 • Closed Clients</div>
          <div class="funnel-metric" style="color: #10B981;">${model.newClientsClosed} Clients</div>
          <p style="font-size: 0.8rem; color: #64748B;">Blended CAC of $${model.cacPerClient.toFixed(2)} | Close rate of ${model.closeRate}.</p>
        </div>
      </div>

      <div style="margin-top: 1.5rem; background: #F8FAFC; border: 1px solid #E2E8F0; padding: 1.5rem; border-radius: 12px; display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1rem; text-align: center;">
        <div>
          <div style="font-size: 0.75rem; color: #64748B; text-transform: uppercase; font-weight: 700;">Immediate Month-1 Cash</div>
          <div class="mono" style="font-size: 1.5rem; font-weight: 800; color: #0F172A;">$${model.firstMonthCashCollected.toLocaleString()}</div>
          <div style="font-size: 0.75rem; color: #10B981; font-weight: 700;">${model.firstMonthROAS}</div>
        </div>
        <div>
          <div style="font-size: 0.75rem; color: #64748B; text-transform: uppercase; font-weight: 700;">Average Client LTV</div>
          <div class="mono" style="font-size: 1.5rem; font-weight: 800; color: #2563EB;">$${model.revenuePerClient.clientLTV.toLocaleString()}</div>
          <div style="font-size: 0.75rem; color: #64748B;">9 Month Avg Lifespan</div>
        </div>
        <div>
          <div style="font-size: 0.75rem; color: #64748B; text-transform: uppercase; font-weight: 700;">Cumulative LTV Pipeline</div>
          <div class="mono" style="font-size: 1.5rem; font-weight: 800; color: #10B981;">$${model.cumulativeClientLTVGenerated.toLocaleString()}</div>
          <div style="font-size: 0.75rem; color: #10B981; font-weight: 700;">${model.ltvROAS}</div>
        </div>
      </div>
    `;
  }
}

// 6. Render NeoGen Projections
function renderNeoGenProjections() {
  const tbody = document.getElementById("neogen-projections-tbody");
  if (!tbody || !window.VENTURE_DATA) return;

  const proj = window.VENTURE_DATA.neogen.projections;
  tbody.innerHTML = proj.map(p => `
    <tr>
      <td><strong>${p.period}</strong></td>
      <td class="mono">${p.newClients} new</td>
      <td class="mono">${p.activeRetainers} retainers</td>
      <td class="mono font-bold">$${p.grossRevenue.toLocaleString()}</td>
      <td class="mono" style="color: #DC2626;">$${(p.adSpend + p.deliveryAndTools).toLocaleString()}</td>
      <td class="mono highlight-cell">$${p.netProfit.toLocaleString()}</td>
      <td class="mono text-positive"><strong>${p.netMargin}</strong></td>
    </tr>
  `).join("");
}

// 7. Render BloomPress Packages & Verified Margins
function renderBloomPackages() {
  const container = document.getElementById("bloom-packages-container");
  if (!container || !window.VENTURE_DATA) return;

  const pkgs = window.VENTURE_DATA.bloom.packages;
  container.innerHTML = pkgs.map(p => `
    <div class="bloom-card ${p.id === 'signature-publishing' ? 'featured-package' : ''}">
      <div>
        <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 0.5rem;">
          <h3 class="bloom-card-title">${p.name}</h3>
        </div>
        <div class="bloom-price">$${p.pricing.toLocaleString()} <span style="font-size: 0.85rem; font-family: 'Plus Jakarta Sans', sans-serif; color: #64748B;">USD</span></div>
        <div class="bloom-milestone">${p.milestones} • <strong>${p.timeline}</strong></div>
        <p style="font-size: 0.88rem; color: #475569; line-height: 1.5; margin-bottom: 1rem;">${p.description}</p>
        
        <ul class="bloom-checklist">
          ${p.deliverables.map(d => `
            <li>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 6L9 17l-5-5"/></svg>
              <span>${d}</span>
            </li>
          `).join("")}
        </ul>
      </div>

      <div style="margin-top: 1.25rem; padding-top: 1rem; border-top: 1px solid var(--gold-border); font-size: 0.78rem; color: #64748B; display: flex; justify-content: space-between;">
        <span>Author Royalty: <strong>100% Retained</strong></span>
        <span>Distribution: <strong>40,000+ Outlets</strong></span>
      </div>
    </div>
  `).join("");
}

// 8. Render BloomPress Projections
function renderBloomProjections() {
  const tbody = document.getElementById("bloom-projections-tbody");
  if (!tbody || !window.VENTURE_DATA) return;

  const proj = window.VENTURE_DATA.bloom.projections;
  tbody.innerHTML = proj.map(p => `
    <tr>
      <td><strong>${p.period}</strong></td>
      <td class="mono">${p.authorCount} titles</td>
      <td class="mono font-bold">$${p.grossRevenue.toLocaleString()}</td>
      <td class="mono" style="color: #DC2626;">$${(p.directCOGS + p.marketingSpend + p.operatingExpenses).toLocaleString()}</td>
      <td class="mono highlight-cell" style="background: #FAF5EB; color: #9A7432;">$${p.netProfit.toLocaleString()}</td>
      <td class="mono" style="color: #162A20; font-weight: 700;"><strong>${p.netMargin}</strong></td>
    </tr>
  `).join("");
}

// 9. Render Consolidated Portfolio Financials
function renderConsolidatedTable() {
  const tbody = document.getElementById("consolidated-tbody");
  if (!tbody || !window.VENTURE_DATA) return;

  const data = window.VENTURE_DATA.consolidated.timeframes;
  tbody.innerHTML = data.map(d => `
    <tr>
      <td><strong>${d.period}</strong></td>
      <td class="mono">$${d.fmaiRevenue.toLocaleString()}</td>
      <td class="mono">$${d.neogenRevenue.toLocaleString()}</td>
      <td class="mono">$${d.bloomRevenue.toLocaleString()}</td>
      <td class="mono font-bold" style="color: var(--blue-primary);">$${d.totalRevenue.toLocaleString()}</td>
      <td class="mono" style="color: #DC2626;">$${d.totalExpenses.toLocaleString()}</td>
      <td class="mono highlight-cell">$${d.netProfit.toLocaleString()}</td>
      <td class="mono text-positive"><strong>${d.blendedMargin}</strong></td>
    </tr>
  `).join("");
}

// 10. Individual Platform Financial Simulation Engines
function initSimulator() {
  initEngineSwitcher();
  initFMAIEngine();
  initNeoGenEngine();
  initBloomEngine();

  // Export CSV Button
  const btnExportCSV = document.getElementById("btn-export-csv");
  if (btnExportCSV) {
    btnExportCSV.addEventListener("click", () => {
      exportFinancialCSV();
    });
  }

  // Print CPA Audit Sheet Button
  const btnPrint = document.getElementById("btn-print-audit");
  if (btnPrint) {
    btnPrint.addEventListener("click", () => {
      window.print();
    });
  }
}

// Platform Engine Selector Switcher
function initEngineSwitcher() {
  const engineBtns = document.querySelectorAll(".platform-sim-btn");
  const engineViews = document.querySelectorAll(".platform-sim-view");
  const wrapper = document.getElementById("overview-simulator-wrapper");

  engineBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const targetId = btn.getAttribute("data-engine");

      engineBtns.forEach(b => b.classList.remove("active"));
      engineViews.forEach(v => v.classList.remove("active"));

      btn.classList.add("active");
      const targetView = document.getElementById(targetId);
      if (targetView) targetView.classList.add("active");

      // Update container theme border
      if (wrapper) {
        wrapper.classList.remove("fmai-sim-theme", "neogen-sim-theme", "bloom-sim-theme");
        if (targetId === "engine-fmai") wrapper.classList.add("fmai-sim-theme");
        else if (targetId === "engine-neogen") wrapper.classList.add("neogen-sim-theme");
        else if (targetId === "engine-bloom") wrapper.classList.add("bloom-sim-theme");
      }
    });
  });
}

// 1. FitMind AI Mobile App Simulation Engine
function initFMAIEngine() {
  const mauSlider = document.getElementById("fmai-input-mau");
  const convSlider = document.getElementById("fmai-input-conv");
  const adsSlider = document.getElementById("fmai-input-ads");
  const enterpriseSlider = document.getElementById("fmai-input-enterprise");

  if (!mauSlider || !convSlider || !adsSlider) return;

  function updateFMAI() {
    const mau = parseInt(mauSlider.value, 10);
    const conv = parseFloat(convSlider.value) / 100;
    const adsPerDay = parseFloat(adsSlider.value);
    const enterpriseCount = enterpriseSlider ? parseInt(enterpriseSlider.value, 10) : 12;

    // Sliders display
    document.getElementById("fmai-disp-mau").textContent = mau.toLocaleString() + " MAU";
    document.getElementById("fmai-disp-conv").textContent = (conv * 100).toFixed(1) + "%";
    document.getElementById("fmai-disp-ads").textContent = adsPerDay.toFixed(1) + " Ads / day";
    if (enterpriseSlider && document.getElementById("fmai-disp-enterprise")) {
      document.getElementById("fmai-disp-enterprise").textContent = enterpriseCount + " Gym Partners";
    }

    // Unit calculations based on new $19.99 / $29.99 / $99.99 tiers
    const paidUsers = Math.round(mau * conv);
    const freeUsers = Math.max(0, mau - paidUsers);

    // Tier distribution among paid cohort:
    // Basic ($19.99): 46% | Pro ($29.99): 44% | Ultra ($99.99): 10%
    const basicUsers = Math.round(paidUsers * 0.46);
    const proUsers = Math.round(paidUsers * 0.44);
    const ultraUsers = Math.max(0, paidUsers - basicUsers - proUsers);
    const corePaidMrr = (basicUsers * 19.99) + (proUsers * 29.99) + (ultraUsers * 99.99);

    // Ad-Free Pass ($4.99): Captures 3.5% of free cohort
    const adFreeUsers = Math.round(freeUsers * 0.035);
    const adFreeMrr = adFreeUsers * 4.99;
    const adSupportedFreeUsers = Math.max(0, freeUsers - adFreeUsers);

    // Enterprise Gym B2B Accounts ($299/mo starter, $349 blended avg)
    const enterpriseMrr = enterpriseCount * 349.00;

    // Total recurring subscription MRR (Excludes watch hardware pending Q2 2027)
    const subMrr = corePaidMrr + adFreeMrr;

    // AdMob ad monetization ($14.50 blended eCPM on rewarded/interstitial)
    const admobMonthlyCash = adSupportedFreeUsers * adsPerDay * 30 * (14.50 / 1000);

    // Total App Gross Revenue
    const totalAppRev = subMrr + admobMonthlyCash + enterpriseMrr;

    // Mobile App Operating Costs (GAAP calibrated)
    const appStoreFees = (corePaidMrr + adFreeMrr) * 0.15; // Apple/Google 15% Small Business Program
    const cloudInfra = mau < 20000 ? 800 : (mau < 60000 ? 3500 : 11000);
    const aiTokens = paidUsers * 1.45; // Generative LLM & Vision meal scan API costs
    const userAcquisition = mau * 0.38; // Blended paid UA & influencer affiliate
    const supportAndOps = mau < 20000 ? 800 : (mau < 60000 ? 3200 : 8500);

    const totalAppCost = appStoreFees + cloudInfra + aiTokens + userAcquisition + supportAndOps;
    const netProfit = totalAppRev - totalAppCost;
    const margin = totalAppRev > 0 ? (netProfit / totalAppRev) * 100 : 0;

    // Update Output Cards in DOM
    document.getElementById("fmai-res-mrr").textContent = "$" + Math.round(subMrr).toLocaleString();
    document.getElementById("fmai-res-paid-count").textContent = (paidUsers + adFreeUsers).toLocaleString();
    document.getElementById("fmai-res-admob").textContent = "$" + Math.round(admobMonthlyCash).toLocaleString();
    document.getElementById("fmai-res-free-count").textContent = adSupportedFreeUsers.toLocaleString();
    if (document.getElementById("fmai-res-enterprise")) {
      document.getElementById("fmai-res-enterprise").textContent = "$" + Math.round(enterpriseMrr).toLocaleString();
    }
    if (document.getElementById("fmai-res-enterprise-count")) {
      document.getElementById("fmai-res-enterprise-count").textContent = enterpriseCount;
    }
    document.getElementById("fmai-res-net").textContent = "$" + Math.round(netProfit).toLocaleString();
    document.getElementById("fmai-res-margin").textContent = margin.toFixed(1) + "%";
  }

  const allSliders = [mauSlider, convSlider, adsSlider];
  if (enterpriseSlider) allSliders.push(enterpriseSlider);

  allSliders.forEach(slider => {
    slider.addEventListener("input", updateFMAI);
  });
  updateFMAI();
}

// 2. NeoGen Technologies Web Agency & Paid Campaigns Engine
function initNeoGenEngine() {
  const adspendSlider = document.getElementById("neogen-input-adspend");
  const cplSlider = document.getElementById("neogen-input-cpl");
  const closeSlider = document.getElementById("neogen-input-close");
  const retainerSlider = document.getElementById("neogen-input-retainer");

  if (!adspendSlider || !cplSlider || !closeSlider || !retainerSlider) return;

  function updateNeoGen() {
    const adspend = parseInt(adspendSlider.value, 10);
    const cpl = parseFloat(cplSlider.value);
    const closeRate = parseFloat(closeSlider.value) / 100;
    const avgRetainer = parseInt(retainerSlider.value, 10);

    // Displays
    document.getElementById("neogen-disp-adspend").textContent = "$" + adspend.toLocaleString() + " / mo";
    document.getElementById("neogen-disp-cpl").textContent = "$" + cpl.toFixed(2);
    document.getElementById("neogen-disp-close").textContent = (closeRate * 100).toFixed(1) + "%";
    document.getElementById("neogen-disp-retainer").textContent = "$" + avgRetainer.toLocaleString() + " / mo";

    // Funnel calculations
    const leads = Math.round(adspend / cpl);
    const calls = Math.round(leads * 0.28); // 28% call booking rate
    const newClients = Math.max(1, Math.round(calls * closeRate));
    const setupCash = newClients * 4800; // $4,800 avg upfront build
    const activeRetainers = Math.round(18 * (adspend / 6000));
    const retainerMrr = activeRetainers * avgRetainer;
    const totalRev = setupCash + retainerMrr;

    const roas = adspend > 0 ? (setupCash / adspend).toFixed(1) + "x" : "0.0x";
    const deliveryAndTools = (totalRev * 0.22) + 2500;
    const netProfit = totalRev - adspend - deliveryAndTools;

    // Update Output Cards
    document.getElementById("neogen-res-calls").textContent = calls + " Calls";
    document.getElementById("neogen-res-leads").textContent = leads.toLocaleString();
    document.getElementById("neogen-res-cash").textContent = "$" + setupCash.toLocaleString();
    document.getElementById("neogen-res-clients").textContent = newClients;
    document.getElementById("neogen-res-mrr").textContent = "$" + retainerMrr.toLocaleString();
    document.getElementById("neogen-res-roas").textContent = roas;
    document.getElementById("neogen-res-net").textContent = "$" + Math.round(netProfit).toLocaleString();
  }

  [adspendSlider, cplSlider, closeSlider, retainerSlider].forEach(slider => {
    slider.addEventListener("input", updateNeoGen);
  });
  updateNeoGen();
}

// 3. BloomPress Publishers Literary House Engine
function initBloomEngine() {
  const adspendSlider = document.getElementById("bloom-input-adspend");
  const cplSlider = document.getElementById("bloom-input-cpl");
  const closeSlider = document.getElementById("bloom-input-close");
  const aovSlider = document.getElementById("bloom-input-aov");

  if (!adspendSlider || !cplSlider || !closeSlider || !aovSlider) return;

  function updateBloom() {
    const adspend = parseInt(adspendSlider.value, 10);
    const cpl = parseFloat(cplSlider.value);
    const closeRate = parseFloat(closeSlider.value) / 100;
    const aov = parseInt(aovSlider.value, 10);

    // Displays
    document.getElementById("bloom-disp-adspend").textContent = "$" + adspend.toLocaleString() + " / mo";
    document.getElementById("bloom-disp-cpl").textContent = "$" + cpl.toFixed(2);
    document.getElementById("bloom-disp-close").textContent = (closeRate * 100).toFixed(1) + "%";
    document.getElementById("bloom-disp-aov").textContent = "$" + aov.toLocaleString();

    // Author acquisition funnel
    const submissions = Math.round(adspend / cpl);
    const consultations = Math.round(submissions * 0.22);
    const signedAuthors = Math.max(1, Math.round(consultations * closeRate));
    const grossRev = signedAuthors * aov;
    const directCogs = grossRev * 0.315; // CMOS editing, InDesign, Bowker ISBN
    const operatingExpenses = 4200;
    const netProfit = grossRev - directCogs - adspend - operatingExpenses;
    const margin = grossRev > 0 ? (netProfit / grossRev) * 100 : 0;
    const annualRunRate = grossRev * 12;

    // Update Output Cards
    document.getElementById("bloom-res-authors").textContent = signedAuthors + " Titles";
    document.getElementById("bloom-res-submissions").textContent = submissions.toLocaleString();
    document.getElementById("bloom-res-gross").textContent = "$" + Math.round(grossRev).toLocaleString();
    document.getElementById("bloom-res-annual").textContent = "$" + Math.round(annualRunRate).toLocaleString();
    document.getElementById("bloom-res-cogs").textContent = "$" + Math.round(directCogs).toLocaleString();
    document.getElementById("bloom-res-net").textContent = "$" + Math.round(netProfit).toLocaleString();
    document.getElementById("bloom-res-margin").textContent = margin.toFixed(1) + "%";
  }

  [adspendSlider, cplSlider, closeSlider, aovSlider].forEach(slider => {
    slider.addEventListener("input", updateBloom);
  });
  updateBloom();
}

// Generate & Download Verified Financial CSV
function exportFinancialCSV() {
  const data = window.VENTURE_DATA.consolidated.timeframes;
  let csv = "Period,FM AI Revenue,NeoGen Revenue,BloomPress Revenue,Total Portfolio Revenue,Total Operating Expenses,Consolidated Net Profit,Blended Profit Margin\n";

  data.forEach(d => {
    csv += `"${d.period}",${d.fmaiRevenue},${d.neogenRevenue},${d.bloomRevenue},${d.totalRevenue},${d.totalExpenses},${d.netProfit},"${d.blendedMargin}"\n`;
  });

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.setAttribute("href", url);
  a.setAttribute("download", "CPA_Consolidated_Financial_Model.csv");
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}
