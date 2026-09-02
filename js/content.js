function byDateDesc(a, b) {
  return new Date(b.date || 0) - new Date(a.date || 0);
}

function insightCardHTML(item) {
  if (item.status === 'pending') {
    return `
      <div class="article-card pending">
        <div class="thumb"><span class="tag">${item.tag}</span></div>
        <div class="body">
          <div class="meta">${item.dateLabel}</div>
          <h3>${item.title}</h3>
          <p>${item.excerpt}</p>
        </div>
      </div>`;
  }
  return `
    <a class="article-card" href="${item.url}" style="display:flex;">
      <div class="thumb"><span class="tag">${item.tag}</span></div>
      <div class="body">
        <div class="meta">${item.dateLabel}</div>
        <h3>${item.title}</h3>
        <p>${item.excerpt}</p>
        <div class="read">Read the piece →</div>
      </div>
    </a>`;
}

function experienceCardHTML(item) {
  return `
    <div class="exp-card">
      <div class="exp-card-top">
        <div class="client">${item.client}</div>
        <h3>${item.title}</h3>
        <div class="row"><b>Focus</b><span>${item.focus}</span></div>
      </div>
      <hr class="exp-divider">
      <p>${item.description}</p>
    </div>`;
}

function renderHomeInsights() {
  const el = document.getElementById('latest-insights');
  if (!el || typeof INSIGHTS_DATA === 'undefined') return;
  const published = INSIGHTS_DATA.filter((i) => i.status === 'published').sort(byDateDesc);
  el.innerHTML = published.slice(0, 3).map(insightCardHTML).join('');
}

function renderHomeExperience() {
  const el = document.getElementById('selected-experience');
  if (!el || typeof EXPERIENCE_DATA === 'undefined') return;
  const sorted = [...EXPERIENCE_DATA].sort(byDateDesc);
  el.innerHTML = sorted.slice(0, 3).map(experienceCardHTML).join('');
}

function renderAllInsights() {
  const el = document.getElementById('all-insights');
  if (!el || typeof INSIGHTS_DATA === 'undefined') return;
  const sorted = [...INSIGHTS_DATA].sort((a, b) => {
    if (a.status !== b.status) return a.status === 'published' ? -1 : 1;
    return byDateDesc(a, b);
  });
  el.innerHTML = sorted.map(insightCardHTML).join('');
}

function renderAllExperience() {
  const el = document.getElementById('all-experience');
  if (!el || typeof EXPERIENCE_DATA === 'undefined') return;
  const sorted = [...EXPERIENCE_DATA].sort(byDateDesc);
  el.innerHTML = sorted.map(experienceCardHTML).join('');
}

function loadScript(src) {
  return new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = src + '?cb=' + Date.now();
    s.onload = resolve;
    s.onerror = reject;
    document.head.appendChild(s);
  });
}

document.addEventListener('DOMContentLoaded', async () => {
  await Promise.all([loadScript('data/insights.js'), loadScript('data/experience.js')]);
  renderHomeInsights();
  renderHomeExperience();
  renderAllInsights();
  renderAllExperience();
});
