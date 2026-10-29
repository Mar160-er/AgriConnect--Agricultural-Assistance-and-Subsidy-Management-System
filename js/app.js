// ── LOGIN ─────────────────────────────────────────────────
function handleLogin(e) {
  e.preventDefault();
  const user = document.getElementById('loginUser').value.trim();
  const pass = document.getElementById('loginPass').value;
  const err  = document.getElementById('loginError');
  if (user === 'admin' && pass === 'admin123') {
    document.getElementById('loginScreen').style.display = 'none';
    document.getElementById('appScreen').classList.remove('hidden');
    render();
  } else {
    err.classList.remove('hidden');
  }
}

'use strict';
/* =========================================================
   AgriConnect AASMS – Application Logic
   Agricultural Assistance & Subsidy Management System
   Bongabong Municipal Agriculture Office
   ========================================================= */

// ── SAMPLE DATA ──────────────────────────────────────────
const SEED = [
  {id:'AAS-2026-001',name:'Maria Santos',barangay:'Poblacion',program:'Fertilizer Subsidy',type:'In-Kind',date:'Oct 10, 2026',status:'Under Review',amount:5000,farmerId:'F-1001',contact:'09171234501',notes:'Fertilizer support for rice production. Documents submitted: barangay cert, RSA ID.'},
  {id:'AAS-2026-002',name:'Juan Dela Cruz',barangay:'Anilao',program:'Rice Seeds Assistance',type:'In-Kind',date:'Oct 09, 2026',status:'Approved',amount:3500,farmerId:'F-1002',contact:'09171234502',notes:'Certified rice seeds for wet season planting.'},
  {id:'AAS-2026-003',name:'Elena Reyes',barangay:'Lisap',program:'Farm Inputs Support',type:'In-Kind',date:'Oct 08, 2026',status:'Pending',amount:4200,farmerId:'F-1003',contact:'09171234503',notes:'Seeds and farm inputs for vegetable production.'},
  {id:'AAS-2026-004',name:'Roberto Mendoza',barangay:'Bantawon',program:'Small Farmer Assistance',type:'Cash',date:'Oct 07, 2026',status:'Verified',amount:6000,farmerId:'F-1004',contact:'09171234504',notes:'Small farmer support program beneficiary.'},
  {id:'AAS-2026-005',name:'Ana Villanueva',barangay:'Dayhagan',program:'Fertilizer Subsidy',type:'In-Kind',date:'Oct 06, 2026',status:'Distributed',amount:5000,farmerId:'F-1005',contact:'09171234505',notes:'Seasonal fertilizer subsidy – 2nd quarter.'},
  {id:'AAS-2026-006',name:'Pedro Ramos',barangay:'Camantigue',program:'Rice Seeds Assistance',type:'In-Kind',date:'Oct 05, 2026',status:'Rejected',amount:0,farmerId:'F-1006',contact:'09171234506',notes:'Rejected: incomplete supporting documents.'},
  {id:'AAS-2026-007',name:'Nelia Bautista',barangay:'Bagong Buhay',program:'High-Value Crops Assistance',type:'In-Kind',date:'Oct 04, 2026',status:'Approved',amount:7500,farmerId:'F-1007',contact:'09171234507',notes:'Support for banana and mango farming.'},
  {id:'AAS-2026-008',name:'Crisanto Flores',barangay:'Formon',program:'Farm Inputs Support',type:'In-Kind',date:'Oct 03, 2026',status:'Distributed',amount:4800,farmerId:'F-1008',contact:'09171234508',notes:'Pesticides and foliar fertilizer.'},
  {id:'AAS-2026-009',name:'Lourdes Castillo',barangay:'Hagan',program:'Fertilizer Subsidy',type:'In-Kind',date:'Oct 02, 2026',status:'Pending',amount:5000,farmerId:'F-1009',contact:'09171234509',notes:'Application under processing.'},
  {id:'AAS-2026-010',name:'Danilo Perez',barangay:'Malibo',program:'Small Farmer Assistance',type:'Cash',date:'Oct 01, 2026',status:'Distributed',amount:6000,farmerId:'F-1010',contact:'09171234510',notes:'Cash assistance released via barangay.'},
  {id:'AAS-2026-011',name:'Salvacion Cruz',barangay:'Morente',program:'Rice Seeds Assistance',type:'In-Kind',date:'Sep 30, 2026',status:'Approved',amount:3500,farmerId:'F-1011',contact:'09171234511',notes:'Awaiting release schedule.'},
  {id:'AAS-2026-012',name:'Bernardo Oca',barangay:'Pambisan Malaki',program:'High-Value Crops Assistance',type:'In-Kind',date:'Sep 29, 2026',status:'Verified',amount:8000,farmerId:'F-1012',contact:'09171234512',notes:'Cacao and banana planting support.'},
  {id:'AAS-2026-013',name:'Rosario Dimacali',barangay:'Pambisan Munti',program:'Fertilizer Subsidy',type:'In-Kind',date:'Sep 28, 2026',status:'Distributed',amount:5000,farmerId:'F-1013',contact:'09171234513',notes:'Completed. Reference: DIST-2026-013.'},
  {id:'AAS-2026-014',name:'Armando Torres',barangay:'Pawid',program:'Farm Inputs Support',type:'In-Kind',date:'Sep 27, 2026',status:'Under Review',amount:4200,farmerId:'F-1014',contact:'09171234514',notes:'Documents under verification.'},
  {id:'AAS-2026-015',name:'Gloria Manalo',barangay:'Poypoy',program:'Fertilizer Subsidy',type:'In-Kind',date:'Sep 26, 2026',status:'Pending',amount:5000,farmerId:'F-1015',contact:'09171234515',notes:'New application.'},
  {id:'AAS-2026-016',name:'Teofilo Guinto',barangay:'Tiguion',program:'Small Farmer Assistance',type:'Cash',date:'Sep 25, 2026',status:'Approved',amount:6000,farmerId:'F-1016',contact:'09171234516',notes:'Approved – awaiting distribution.'},
  {id:'AAS-2026-017',name:'Violeta Aquino',barangay:'Tubuan',program:'High-Value Crops Assistance',type:'In-Kind',date:'Sep 24, 2026',status:'Rejected',amount:0,farmerId:'F-1017',contact:'09171234517',notes:'Rejected: does not meet eligibility criteria.'},
  {id:'AAS-2026-018',name:'Ernesto Bondoc',barangay:'Usab',program:'Farm Inputs Support',type:'In-Kind',date:'Sep 23, 2026',status:'Distributed',amount:4200,farmerId:'F-1018',contact:'09171234518',notes:'Distributed successfully.'},
];

