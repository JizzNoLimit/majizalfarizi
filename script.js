const body=document.body,themeToggle=document.getElementById('themeToggle'),themeIcon=document.getElementById('themeIcon'),menuButton=document.getElementById('menuButton'),navMenu=document.getElementById('navMenu');
document.getElementById('year').textContent=new Date().getFullYear();
if(localStorage.getItem('theme')==='light') body.classList.add('light');
function icon(){themeIcon.innerHTML=body.classList.contains('light')?'<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>':'<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>'}
icon();themeToggle.onclick=()=>{body.classList.toggle('light');localStorage.setItem('theme',body.classList.contains('light')?'light':'dark');icon()};
menuButton.onclick=()=>{navMenu.classList.toggle('active');body.classList.toggle('menu-open')};document.querySelectorAll('.nav-menu a').forEach(a=>a.onclick=()=>{navMenu.classList.remove('active');body.classList.remove('menu-open')});window.addEventListener('resize',()=>{if(innerWidth>760){navMenu.classList.remove('active');body.classList.remove('menu-open')}});

/* =====================================================
   PROJECT DATA
   =====================================================
   Untuk menambah project baru, cukup copy satu object di bawah,
   lalu ubah title, category, description, stack, image, demo, source.
*/
const projects = [
  {
    title: 'HM & KM Monitoring Dashboard',
    category: 'Data & Monitoring',
    filter: 'monitoring',
    status: 'Demo',
    description: 'Dashboard untuk membantu melihat data HM, KM, aktivitas unit, dan informasi operasional dalam satu tampilan yang lebih mudah dipantau.',
    stack: ['Google Apps Script','Google Sheets','HTML','CSS','JavaScript'],
    image: '',
    demo: '#',
    source: '#'
  },
];

const projectsGrid = document.getElementById('projectsGrid');
const projectFilters = document.getElementById('projectFilters');
const projectCount = document.getElementById('projectCount');

function dashboardMockup(){
  return `
    <div class="project-visual" aria-label="Preview dummy dashboard">
      <div class="mock-browser"><span class="mock-dot"></span><span class="mock-dot"></span><span class="mock-dot"></span><span class="mock-address"></span></div>
      <div class="mock-dashboard">
        <div class="mock-sidebar"><div class="mock-line short"></div><div class="mock-line"></div><div class="mock-line"></div><div class="mock-line short"></div><div class="mock-line"></div></div>
        <div class="mock-main">
          <div class="mock-stats"><div class="mock-stat"></div><div class="mock-stat"></div><div class="mock-stat"></div></div>
          <div class="mock-chart"><div class="mock-bars"><i></i><i></i><i></i><i></i><i></i><i></i></div></div>
        </div>
      </div>
    </div>`;
}

function projectVisual(project){
  if(project.image){
    return `<img src="${project.image}" alt="Preview ${project.title}">`;
  }
  return dashboardMockup();
}

function safeProjectLink(url){
  return url && url !== '#' ? url : '#';
}

function renderProjects(filter='all'){
  const visible = filter === 'all' ? projects : projects.filter(project => project.filter === filter);
  projectCount.textContent = `${projects.length} Project${projects.length > 1 ? 's' : ''}`;
  projectsGrid.className = `projects-grid ${projects.length === 1 ? 'single-project' : 'multi-project'}`;

  if(!visible.length){
    projectsGrid.innerHTML = '<div class="project-empty">Belum ada project pada kategori ini.</div>';
    return;
  }

  projectsGrid.innerHTML = visible.map((project, index) => {
    const originalIndex = projects.indexOf(project) + 1;
    const demoDisabled = !project.demo || project.demo === '#';
    const sourceDisabled = !project.source || project.source === '#';
    return `
      <article class="project-card">
        <div class="project-thumb">${projectVisual(project)}</div>
        <div class="project-body project-content">
          <div class="project-meta">
            <span>Project ${String(originalIndex).padStart(2,'0')}</span>
            <span class="project-badge">${project.status}</span>
          </div>
          <h3>${project.title}</h3>
          <p>${project.description}</p>
          <div class="project-stack">${project.stack.map(item => `<span>${item}</span>`).join('')}</div>
          <div class="project-actions">
            <a href="${safeProjectLink(project.demo)}" ${demoDisabled ? 'onclick="return false;"' : 'target="_blank" rel="noopener"'} class="btn btn-main">Lihat Project</a>
            <a href="${safeProjectLink(project.source)}" ${sourceDisabled ? 'onclick="return false;"' : 'target="_blank" rel="noopener"'} class="btn btn-outline">Source Code</a>
          </div>
          ${demoDisabled && sourceDisabled ? '<div class="project-note">Konten masih dummy. Link dapat diaktifkan saat project sudah dipublikasikan.</div>' : ''}
        </div>
      </article>`;
  }).join('');
}

function buildProjectFilters(){
  const categories = [...new Set(projects.map(project => project.filter))];
  if(projects.length <= 1){
    projectFilters.style.display = 'none';
    return;
  }

  const filterLabel = key => key.charAt(0).toUpperCase() + key.slice(1).replace(/-/g,' ');
  projectFilters.innerHTML = [
    '<button class="project-filter active" data-filter="all">Semua</button>',
    ...categories.map(category => `<button class="project-filter" data-filter="${category}">${filterLabel(category)}</button>`)
  ].join('');

  projectFilters.querySelectorAll('.project-filter').forEach(button => {
    button.addEventListener('click', () => {
      projectFilters.querySelectorAll('.project-filter').forEach(item => item.classList.remove('active'));
      button.classList.add('active');
      renderProjects(button.dataset.filter);
    });
  });
}

buildProjectFilters();
renderProjects();