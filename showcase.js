(() => {
  'use strict';

  const byId = id => document.getElementById(id);
  const heroRow = document.querySelector('#hero .row');
  const tools = document.querySelector('.top .tools');

  document.title = 'Aevum Core — Genesis 0.7 Showcase';
  const brandRelease = document.querySelector('.brand b');
  if (brandRelease) brandRelease.textContent = 'Genesis 0.7';

  const css = document.createElement('link');
  css.rel = 'stylesheet';
  css.href = './showcase.css';
  document.head.appendChild(css);

  const demoBtn = byId('demoBtn');
  const guidedBtn = byId('guidedBtn');
  const enterBtn = byId('enterBtn');

  if (demoBtn && heroRow) {
    demoBtn.textContent = 'Vivi la storia demo';
    demoBtn.classList.add('primary');
    guidedBtn?.classList.remove('primary');
    guidedBtn && (guidedBtn.textContent = 'Pianta una traccia');
    enterBtn && (enterBtn.textContent = 'Esplora liberamente');
    heroRow.prepend(demoBtn);
    if (guidedBtn) heroRow.appendChild(guidedBtn);
    if (enterBtn) heroRow.appendChild(enterBtn);
  }

  const presentBtn = document.createElement('button');
  presentBtn.id = 'presentBtn';
  presentBtn.className = 'pill icon showcase-present-btn';
  presentBtn.type = 'button';
  presentBtn.title = 'Modalità Presentazione';
  presentBtn.setAttribute('aria-label', 'Avvia modalità presentazione');
  presentBtn.textContent = '▶';
  if (tools) tools.insertBefore(presentBtn, tools.firstChild);

  const constellationDock = document.createElement('div');
  constellationDock.className = 'constellation-dock';
  constellationDock.id = 'constellationDock';
  const constellations = [
    ['Tutto', ''],
    ['Famiglia', 'figlio'],
    ['Lavoro', 'lavoro'],
    ['Sport', 'sport'],
    ['Pressioni', 'pressione'],
    ['Futuro', 'futuro']
  ];
  constellations.forEach(([label, query], index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = `constellation-chip${index === 0 ? ' on' : ''}`;
    button.dataset.query = query;
    button.textContent = label;
    button.addEventListener('click', () => {
      constellationDock.querySelectorAll('.constellation-chip').forEach(item => item.classList.toggle('on', item === button));
      applyQuery(query);
    });
    constellationDock.appendChild(button);
  });
  document.body.appendChild(constellationDock);

  const summary = document.createElement('div');
  summary.className = 'showcase-summary';
  summary.id = 'showcaseSummary';
  document.body.appendChild(summary);

  const overlay = document.createElement('div');
  overlay.className = 'presentation-overlay';
  overlay.id = 'presentationOverlay';
  overlay.innerHTML = `
    <div class="presentation-controls" aria-label="Controlli presentazione">
      <button id="presentationPrev" type="button" aria-label="Indietro">←</button>
      <button id="presentationPlay" type="button" aria-label="Pausa o riprendi">❚❚</button>
      <button id="presentationNext" type="button" aria-label="Avanti">→</button>
      <button id="presentationTv" type="button" aria-label="Modalità TV">TV</button>
      <button id="presentationRestart" type="button" aria-label="Ricomincia">↺</button>
      <button id="presentationClose" type="button" aria-label="Chiudi">×</button>
    </div>
    <div class="presentation-caption">
      <div class="presentation-kicker" id="presentationKicker"></div>
      <h2 id="presentationTitle"></h2>
      <p id="presentationText"></p>
      <div class="presentation-progress"><i id="presentationProgress"></i></div>
    </div>`;
  document.body.appendChild(overlay);

  const slides = [
    {
      kicker: 'Aevum Core',
      title: 'Una vita non è una lista.',
      text: 'Ricordi, persone, lavoro, sport e difficoltà diventano una rete che continua a cambiare significato.',
      mode: 'orbit', query: '', year: null, focus: null
    },
    {
      kicker: 'Costellazione Famiglia',
      title: 'Un figlio cambia il centro della rete.',
      text: 'Una nascita genera identità, routine, responsabilità, paure e progetti futuri.',
      mode: 'orbit', query: 'figlio', year: null, focus: 'demo-child-birth'
    },
    {
      kicker: 'Radici e rami',
      title: 'Ogni evento ha un prima e un dopo.',
      text: 'Le radici mostrano ciò che ha portato a una traccia. I rami mostrano ciò che quella traccia ha generato.',
      mode: 'orbit', query: 'famiglia', year: null, focus: 'demo-father'
    },
    {
      kicker: 'Costellazione Lavoro',
      title: 'Il lavoro non resta isolato dal resto.',
      text: 'Ambizione, riconoscimento economico, pressione e tempo perso nel traffico si influenzano a vicenda.',
      mode: 'orbit', query: 'lavoro', year: null, focus: 'demo-work-city'
    },
    {
      kicker: 'Costellazione Sport',
      title: 'Una vittoria accende più di un singolo nodo.',
      text: 'La squadra, la disciplina e il senso di responsabilità possono riattivare fiducia anche fuori dallo sport.',
      mode: 'orbit', query: 'sport', year: null, focus: 'demo-team-win'
    },
    {
      kicker: 'Zone di pressione',
      title: 'Le difficoltà formano costellazioni proprie.',
      text: 'Traffico, tensioni familiari e giornate complicate non sono episodi separati quando condividono tempo ed energia.',
      mode: 'orbit', query: 'pressione', year: null, focus: 'demo-traffic'
    },
    {
      kicker: 'Timeline',
      title: 'La rete può essere osservata mentre nasce.',
      text: 'Spostando il tempo, gli eventi futuri scompaiono e rimane visibile soltanto la struttura costruita fino a quell’anno.',
      mode: 'orbit', query: '', year: 2025, focus: null
    },
    {
      kicker: 'Deep Space',
      title: 'La memoria possiede anche una profondità.',
      text: 'I nodi più vicini acquistano presenza. Quelli lontani restano visibili come possibilità, ferite o direzioni future.',
      mode: 'deep', query: 'futuro', year: null, focus: 'demo-future'
    },
    {
      kicker: 'The Living Memory Space',
      title: 'Questa non è una cronologia.',
      text: 'È il modo in cui una vita resta collegata. Da qui puoi piantare una nuova traccia e lasciar crescere il Core.',
      mode: 'deep', query: '', year: null, focus: null
    }
  ];

  let currentSlide = 0;
  let timer = null;
  let playing = false;
  const intervalMs = 8000;

  function applyQuery(query) {
    const input = byId('searchInput');
    if (input) input.value = query;
    state.query = query;
    updateSearch();
    renderList();
    updateSummary();
  }

  function applyMode(mode) {
    if (!mode || state.mode === mode) return;
    state.mode = mode;
    state.targetX = 0;
    state.targetY = 0;
    state.targetZoom = mode === 'deep' ? .95 : 1;
    updateModeUI();
  }

  function applyYear(year) {
    state.timelineYear = year;
    updateTimelineBounds();
    const range = byId('timelineRange');
    const label = byId('timelineLabel');
    if (year && range) range.value = year;
    if (label) label.textContent = year || 'Tutto';
    updateStatus();
  }

  function focusNode(id) {
    state.focus = null;
    state.selected = null;
    if (!id) {
      center();
      return;
    }
    const node = state.nodes.find(item => item.id === id);
    if (!node) return;
    state.selected = node.id;
    const position = nodePosition(node);
    state.targetX += (state.W / 2 - position.x) / state.zoom;
    state.targetY += (state.H / 2 - position.y) / state.zoom;
    state.targetZoom = Math.min(1.55, Math.max(1.18, state.targetZoom));
    state.focus = node.id;
    updateStatus();
  }

  function renderSlide(index) {
    currentSlide = (index + slides.length) % slides.length;
    const slide = slides[currentSlide];
    applyMode(slide.mode);
    applyYear(slide.year);
    applyQuery(slide.query);
    setTimeout(() => focusNode(slide.focus), 120);
    byId('presentationKicker').textContent = `${currentSlide + 1} / ${slides.length} · ${slide.kicker}`;
    byId('presentationTitle').textContent = slide.title;
    byId('presentationText').textContent = slide.text;
    byId('presentationProgress').style.width = `${((currentSlide + 1) / slides.length) * 100}%`;
    updateSummary();
  }

  function schedule() {
    clearInterval(timer);
    if (!playing) return;
    timer = setInterval(() => {
      if (currentSlide >= slides.length - 1) {
        pausePresentation();
        return;
      }
      renderSlide(currentSlide + 1);
    }, intervalMs);
  }

  function playPresentation() {
    playing = true;
    byId('presentationPlay').textContent = '❚❚';
    byId('presentationPlay').classList.add('active');
    schedule();
  }

  function pausePresentation() {
    playing = false;
    clearInterval(timer);
    timer = null;
    byId('presentationPlay').textContent = '▶';
    byId('presentationPlay').classList.remove('active');
  }

  function startPresentation() {
    enter();
    closePanels();
    closeForm?.();
    closeGuided?.();
    overlay.classList.add('open');
    document.body.classList.add('presentation-active');
    currentSlide = 0;
    renderSlide(0);
    playPresentation();
  }

  function stopPresentation() {
    pausePresentation();
    overlay.classList.remove('open');
    document.body.classList.remove('presentation-active', 'tv-mode');
    applyYear(null);
    applyQuery('');
    center();
  }

  function updateSummary() {
    const years = state.nodes.map(node => Number(String(node.date || '').slice(0, 4))).filter(Number.isFinite);
    const span = years.length ? Math.max(...years) - Math.min(...years) + 1 : 0;
    summary.innerHTML = `<b>${state.nodes.length} tracce</b><span>${state.connections.length} connessioni vive</span><span>${span} anni attraversati</span>`;
  }

  byId('presentationPrev').addEventListener('click', () => { pausePresentation(); renderSlide(currentSlide - 1); });
  byId('presentationNext').addEventListener('click', () => { pausePresentation(); renderSlide(currentSlide + 1); });
  byId('presentationPlay').addEventListener('click', () => playing ? pausePresentation() : playPresentation());
  byId('presentationRestart').addEventListener('click', () => { renderSlide(0); playPresentation(); });
  byId('presentationClose').addEventListener('click', stopPresentation);
  byId('presentationTv').addEventListener('click', async () => {
    document.body.classList.toggle('tv-mode');
    byId('presentationTv').classList.toggle('active', document.body.classList.contains('tv-mode'));
    state.targetZoom = document.body.classList.contains('tv-mode') ? 1.18 : (state.mode === 'deep' ? .95 : 1);
    try {
      if (document.body.classList.contains('tv-mode') && document.documentElement.requestFullscreen) await document.documentElement.requestFullscreen();
      if (!document.body.classList.contains('tv-mode') && document.fullscreenElement) await document.exitFullscreen();
    } catch (_) {}
  });

  presentBtn.addEventListener('click', () => {
    const hasShowcase = state.nodes.some(node => String(node.id).startsWith('demo-'));
    if (!hasShowcase) loadDemo();
    else startPresentation();
  });

  document.addEventListener('aevum:demo-loaded', startPresentation);
  document.addEventListener('aevum:data-changed', updateSummary);
  updateSummary();
})();