const PROGRAMS = ['Fertilizer Subsidy','Rice Seeds Assistance','Farm Inputs Support','Small Farmer Assistance','High-Value Crops Assistance','Equipment Support','Other Agricultural Assistance'];
const STATUSES = ['Pending','Under Review','Verified','Approved','Distributed','Rejected'];
const BARANGAYS = ['Anilao','Bagong Buhay','Bantawon','Banus','Buli','Camantigue','Campaasan','Dayhagan','Formon','Hagan','Labasan','Lisap','Malibo','Morente','Pambisan Malaki','Pambisan Munti','Pawid','Poblacion','Poypoy','Tiguion','Tubuan','Usab'];

// ── STATE ────────────────────────────────────────────────
let records = JSON.parse(localStorage.getItem('aasms_v2') || 'null') || SEED.map(x => ({...x}));
let currentPage = 'dashboard';
let chartInstances = {};

// ── UTILS ─────────────────────────────────────────────────
const money = n => '₱' + Number(n || 0).toLocaleString('en-PH');
const save = () => localStorage.setItem('aasms_v2', JSON.stringify(records));

function statusPill(s) {
  const map = {
    'Pending': 'pending', 'Under Review': 'review',
    'Verified': 'verified', 'Approved': 'approved',
    'Distributed': 'distributed', 'Rejected': 'rejected'
  };
  return `<span class="pill pill-${map[s] || 'pending'}">${s}</span>`;
}

function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.style.display = 'block';
  clearTimeout(window._toast);
  window._toast = setTimeout(() => { t.style.display = 'none'; }, 3000);
}

function destroyCharts() {
  Object.values(chartInstances).forEach(c => { try { c.destroy(); } catch(e) {} });
  chartInstances = {};
}

// ── NAVIGATION ────────────────────────────────────────────
function go(p) {
  currentPage = p;
  destroyCharts();
  document.querySelectorAll('.nav').forEach(b => b.classList.toggle('active', b.dataset.page === p));
  // close sidebar on mobile
  document.getElementById('sidebar').classList.remove('open');
  render();
}

function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('open');
}

document.querySelectorAll('.nav').forEach(b => b.addEventListener('click', () => go(b.dataset.page)));

// ── SVG ICONS ─────────────────────────────────────────────
const icons = {
  apps:   `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>`,
  user:   `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
  cash:   `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>`,
  chart:  `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>`,
  check:  `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
  clock:  `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
  plus:   `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>`,
  export: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>`,
  info:   `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`,
  trash:  `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/></svg>`,
};

// ── PAGE HEADER ───────────────────────────────────────────
function pageHeader(title, subtitle, actions = '') {
  return `<div class="page-head">
    <div class="page-head-text">
      <h2>${title}</h2>
      <p>${subtitle}</p>
    </div>
    <div class="page-head-actions">${actions}</div>
  </div>`;
}

// ── STAT CARD ────────────────────────────────────────────
function statCard(label, value, iconHtml, trend, trendClass, colorClass) {
  return `<div class="stat-card">
    <div class="stat-card-top">
      <span class="stat-label">${label}</span>
      <div class="stat-icon-wrap ${colorClass}">${iconHtml}</div>
    </div>
    <div class="stat-value">${value}</div>
    <div class="stat-trend ${trendClass}">${trend}</div>
  </div>`;
}

// ── TABLE ROWS ────────────────────────────────────────────
function buildRows(list) {
  if (!list.length) return `<tr><td colspan="7">
    <div class="empty-state">
      ${icons.apps}
      <p>No matching records found.</p>
    </div>
  </td></tr>`;
  return list.map(r => `<tr>
    <td><span class="fw-600" style="color:var(--emerald)">${r.id}</span></td>
    <td>
      <div class="farmer-name">${r.name}</div>
      <div class="farmer-barangay">${r.barangay}</div>
    </td>
    <td>${r.program}</td>
    <td>${r.date}</td>
    <td class="fw-600">${r.amount ? money(r.amount) : '—'}</td>
    <td>${statusPill(r.status)}</td>
    <td>
      <button class="btn btn-secondary btn-sm" onclick="viewRecord('${r.id}')">Manage</button>
    </td>
  </tr>`).join('');
}

function buildTable(list, title = 'Assistance Records') {
  return `<div class="panel" style="margin-bottom:0">
    <div class="table-toolbar">
      <span class="panel-title">${title}</span>
      <div style="flex:1"></div>
      <button class="btn btn-secondary btn-sm" onclick="exportCSV()">${icons.export} Export CSV</button>
    </div>
    <div class="table-scroll">
      <table>
        <thead><tr>
          <th>Application ID</th>
          <th>Farmer / Barangay</th>
          <th>Program</th>
          <th>Date Filed</th>
          <th>Amount</th>
          <th>Status</th>
          <th>Action</th>
        </tr></thead>
        <tbody>${buildRows(list)}</tbody>
      </table>
    </div>
  </div>`;
}

// ── DASHBOARD PAGE ────────────────────────────────────────
function pageDashboard() {
  const pending = records.filter(r => ['Pending','Under Review'].includes(r.status)).length;
  const verified = records.filter(r => ['Verified','Approved'].includes(r.status)).length;
  const distributed = records.filter(r => r.status === 'Distributed');
  const distTotal = distributed.reduce((s, r) => s + r.amount, 0);
  const total = records.length;

  const recentActivities = [...records].sort((a,b) => b.id.localeCompare(a.id)).slice(0,5);

  const activityDotColor = s => ({
    'Pending':'#E6B54B','Under Review':'#3B82F6','Verified':'#2A8E8E',
    'Approved':'#27845B','Distributed':'#18A45A','Rejected':'#D94F3D'
  }[s] || '#ccc');

  return `
  ${pageHeader('Assistance & Subsidy Dashboard', 'Agricultural assistance program overview for Bongabong MAO')}

  <div class="stats-grid">
    ${statCard('Total Applications', total, icons.apps, `${total} total records`, 'neutral', 'green')}
    ${statCard('Pending Evaluation', pending, icons.clock, 'Awaiting office review', 'neutral', 'gold')}
    ${statCard('Verified / Approved', verified, icons.check, 'Ready or awaiting release', 'up', 'teal')}
    ${statCard('Total Distributed', money(distTotal), icons.cash, `${distributed.length} completed releases`, 'up', 'green')}
  </div>

  <div class="grid-2 mb-20">
    <div class="panel">
      <div class="panel-header">
        <div>
          <div class="panel-title">Monthly Application Trend</div>
          <div class="panel-subtitle">Applications filed per month (2026)</div>
        </div>
      </div>
      <div class="panel-body">
        <div class="chart-wrap"><canvas id="lineChart"></canvas></div>
        <div class="chart-legend">
          <span><i class="legend-dot" style="background:#27845B"></i>Applications</span>
          <span><i class="legend-dot" style="background:#E6B54B"></i>Distributed Amount</span>
        </div>
      </div>
    </div>

    <div class="panel">
      <div class="panel-header">
        <div>
          <div class="panel-title">Applications by Status</div>
          <div class="panel-subtitle">Current distribution</div>
        </div>
      </div>
      <div class="panel-body">
        <div class="donut-section">
          <div class="donut-chart-wrap">
            <canvas id="donutChart"></canvas>
            <div class="donut-center">
              <span class="donut-center-val">${total}</span>
              <span class="donut-center-lbl">Total</span>
            </div>
          </div>
          <div class="donut-legend">
            ${STATUSES.map(s => {
              const c = records.filter(r => r.status === s).length;
              return `<div class="donut-legend-row">
                <span class="dl-label"><i class="legend-dot" style="background:${activityDotColor(s)}"></i>${s}</span>
                <span class="dl-val">${c}</span>
              </div>`;
            }).join('')}
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="grid-2">
    <div class="panel">
      <div class="panel-header">
        <div class="panel-title">Recent Assistance Requests</div>
        <button class="btn btn-secondary btn-sm" onclick="go('applications')">View All</button>
      </div>
      <div class="panel-body-flush">
        <div class="table-scroll">
          <table>
            <thead><tr>
              <th>ID</th><th>Farmer</th><th>Program</th><th>Status</th>
            </tr></thead>
            <tbody>${recentActivities.map(r => `<tr>
              <td><span style="color:var(--emerald);font-weight:600">${r.id}</span></td>
              <td><div class="farmer-name">${r.name}</div><div class="farmer-barangay">${r.barangay}</div></td>
              <td style="font-size:12px">${r.program}</td>
              <td>${statusPill(r.status)}</td>
            </tr>`).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div class="panel">
      <div class="panel-header">
        <div class="panel-title">Program Summary</div>
      </div>
      <div class="panel-body">
        <div class="chart-wrap" style="height:200px"><canvas id="barChart"></canvas></div>
      </div>
    </div>
  </div>`;
}

function initDashboardCharts() {
  // Line chart
  const lCtx = document.getElementById('lineChart');
  if (lCtx) {
    chartInstances.line = new Chart(lCtx, {
      type: 'line',
      data: {
        labels: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct'],
        datasets: [
          { label: 'Applications', data: [8,12,10,15,14,18,20,16,22,18],
            borderColor: '#27845B', backgroundColor: 'rgba(39,132,91,.1)',
            fill: true, tension: .4, pointRadius: 4, pointBackgroundColor: '#27845B' },
          { label: 'Distributed (₱ thousands)', data: [3,6,5,9,8,10,12,9,14,11],
            borderColor: '#E6B54B', backgroundColor: 'rgba(230,181,75,.08)',
            fill: true, tension: .4, pointRadius: 4, pointBackgroundColor: '#E6B54B' }
        ]
      },
      options: { responsive: true, maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: { y: { beginAtZero: true, grid: { color: '#E2EBE4' }, ticks: { font: { size: 11 } } },
                  x: { grid: { display: false }, ticks: { font: { size: 11 } } } }
      }
    });
  }

  // Donut chart
  const dCtx = document.getElementById('donutChart');
  if (dCtx) {
    const counts = STATUSES.map(s => records.filter(r => r.status === s).length);
    chartInstances.donut = new Chart(dCtx, {
      type: 'doughnut',
      data: {
        labels: STATUSES,
        datasets: [{ data: counts,
          backgroundColor: ['#E6B54B','#3B82F6','#2A8E8E','#27845B','#18A45A','#D94F3D'],
          borderWidth: 2, borderColor: '#fff' }]
      },
      options: { responsive: true, maintainAspectRatio: false, cutout: '68%',
        plugins: { legend: { display: false }, tooltip: { callbacks: {
          label: ctx => ` ${ctx.label}: ${ctx.parsed}`
        }}}
      }
    });
  }

  // Bar chart
  const bCtx = document.getElementById('barChart');
  if (bCtx) {
    const progNames = PROGRAMS.slice(0,5).map(p => p.replace(' Assistance','').replace(' Subsidy',''));
    const progCounts = PROGRAMS.slice(0,5).map(p => records.filter(r => r.program === p).length);
    chartInstances.bar = new Chart(bCtx, {
      type: 'bar',
      data: {
        labels: progNames,
        datasets: [{ label: 'Applications', data: progCounts,
          backgroundColor: ['#27845B','#E6B54B','#2A8E8E','#164A35','#3B82F6'],
          borderRadius: 6, borderSkipped: false }]
      },
      options: { responsive: true, maintainAspectRatio: false, indexAxis: 'y',
        plugins: { legend: { display: false } },
        scales: { x: { beginAtZero: true, grid: { color: '#E2EBE4' }, ticks: { font: { size: 11 } } },
                  y: { grid: { display: false }, ticks: { font: { size: 11 } } } }
      }
    });
  }
}

// ── APPLICATIONS PAGE ─────────────────────────────────────
function pageApplications() {
  const programOptions = PROGRAMS.map(p => `<option value="${p}">${p}</option>`).join('');
  const statusOptions = STATUSES.map(s => `<option value="${s}">${s}</option>`).join('');
  const barangayOptions = BARANGAYS.map(b => `<option value="${b}">${b}</option>`).join('');

  return `
  ${pageHeader('Assistance Applications',
    'Review, process, and manage farmer applications',
    `<button class="btn btn-secondary btn-sm" onclick="exportCSV()">${icons.export} Export CSV</button>
     <button class="btn btn-primary" onclick="showNewApplicationModal()">${icons.plus} New Application</button>`
  )}
  <div class="panel mb-20">
    <div class="table-toolbar">
      <input class="field search-field" id="appSearch" placeholder="Search name, ID, barangay..." oninput="filterApps()">
      <select class="field filter-select" id="appStatusFilter" onchange="filterApps()">
        <option value="">All Statuses</option>${statusOptions}
      </select>
      <select class="field filter-select" id="appProgramFilter" onchange="filterApps()">
        <option value="">All Programs</option>${programOptions}
      </select>
      <select class="field filter-select" id="appBarangayFilter" onchange="filterApps()">
        <option value="">All Barangays</option>${barangayOptions}
      </select>
    </div>
    <div id="appTableContainer">
      ${buildTableInner(records, `All Applications (${records.length})`)}
    </div>
  </div>`;
}

function buildTableInner(list, title) {
  return `<div>
    <div style="padding:12px 22px 10px;font-size:12.5px;color:var(--muted);border-bottom:1px solid var(--line)">
      ${icons.apps} &nbsp;<span style="font-weight:600;color:var(--deep)">${title}</span>
    </div>
    <div class="table-scroll">
      <table>
        <thead><tr>
          <th>Application ID</th><th>Farmer / Barangay</th><th>Program</th>
          <th>Date Filed</th><th>Amount</th><th>Status</th><th>Action</th>
        </tr></thead>
        <tbody>${buildRows(list)}</tbody>
      </table>
    </div>
  </div>`;
}

function filterApps() {
  const q = (document.getElementById('appSearch')?.value || '').toLowerCase();
  const s = document.getElementById('appStatusFilter')?.value || '';
  const p = document.getElementById('appProgramFilter')?.value || '';
  const b = document.getElementById('appBarangayFilter')?.value || '';
  const list = records.filter(r =>
    `${r.id} ${r.name} ${r.barangay} ${r.farmerId}`.toLowerCase().includes(q) &&
    (!s || r.status === s) && (!p || r.program === p) && (!b || r.barangay === b)
  );
  const el = document.getElementById('appTableContainer');
  if (el) el.innerHTML = buildTableInner(list, `Applications (${list.length} shown)`);
}

// ── BENEFICIARIES PAGE ────────────────────────────────────
function pageBeneficiaries() {
  const statusOptions = STATUSES.map(s => `<option value="${s}">${s}</option>`).join('');
  return `
  ${pageHeader('Beneficiary Verification',
    'Verify farmer identity and eligibility before approval',
    `<button class="btn btn-secondary btn-sm" onclick="exportCSV()">${icons.export} Export</button>`
  )}
  <div class="notice notice-info mb-20">
    ${icons.info}
    <span>Verify farmer identity, barangay records, and supporting documents before marking an application as <strong>Verified</strong> or <strong>Approved</strong>. Only MAO-cleared beneficiaries should proceed to distribution.</span>
  </div>
  <div class="panel">
    <div class="table-toolbar">
      <input class="field search-field" id="benSearch" placeholder="Search beneficiary name or ID..." oninput="filterBen()">
      <select class="field filter-select" id="benStatusFilter" onchange="filterBen()">
        <option value="">All Statuses</option>${statusOptions}
      </select>
    </div>
    <div id="benTableContainer">
      ${buildBeneficiaryTable(records)}
    </div>
  </div>`;
}

function buildBeneficiaryTable(list) {
  if (!list.length) return `<div class="empty-state"><p>No records found.</p></div>`;
  return `<div class="table-scroll"><table>
    <thead><tr>
      <th>App ID</th><th>Farmer</th><th>Farmer ID</th><th>Barangay</th>
      <th>Program</th><th>Status</th><th>Action</th>
    </tr></thead>
    <tbody>${list.map(r => `<tr>
      <td><span class="fw-600" style="color:var(--emerald)">${r.id}</span></td>
      <td><div class="farmer-name">${r.name}</div></td>
      <td style="font-size:12px;color:var(--muted)">${r.farmerId}</td>
      <td>${r.barangay}</td>
      <td style="font-size:12px">${r.program}</td>
      <td>${statusPill(r.status)}</td>
      <td><button class="btn btn-secondary btn-sm" onclick="viewRecord('${r.id}')">Verify / Manage</button></td>
    </tr>`).join('')}</tbody>
  </table></div>`;
}

function filterBen() {
  const q = (document.getElementById('benSearch')?.value || '').toLowerCase();
  const s = document.getElementById('benStatusFilter')?.value || '';
  const list = records.filter(r =>
    `${r.id} ${r.name} ${r.barangay} ${r.farmerId}`.toLowerCase().includes(q) &&
    (!s || r.status === s)
  );
  const el = document.getElementById('benTableContainer');
  if (el) el.innerHTML = buildBeneficiaryTable(list);
}

// ── DISTRIBUTION PAGE ──────────────────────────────────────
function pageDistribution() {
  const approved = records.filter(r => r.status === 'Approved').length;
  const distCount = records.filter(r => r.status === 'Distributed').length;
  const distTotal = records.filter(r => r.status === 'Distributed').reduce((s,r) => s + r.amount, 0);
  const pending = records.filter(r => ['Pending','Under Review'].includes(r.status)).length;
  const distList = records.filter(r => ['Approved','Distributed'].includes(r.status));

  return `
  ${pageHeader('Subsidy Distribution',
    'Track approved assistance and record subsidy distribution',
    `<button class="btn btn-primary" onclick="showToast('Open an Approved application and change its status to Distributed to record a release.')">${icons.cash} Record Distribution</button>`
  )}
  <div class="stats-grid mb-20">
    ${statCard('Approved for Distribution', approved, icons.check, 'Ready for release', 'up', 'green')}
    ${statCard('Distributed', distCount, icons.cash, 'Completed releases', 'up', 'teal')}
    ${statCard('Total Distributed Value', money(distTotal), icons.chart, 'Based on recorded amounts', 'up', 'gold')}
    ${statCard('Pending Review', pending, icons.clock, 'Not yet approved', 'neutral', 'gold')}
  </div>
  <div class="notice notice-warn mb-20">
    ${icons.info}
    <span>Only <strong>Approved</strong> applications can be marked as <strong>Distributed</strong>. Use the Manage button to record the release date and confirm distribution. Keep reference numbers for audit.</span>
  </div>
  <div class="panel mb-20">
    <div class="panel-header" style="padding-bottom:0">
      <div class="panel-title">Distribution Chart</div>
    </div>
    <div class="panel-body">
      <div class="chart-wrap"><canvas id="distChart"></canvas></div>
    </div>
  </div>
  ${buildTable(distList, `Approved & Distributed Assistance (${distList.length})`)}`;
}

function initDistChart() {
  const ctx = document.getElementById('distChart');
  if (!ctx) return;
  const progs = PROGRAMS.slice(0,5);
  const distAmounts = progs.map(p =>
    records.filter(r => r.program === p && r.status === 'Distributed').reduce((s,r) => s + r.amount, 0) / 1000
  );
  const approvedAmounts = progs.map(p =>
    records.filter(r => r.program === p && r.status === 'Approved').reduce((s,r) => s + r.amount, 0) / 1000
  );
  const labels = progs.map(p => p.replace(' Assistance','').replace(' Subsidy',''));
  chartInstances.dist = new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [
        { label: 'Distributed (₱k)', data: distAmounts, backgroundColor: '#27845B', borderRadius: 6 },
        { label: 'Approved (₱k)', data: approvedAmounts, backgroundColor: '#E6B54B', borderRadius: 6 }
      ]
    },
    options: { responsive: true, maintainAspectRatio: false,
      plugins: { legend: { position: 'top', labels: { font: { size: 11 } } } },
      scales: { x: { grid: { display: false } }, y: { beginAtZero: true, grid: { color: '#E2EBE4' },
        ticks: { callback: v => '₱' + v + 'k', font: { size: 11 } } } }
    }
  });
}

// ── REPORTS PAGE ───────────────────────────────────────────
function pageReports() {
  const totalAmt = records.reduce((s,r) => s + r.amount, 0);
  const distAmt  = records.filter(r => r.status==='Distributed').reduce((s,r) => s + r.amount, 0);
  const appRate  = records.length ? Math.round(records.filter(r => ['Approved','Distributed'].includes(r.status)).length / records.length * 100) : 0;
  const progCount = new Set(records.map(r => r.program)).size;

  const progBarColors = ['#27845B','#E6B54B','#2A8E8E','#3B82F6','#164A35'];
  const maxCount = Math.max(...PROGRAMS.map(p => records.filter(r => r.program === p).length), 1);

  return `
  ${pageHeader('Programs & Reports',
    'Monitor assistance programs and generate summary reports',
    `<button class="btn btn-secondary btn-sm" onclick="exportCSV()">${icons.export} Export Report</button>`
  )}

  <div class="program-grid mb-20">
    ${PROGRAMS.slice(0,5).map((prog, i) => {
      const cnt = records.filter(r => r.program === prog).length;
      const distCnt = records.filter(r => r.program === prog && r.status === 'Distributed').length;
      const amtTotal = records.filter(r => r.program === prog).reduce((s,r) => s + r.amount, 0);
      const pct = Math.round(cnt / maxCount * 100);
      return `<div class="program-card">
        <div class="program-card-icon" style="background:${progBarColors[i]}22">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="${progBarColors[i]}" stroke-width="2" stroke-linecap="round"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2z"/><path d="M12 6v6l4 2"/></svg>
        </div>
        <h3>${prog}</h3>
        <p>Agricultural assistance program under Bongabong MAO.</p>
        <div class="program-card-stats">
          <div class="program-stat">
            <span class="program-stat-val">${cnt}</span>
            <span class="program-stat-lbl">Applications</span>
          </div>
          <div class="program-stat">
            <span class="program-stat-val">${distCnt}</span>
            <span class="program-stat-lbl">Distributed</span>
          </div>
          <div class="program-stat">
            <span class="program-stat-val" style="font-size:14px">${money(amtTotal)}</span>
            <span class="program-stat-lbl">Total Amount</span>
          </div>
        </div>
        <div class="program-bar"><div class="program-bar-fill" style="width:${pct}%;background:${progBarColors[i]}"></div></div>
      </div>`;
    }).join('')}
  </div>

  <div class="stats-grid mb-20">
    ${statCard('Total Assistance Value', money(totalAmt), icons.cash, 'All application amounts combined', 'neutral', 'gold')}
    ${statCard('Distributed Value', money(distAmt), icons.check, 'Completed distributions', 'up', 'green')}
    ${statCard('Approval Rate', appRate + '%', icons.chart, 'Approved or distributed', 'up', 'teal')}
    ${statCard('Active Programs', progCount, icons.apps, 'Programs in current records', 'neutral', 'green')}
  </div>

  <div class="panel mb-20">
    <div class="panel-header">
      <div class="panel-title">Barangay Distribution Report</div>
      <div class="panel-subtitle">Applications per barangay</div>
    </div>
    <div class="panel-body">
      <div class="chart-wrap"><canvas id="barangayChart"></canvas></div>
    </div>
  </div>

  ${buildTable(records, `Full Report Data (${records.length} records)`)}`;
}

function initReportsCharts() {
  const ctx = document.getElementById('barangayChart');
  if (!ctx) return;
  const barDict = {};
  records.forEach(r => { barDict[r.barangay] = (barDict[r.barangay] || 0) + 1; });
  const sorted = Object.entries(barDict).sort((a,b) => b[1]-a[1]).slice(0,10);
  chartInstances.bar = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: sorted.map(x => x[0]),
      datasets: [{ label: 'Applications', data: sorted.map(x => x[1]),
        backgroundColor: '#27845B', borderRadius: 6 }]
    },
    options: { responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: { y: { beginAtZero: true, grid: { color: '#E2EBE4' }, ticks: { font: { size: 11 } } },
                x: { grid: { display: false }, ticks: { font: { size: 11 } } } }
    }
  });
}

// ── SETTINGS PAGE ─────────────────────────────────────────
function pageSettings() {
  return `
  ${pageHeader('System Settings', 'Manage office profile and prototype preferences')}
  <div class="grid-2">
    <div>
      <div class="panel mb-20">
        <div class="panel-header"><div class="panel-title">Office Profile</div></div>
        <div class="panel-body">
          <div class="form-grid-2">
            <div class="form-group"><label class="form-label">System Name</label>
              <input class="form-input" value="AgriConnect AASMS"></div>
            <div class="form-group"><label class="form-label">Office</label>
              <input class="form-input" value="Municipal Agriculture Office"></div>
            <div class="form-group"><label class="form-label">Municipality</label>
              <input class="form-input" value="Bongabong, Oriental Mindoro"></div>
            <div class="form-group"><label class="form-label">Province</label>
              <input class="form-input" value="Oriental Mindoro"></div>
            <div class="form-group"><label class="form-label">Fiscal Year</label>
              <input class="form-input" value="2026"></div>
            <div class="form-group"><label class="form-label">Admin Display Name</label>
              <input class="form-input" id="adminName" value="Admin"></div>
          </div>
          <div class="form-actions"><button class="btn btn-primary" onclick="showToast('Settings saved for this session.')">Save Settings</button></div>
        </div>
      </div>

      <div class="panel">
        <div class="panel-header"><div class="panel-title">Assistance Program Configuration</div></div>
        <div class="panel-body">
          <div class="notice notice-info mb-16">${icons.info} <span>Programs below are pre-configured for this prototype. In a live system, these can be managed via an admin interface.</span></div>
          <div style="display:flex;flex-direction:column;gap:10px">
            ${PROGRAMS.map((p,i) => `<div style="display:flex;align-items:center;justify-content:space-between;padding:10px 14px;background:var(--ivory);border-radius:var(--radius);font-size:13px">
              <span class="fw-600">${p}</span>
              <span class="pill pill-approved">Active</span>
            </div>`).join('')}
          </div>
        </div>
      </div>
    </div>

    <div>
      <div class="panel mb-20">
        <div class="panel-header"><div class="panel-title">Data Management</div></div>
        <div class="panel-body">
          <p class="text-muted mb-16">This frontend prototype stores records in browser localStorage. For production use, connect a secure backend with authentication, role-based access, and an audit trail.</p>
          <div style="display:flex;flex-direction:column;gap:10px">
            <button class="btn btn-secondary" style="justify-content:flex-start" onclick="exportCSV()">${icons.export} Export all records to CSV</button>
            <button class="btn btn-danger" style="justify-content:flex-start" onclick="if(confirm('Restore sample data? Your current records will be replaced.')){records=SEED.map(x=>({...x}));save();go('dashboard');showToast('Sample data restored.')}">${icons.trash} Restore sample data</button>
          </div>
        </div>
      </div>

      <div class="panel">
        <div class="panel-header"><div class="panel-title">System Information</div></div>
        <div class="panel-body">
          <div style="display:flex;flex-direction:column;gap:12px">
            ${[['System','AgriConnect AASMS v2.0'],['Module','Agricultural Assistance & Subsidy Management'],['Type','Frontend Prototype'],['Storage','Browser localStorage'],['Records',''+records.length+' total applications']].map(([k,v]) => `
            <div style="display:flex;justify-content:space-between;font-size:13px;padding:9px 0;border-bottom:1px solid var(--line)">
              <span class="text-muted">${k}</span><span class="fw-600">${v}</span>
            </div>`).join('')}
          </div>
        </div>
      </div>
    </div>
  </div>`;
}

// ── VIEW / EDIT RECORD ────────────────────────────────────
function viewRecord(id) {
  const r = records.find(x => x.id === id);
  if (!r) return;

  const statusOpts = STATUSES.map(s => `<option value="${s}" ${r.status===s?'selected':''}>${s}</option>`).join('');
  const progOpts = PROGRAMS.map(p => `<option value="${p}" ${r.program===p?'selected':''}>${p}</option>`).join('');
  const barOpts = BARANGAYS.map(b => `<option value="${b}" ${r.barangay===b?'selected':''}>${b}</option>`).join('');

  const timelineItems = [
    { dot: '#E6B54B', bg: '#FFF4D6', label: 'Application Filed', time: r.date },
    { dot: '#3B82F6', bg: '#E8F0FE', label: 'Under Review by MAO', time: r.date },
    ...(r.status === 'Verified' || r.status === 'Approved' || r.status === 'Distributed'
      ? [{ dot: '#2A8E8E', bg: '#E0F4F4', label: 'Beneficiary Verified', time: 'Recent' }] : []),
    ...(r.status === 'Approved' || r.status === 'Distributed'
      ? [{ dot: '#27845B', bg: 'var(--mint)', label: 'Application Approved', time: 'Recent' }] : []),
    ...(r.status === 'Distributed'
      ? [{ dot: '#18A45A', bg: '#EAFAF0', label: 'Subsidy Distributed', time: 'Recent' }] : []),
    ...(r.status === 'Rejected'
      ? [{ dot: '#D94F3D', bg: 'var(--red-bg)', label: 'Application Rejected', time: 'Recent' }] : []),
  ];

  document.getElementById('main').innerHTML = `
  <div class="page-head">
    <div class="page-head-text">
      <div class="breadcrumb">
        <button onclick="go('${currentPage}')" style="color:var(--muted);cursor:pointer;font-size:12px">
          ${currentPage === 'applications' ? 'Applications' : currentPage === 'beneficiaries' ? 'Beneficiary Verification' : 'Distribution'}
        </button>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="9 18 15 12 9 6"/></svg>
        <span>${r.id}</span>
      </div>
      <h2>Manage Application</h2>
      <p>Update application details, status, and distribution records</p>
    </div>
    <div class="page-head-actions">
      <button class="btn btn-secondary" onclick="go('${currentPage}')">← Back</button>
    </div>
  </div>

  <div class="grid-2">
    <div>
      <div class="panel mb-20">
        <div class="panel-header"><div class="panel-title">Application Details</div><div>${statusPill(r.status)}</div></div>
        <div class="panel-body">
          <div class="record-meta mb-16">
            <div class="record-meta-item"><span class="record-meta-label">App ID</span><span class="record-meta-val" style="color:var(--emerald)">${r.id}</span></div>
            <div class="record-meta-item"><span class="record-meta-label">Date Filed</span><span class="record-meta-val">${r.date}</span></div>
            <div class="record-meta-item"><span class="record-meta-label">Farmer ID</span><span class="record-meta-val">${r.farmerId}</span></div>
          </div>
          <div class="form-grid-2">
            <div class="form-group"><label class="form-label">Farmer Full Name *</label>
              <input class="form-input" id="ed_name" value="${r.name}"></div>
            <div class="form-group"><label class="form-label">Barangay *</label>
              <select class="form-input" id="ed_barangay">${barOpts}</select></div>
            <div class="form-group"><label class="form-label">Farmer / Registry ID</label>
              <input class="form-input" id="ed_farmerId" value="${r.farmerId}"></div>
            <div class="form-group"><label class="form-label">Contact Number</label>
              <input class="form-input" id="ed_contact" value="${r.contact || ''}"></div>
            <div class="form-group"><label class="form-label">Assistance Program *</label>
              <select class="form-input" id="ed_program">${progOpts}</select></div>
            <div class="form-group"><label class="form-label">Assistance Type</label>
              <select class="form-input" id="ed_type">
                <option ${r.type==='In-Kind'?'selected':''}>In-Kind</option>
                <option ${r.type==='Cash'?'selected':''}>Cash</option>
              </select></div>
            <div class="form-group"><label class="form-label">Amount (₱) *</label>
              <input class="form-input" type="number" id="ed_amount" value="${r.amount}" min="0"></div>
            <div class="form-group"><label class="form-label">Application Status</label>
              <select class="form-input" id="ed_status">${statusOpts}</select></div>
            <div class="form-group full"><label class="form-label">Notes / Supporting Documents</label>
              <textarea class="form-input" id="ed_notes">${r.notes || ''}</textarea></div>
          </div>
          <div class="form-actions">
            <button class="btn btn-danger" onclick="if(confirm('Delete this record?')){records=records.filter(x=>x.id!=='${id}');save();go('${currentPage}');showToast('Record deleted.')}">
              ${icons.trash} Delete
            </button>
            <button class="btn btn-secondary" onclick="go('${currentPage}')">Cancel</button>
            <button class="btn btn-primary" onclick="saveRecord('${id}')">Save Changes</button>
          </div>
        </div>
      </div>
    </div>

    <div>
      <div class="panel mb-20">
        <div class="panel-header"><div class="panel-title">Application Timeline</div></div>
        <div class="panel-body">
          <ul class="timeline">
            ${timelineItems.map(t => `<li class="timeline-item">
              <div class="timeline-dot" style="background:${t.bg};color:${t.dot}">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="${t.dot}" stroke-width="2.5" stroke-linecap="round"><circle cx="12" cy="12" r="3"/></svg>
              </div>
              <div>
                <div class="timeline-text">${t.label}</div>
                <div class="timeline-time">${t.time}</div>
              </div>
            </li>`).join('')}
          </ul>
        </div>
      </div>

      <div class="panel">
        <div class="panel-header"><div class="panel-title">Quick Status Update</div></div>
        <div class="panel-body">
          <p class="text-muted mb-16">Change the status directly for quick processing.</p>
          <div style="display:flex;flex-direction:column;gap:8px">
            ${STATUSES.map(s => `<button onclick="quickStatus('${id}','${s}')" 
              class="btn ${r.status===s?'btn-primary':'btn-secondary'}" 
              style="justify-content:space-between">
              ${s} ${r.status===s?'<span style=\'font-size:11px;opacity:.8\'>✓ Current</span>':''}
            </button>`).join('')}
          </div>
        </div>
      </div>
    </div>
  </div>`;
}

function saveRecord(id) {
  const r = records.find(x => x.id === id);
  if (!r) return;
  r.name     = document.getElementById('ed_name').value;
  r.barangay = document.getElementById('ed_barangay').value;
  r.farmerId = document.getElementById('ed_farmerId').value;
  r.contact  = document.getElementById('ed_contact').value;
  r.program  = document.getElementById('ed_program').value;
  r.type     = document.getElementById('ed_type').value;
  r.amount   = Number(document.getElementById('ed_amount').value);
  r.status   = document.getElementById('ed_status').value;
  r.notes    = document.getElementById('ed_notes').value;
  save();
  go(currentPage);
  showToast('Application record updated successfully.');
}

function quickStatus(id, status) {
  const r = records.find(x => x.id === id);
  if (!r) return;
  r.status = status;
  save();
  viewRecord(id);
  showToast(`Status updated to: ${status}`);
}

// ── NEW APPLICATION MODAL ─────────────────────────────────
function showNewApplicationModal() {
  const progOpts = PROGRAMS.map(p => `<option value="${p}">${p}</option>`).join('');
  const barOpts = BARANGAYS.map(b => `<option value="${b}">${b}</option>`).join('');
  const today = new Date().toISOString().slice(0,10);

  let overlay = document.getElementById('modalOverlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'modalOverlay';
    overlay.className = 'modal-overlay';
    overlay.innerHTML = `<div class="modal" id="modalBox"></div>`;
    overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
    document.body.appendChild(overlay);
  }

  document.getElementById('modalBox').innerHTML = `
    <div class="modal-header">
      <span class="modal-title">${icons.plus} &nbsp;New Assistance Application</span>
      <button class="modal-close" onclick="closeModal()">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    </div>
    <div class="modal-body">
      <form id="newAppForm">
        <div class="form-grid-2">
          <div class="form-group"><label class="form-label">Farmer Full Name *</label>
            <input class="form-input" name="name" required placeholder="e.g. Juan Dela Cruz"></div>
          <div class="form-group"><label class="form-label">Barangay *</label>
            <select class="form-input" name="barangay" required><option value="">Select barangay</option>${barOpts}</select></div>
          <div class="form-group"><label class="form-label">Farmer / Registry ID</label>
            <input class="form-input" name="farmerId" placeholder="e.g. F-1020"></div>
          <div class="form-group"><label class="form-label">Contact Number</label>
            <input class="form-input" name="contact" placeholder="09XXXXXXXXX"></div>
          <div class="form-group"><label class="form-label">Assistance Program *</label>
            <select class="form-input" name="program" required><option value="">Select program</option>${progOpts}</select></div>
          <div class="form-group"><label class="form-label">Assistance Type</label>
            <select class="form-input" name="type"><option>In-Kind</option><option>Cash</option></select></div>
          <div class="form-group"><label class="form-label">Requested Amount (₱) *</label>
            <input class="form-input" name="amount" type="number" min="0" required placeholder="0"></div>
          <div class="form-group"><label class="form-label">Date Filed *</label>
            <input class="form-input" name="date" type="date" value="${today}" required></div>
          <div class="form-group"><label class="form-label">Initial Status</label>
            <select class="form-input" name="status"><option>Pending</option><option>Under Review</option></select></div>
          <div class="form-group full"><label class="form-label">Notes / Supporting Documents</label>
            <textarea class="form-input" name="notes" placeholder="Checklist: barangay cert, RSA ID, farm sketch..."></textarea></div>
        </div>
        <div class="form-actions">
          <button type="button" class="btn btn-secondary" onclick="closeModal()">Cancel</button>
          <button type="submit" class="btn btn-primary">${icons.check} &nbsp;Save Application</button>
        </div>
      </form>
    </div>`;

  document.getElementById('newAppForm').onsubmit = e => {
    e.preventDefault();
    const f = new FormData(e.target);
    const dateVal = f.get('date');
    const dateLabel = new Date(dateVal + 'T00:00:00').toLocaleDateString('en-US', { month:'short', day:'2-digit', year:'numeric' });
    const newRec = {
      id: 'AAS-' + new Date().getFullYear() + '-' + String(records.length + 1).padStart(3,'0'),
      name: f.get('name'), barangay: f.get('barangay'),
      farmerId: f.get('farmerId') || 'Not provided', contact: f.get('contact') || '',
      program: f.get('program'), type: f.get('type'),
      amount: Number(f.get('amount')), date: dateLabel,
      status: f.get('status'), notes: f.get('notes') || ''
    };
    records.unshift(newRec);
    save();
    closeModal();
    go('applications');
    showToast('Application saved: ' + newRec.id);
  };

  requestAnimationFrame(() => overlay.classList.add('open'));
}

function closeModal() {
  const overlay = document.getElementById('modalOverlay');
  if (overlay) { overlay.classList.remove('open'); }
}

// ── EXPORT CSV ────────────────────────────────────────────
function exportCSV() {
  const cols = ['id','name','barangay','farmerId','contact','program','type','date','amount','status','notes'];
  const headers = ['Application ID','Farmer Name','Barangay','Farmer ID','Contact','Program','Type','Date Filed','Amount','Status','Notes'];
  const csv = [
    headers.join(','),
    ...records.map(r => cols.map(k => `"${String(r[k]??'').replaceAll('"','""')}"`).join(','))
  ].join('\r\n');
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob(['\uFEFF'+csv], { type: 'text/csv;charset=utf-8;' }));
  a.download = `agriconnect-assistance-${new Date().toISOString().slice(0,10)}.csv`;
  a.click();
  URL.revokeObjectURL(a.href);
  showToast('CSV report exported successfully.');
}

// ── GLOBAL SEARCH ────────────────────────────────────────
document.getElementById('globalSearch').addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    go('applications');
    setTimeout(() => {
      const f = document.getElementById('appSearch');
      if (f) { f.value = e.target.value; filterApps(); }
    }, 60);
  }
});

// ── RENDER ────────────────────────────────────────────────
function render() {
  const main = document.getElementById('main');
  const pages = { dashboard: pageDashboard, applications: pageApplications, beneficiaries: pageBeneficiaries, distribution: pageDistribution, reports: pageReports, settings: pageSettings };
  main.innerHTML = (pages[currentPage] || pageDashboard)();

  // Init charts after DOM update
  requestAnimationFrame(() => {
    if (currentPage === 'dashboard') initDashboardCharts();
    if (currentPage === 'distribution') initDistChart();
    if (currentPage === 'reports') initReportsCharts();
  });
}

// render() is called by handleLogin() after successful sign-in
