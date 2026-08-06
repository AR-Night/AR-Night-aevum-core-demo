function loadDemo(){
  enter();
  if(state.nodes.length&&!confirm('Caricare la storia demo sostituendo le eventuali tracce dimostrative già presenti?'))return;
  state.nodes=state.nodes.filter(n=>!String(n.id).startsWith('demo-'));
  state.connections=state.connections.filter(c=>!String(c.from).startsWith('demo-')&&!String(c.to).startsWith('demo-'));
  const demo=[
    {id:'demo-child-birth',title:'La nascita di mio figlio',text:'Il giorno in cui sono diventato padre. Il centro della vita ha cambiato posizione.',type:'Ricordo',emotion:'Amore',intensity:10,meaning:'Mi ha cambiato',date:'2024-04-14',eventSize:'Grande',tags:['figlio','famiglia','nascita','padre'],a:.12,r:145,z:-120},
    {id:'demo-father',title:'Imparare a essere padre',text:'Una nuova identità che cresce tra responsabilità, paura e meraviglia.',type:'Persona',emotion:'Speranza',intensity:9,meaning:'Mi ha formato',date:'2024-04-15',eventSize:'Grande',tags:['figlio','famiglia','padre','crescita'],a:.54,r:220,z:80},
    {id:'demo-bedtime',title:'La routine della buonanotte',text:'Una piccola abitudine quotidiana che col tempo diventa memoria condivisa.',type:'Routine',emotion:'Serenità',intensity:7,meaning:'Fa parte di me',date:'2024-05-02',eventSize:'Piccolo',tags:['figlio','famiglia','routine','sera'],a:.96,r:315,z:-250},
    {id:'demo-first-word',title:'La prima parola',text:'Un suono semplice che improvvisamente ha riempito tutta la casa.',type:'Ricordo',emotion:'Gioia',intensity:9,meaning:'Mi ha cambiato',date:'2025-02-18',eventSize:'Medio',tags:['figlio','famiglia','crescita','parole'],a:1.38,r:405,z:110},
    {id:'demo-nursery',title:'Il primo giorno al nido',text:'Orgoglio, distacco e la sensazione che il tempo stesse accelerando.',type:'Sfida',emotion:'Nostalgia',intensity:8,meaning:'Mi ha insegnato',date:'2025-09-08',eventSize:'Medio',tags:['figlio','famiglia','crescita','distacco'],a:1.80,r:485,z:-40},
    {id:'demo-family-trip',title:'Un viaggio in famiglia',text:'Una giornata fuori dalla routine diventata un ricordo luminoso.',type:'Ricordo',emotion:'Gioia',intensity:8,meaning:'Fa parte di me',date:'2025-08-17',eventSize:'Medio',tags:['figlio','famiglia','viaggio','tempo'],a:2.22,r:365,z:230},
    {id:'demo-child-difficulty',title:'Una giornata difficile con mio figlio',text:'Stanchezza, incomprensione e il timore di non riuscire sempre a essere il padre che vorrei.',type:'Paura',emotion:'Tristezza',intensity:8,meaning:'Mi ha ferito',date:'2026-06-09',eventSize:'Medio',tags:['figlio','famiglia','pressione','difficoltà'],a:2.64,r:285,z:270},
    {id:'demo-quiet-sunday',title:'Una domenica senza fretta',text:'Poche cose, nessun programma urgente e la sensazione di essere esattamente nel posto giusto.',type:'Routine',emotion:'Serenità',intensity:8,meaning:'Fa parte di me',date:'2026-04-12',eventSize:'Piccolo',tags:['famiglia','tempo','serenità','figlio'],a:3.06,r:430,z:-160},
    {id:'demo-couple-tension',title:'Una tensione di coppia',text:'Quando lavoro, stanchezza e responsabilità familiari arrivano nello stesso punto.',type:'Sfida',emotion:'Rabbia',intensity:7,meaning:'Mi ha insegnato',date:'2026-06-11',eventSize:'Medio',tags:['coppia','famiglia','pressione','lavoro'],a:3.48,r:345,z:-20},
    {id:'demo-reconciliation',title:'Ritrovarsi dopo una discussione',text:'Parlare con meno difese e ricordare che il problema non è la persona che si ha davanti.',type:'Ricordo',emotion:'Amore',intensity:8,meaning:'Mi ha insegnato',date:'2026-06-12',eventSize:'Medio',tags:['coppia','famiglia','dialogo','crescita'],a:3.90,r:250,z:190},
    {id:'demo-calm-evening',title:'Una sera tranquilla insieme',text:'La casa finalmente silenziosa e uno spazio piccolo ma reale per la coppia.',type:'Routine',emotion:'Serenità',intensity:7,meaning:'Fa parte di me',date:'2026-06-20',eventSize:'Piccolo',tags:['coppia','famiglia','serenità','tempo'],a:4.32,r:390,z:-280},
    {id:'demo-work-city',title:'Il lavoro in città',text:'Responsabilità, crescita professionale e la sensazione di dover tenere insieme molti fili.',type:'Sfida',emotion:'Orgoglio',intensity:8,meaning:'Mi ha formato',date:'2025-01-20',eventSize:'Grande',tags:['lavoro','città','carriera','pressione'],a:4.74,r:260,z:160},
    {id:'demo-demanding-project',title:'Un progetto molto impegnativo',text:'Scadenze ravvicinate, molte decisioni e la necessità di restare lucidi.',type:'Sfida',emotion:'Paura',intensity:8,meaning:'Mi ha formato',date:'2025-03-10',eventSize:'Grande',tags:['lavoro','progetto','pressione','responsabilità'],a:5.16,r:375,z:300},
    {id:'demo-presentation',title:'Una presentazione riuscita',text:'Il momento in cui preparazione e chiarezza sono diventate fiducia condivisa.',type:'Obiettivo',emotion:'Orgoglio',intensity:9,meaning:'Mi ha insegnato',date:'2025-04-02',eventSize:'Medio',tags:['lavoro','successo','fiducia','progetto'],a:5.58,r:455,z:-140},
    {id:'demo-traffic',title:'Il traffico quotidiano',text:'Tempo perso, stanchezza e rientri più tardi del previsto.',type:'Routine',emotion:'Rabbia',intensity:7,meaning:'Mi ha insegnato',date:'2025-02-03',eventSize:'Medio',tags:['lavoro','traffico','pressione','tempo'],a:6.00,r:525,z:260},
    {id:'demo-late-return',title:'Rientrare a casa troppo tardi',text:'La sensazione che il lavoro abbia occupato anche il tempo destinato alla famiglia.',type:'Paura',emotion:'Tristezza',intensity:7,meaning:'Mi ha ferito',date:'2025-02-21',eventSize:'Medio',tags:['lavoro','famiglia','traffico','tempo','pressione'],a:.33,r:510,z:-300},
    {id:'demo-bonus',title:'Un riconoscimento economico importante',text:'Il risultato concreto di un lavoro complesso e di una responsabilità sostenuta nel tempo.',type:'Obiettivo',emotion:'Orgoglio',intensity:8,meaning:'Mi ha insegnato',date:'2026-03-28',eventSize:'Medio',tags:['lavoro','successo','riconoscimento','futuro'],a:.75,r:340,z:-80},
    {id:'demo-career-uncertainty',title:'Un dubbio sul futuro professionale',text:'La domanda se continuare sulla stessa strada o costruire qualcosa di nuovo.',type:'Paura',emotion:'Paura',intensity:7,meaning:'Mi chiama ancora',date:'2026-01-16',eventSize:'Medio',tags:['lavoro','futuro','incertezza','carriera'],a:1.17,r:455,z:200},
    {id:'demo-team-meeting',title:'Una riunione decisiva',text:'Molte opinioni diverse e la responsabilità di trovare una direzione comune.',type:'Sfida',emotion:'Paura',intensity:7,meaning:'Mi ha insegnato',date:'2025-06-05',eventSize:'Medio',tags:['lavoro','squadra','decisione','pressione'],a:1.59,r:295,z:-220},
    {id:'demo-waterpolo',title:'Lo sport di squadra come parte di me',text:'Non soltanto sport: disciplina, identità, squadra e capacità di resistere.',type:'Persona',emotion:'Nostalgia',intensity:9,meaning:'Fa parte di me',date:'2024-09-02',eventSize:'Grande',tags:['sport','squadra','disciplina','identità'],a:2.01,r:245,z:-190},
    {id:'demo-hard-training',title:'Un allenamento molto duro',text:'Fatica, correzioni e la scelta di non abbassare il livello richiesto.',type:'Routine',emotion:'Orgoglio',intensity:8,meaning:'Mi ha formato',date:'2025-10-06',eventSize:'Medio',tags:['sport','squadra','allenamento','disciplina'],a:2.43,r:360,z:120},
    {id:'demo-defeat',title:'Una sconfitta difficile da accettare',text:'Il risultato ha mostrato limiti che durante la preparazione erano rimasti nascosti.',type:'Paura',emotion:'Tristezza',intensity:9,meaning:'Mi ha ferito',date:'2026-02-15',eventSize:'Grande',tags:['sport','squadra','sconfitta','crescita'],a:2.85,r:470,z:290},
    {id:'demo-team-win',title:'La vittoria della squadra',text:'Una vittoria costruita insieme, capace di restituire fiducia anche a chi guida il gruppo.',type:'Sfida',emotion:'Orgoglio',intensity:9,meaning:'Mi ha insegnato',date:'2026-05-17',eventSize:'Grande',tags:['sport','squadra','vittoria','fiducia'],a:3.27,r:315,z:130},
    {id:'demo-athlete-growth',title:'La crescita di un ragazzo della squadra',text:'Vedere disciplina e fiducia trasformarsi in autonomia.',type:'Ricordo',emotion:'Orgoglio',intensity:8,meaning:'Mi ha cambiato',date:'2026-05-24',eventSize:'Medio',tags:['sport','squadra','ragazzi','crescita'],a:3.69,r:420,z:-110},
    {id:'demo-team-cohesion',title:'La squadra finalmente unita',text:'I singoli hanno iniziato a muoversi come un unico organismo.',type:'Obiettivo',emotion:'Gioia',intensity:9,meaning:'Mi ha insegnato',date:'2026-04-19',eventSize:'Grande',tags:['sport','squadra','fiducia','gruppo'],a:4.11,r:505,z:-260},
    {id:'demo-personal-workout',title:'Tornare ad allenarmi per me',text:'Ritagliare uno spazio personale senza trasformarlo in un altro obbligo.',type:'Routine',emotion:'Serenità',intensity:7,meaning:'Fa parte di me',date:'2026-01-08',eventSize:'Piccolo',tags:['sport','energia','equilibrio','routine'],a:4.53,r:300,z:250},
    {id:'demo-fatigue',title:'Una settimana di stanchezza',text:'Poco sonno, molti impegni e una soglia di pazienza più bassa.',type:'Paura',emotion:'Tristezza',intensity:7,meaning:'Mi ha ferito',date:'2026-02-27',eventSize:'Medio',tags:['pressione','energia','lavoro','famiglia'],a:4.95,r:400,z:40},
    {id:'demo-fear-not-enough',title:'La paura di non esserci abbastanza',text:'Il dubbio che tempo e attenzione non siano mai sufficienti per tutte le persone importanti.',type:'Paura',emotion:'Paura',intensity:8,meaning:'Mi chiama ancora',date:'2026-03-03',eventSize:'Medio',tags:['famiglia','figlio','pressione','tempo'],a:5.37,r:490,z:-190},
    {id:'demo-balance',title:'Ritrovare un po’ di equilibrio',text:'Ridurre il rumore e scegliere quali responsabilità meritano davvero energia.',type:'Obiettivo',emotion:'Serenità',intensity:8,meaning:'Mi ha cambiato',date:'2026-03-15',eventSize:'Medio',tags:['equilibrio','energia','famiglia','lavoro'],a:5.79,r:350,z:180},
    {id:'demo-protected-time',title:'Proteggere il tempo familiare',text:'Una decisione concreta: alcuni spazi non devono più essere occupati dal lavoro.',type:'Obiettivo',emotion:'Speranza',intensity:9,meaning:'Mi ha cambiato',date:'2026-04-01',eventSize:'Grande',tags:['famiglia','tempo','lavoro','futuro'],a:6.21,r:445,z:20},
    {id:'demo-future',title:'Il futuro che vorrei lasciare a mio figlio',text:'Uno spazio in cui possa ricordare da dove viene senza sentirsi definito dal passato.',type:'Sogno',emotion:'Speranza',intensity:10,meaning:'Mi chiama ancora',date:'2026-07-26',eventSize:'Grande',tags:['figlio','famiglia','futuro','sogno'],a:.21,r:395,z:30},
    {id:'demo-project-idea',title:'L’idea di costruire un progetto mio',text:'Trasformare competenze e immaginazione in qualcosa che abbia una forma personale.',type:'Sogno',emotion:'Speranza',intensity:9,meaning:'Mi chiama ancora',date:'2026-05-02',eventSize:'Grande',tags:['lavoro','futuro','progetto','creatività'],a:.63,r:500,z:-70},
    {id:'demo-future-home',title:'Una casa con più tempo dentro',text:'Non una casa più grande, ma una vita meno compressa e più presente.',type:'Sogno',emotion:'Serenità',intensity:9,meaning:'Mi chiama ancora',date:'2026-07-01',eventSize:'Grande',tags:['famiglia','futuro','casa','tempo'],a:1.05,r:455,z:250},
    {id:'demo-season-restart',title:'L’inizio di una nuova stagione',text:'Ripartire con obiettivi più chiari e una squadra ancora da costruire.',type:'Obiettivo',emotion:'Speranza',intensity:8,meaning:'Mi chiama ancora',date:'2026-09-01',eventSize:'Grande',tags:['sport','squadra','futuro','disciplina'],a:1.47,r:540,z:-240}
  ].map(normalizeNode);
  state.nodes.push(...demo);
  const rels=[
    ['demo-child-birth','demo-father','Padre / figlio'],
    ['demo-father','demo-bedtime','È causa di'],
    ['demo-child-birth','demo-first-word','È causa di'],
    ['demo-father','demo-nursery','È collegato a'],
    ['demo-nursery','demo-child-difficulty','È collegato a'],
    ['demo-child-birth','demo-family-trip','Ricordo di'],
    ['demo-bedtime','demo-quiet-sunday','È collegato a'],
    ['demo-child-difficulty','demo-couple-tension','È causa di'],
    ['demo-couple-tension','demo-reconciliation','È conseguenza di'],
    ['demo-reconciliation','demo-calm-evening','È causa di'],
    ['demo-work-city','demo-demanding-project','È causa di'],
    ['demo-demanding-project','demo-presentation','È causa di'],
    ['demo-presentation','demo-bonus','È causa di'],
    ['demo-work-city','demo-traffic','È causa di'],
    ['demo-traffic','demo-late-return','È causa di'],
    ['demo-late-return','demo-couple-tension','È causa di'],
    ['demo-work-city','demo-career-uncertainty','È collegato a'],
    ['demo-career-uncertainty','demo-project-idea','Obiettivo nato da'],
    ['demo-team-meeting','demo-demanding-project','È collegato a'],
    ['demo-waterpolo','demo-hard-training','È causa di'],
    ['demo-hard-training','demo-defeat','È collegato a'],
    ['demo-defeat','demo-team-cohesion','Mi ha fatto crescere'],
    ['demo-team-cohesion','demo-team-win','È causa di'],
    ['demo-team-win','demo-athlete-growth','È causa di'],
    ['demo-waterpolo','demo-team-cohesion','È collegato a'],
    ['demo-waterpolo','demo-personal-workout','È collegato a'],
    ['demo-personal-workout','demo-balance','È causa di'],
    ['demo-traffic','demo-fatigue','È causa di'],
    ['demo-fatigue','demo-fear-not-enough','È causa di'],
    ['demo-fear-not-enough','demo-child-difficulty','È collegato a'],
    ['demo-balance','demo-protected-time','È causa di'],
    ['demo-protected-time','demo-quiet-sunday','È causa di'],
    ['demo-protected-time','demo-calm-evening','È causa di'],
    ['demo-child-birth','demo-future','Obiettivo nato da'],
    ['demo-bonus','demo-future-home','È collegato a'],
    ['demo-project-idea','demo-future-home','È collegato a'],
    ['demo-future','demo-future-home','È collegato a'],
    ['demo-team-win','demo-father','Mi ha fatto crescere'],
    ['demo-athlete-growth','demo-father','Mi ha fatto crescere'],
    ['demo-calm-evening','demo-future','È collegato a'],
    ['demo-season-restart','demo-hard-training','È causa di'],
    ['demo-season-restart','demo-team-win','Obiettivo nato da'],
    ['demo-nursery','demo-first-word','È collegato a'],
    ['demo-family-trip','demo-quiet-sunday','Ricordo di'],
    ['demo-presentation','demo-balance','Mi ha fatto crescere'],
    ['demo-bonus','demo-protected-time','È causa di'],
    ['demo-reconciliation','demo-protected-time','Mi ha fatto crescere'],
    ['demo-late-return','demo-fatigue','È causa di'],
    ['demo-team-meeting','demo-career-uncertainty','È collegato a'],
    ['demo-defeat','demo-personal-workout','Mi ha fatto crescere']
  ];
  rels.forEach(([from,to,type])=>state.connections.push(normalizeConnection({from,to,type})));
  save();renderFilters();renderList();updateSearch();updateTimelineBounds();updateStatus();
  toast(`${demo.length} tracce demo caricate.`);
  document.dispatchEvent(new CustomEvent('aevum:demo-loaded'));
}
function updateModeUI(){const deep=state.mode==='deep';$('modeBtn').innerHTML=deep?'◎ <span class="word">Orbita</span>':'◈ <span class="word">Deep</span>';$('deepBadge').classList.toggle('show',deep);updateStatus();save()}function toggleMode(){enter();state.mode=state.mode==='deep'?'orbit':'deep';state.targetX=0;state.targetY=0;state.targetZoom=state.mode==='deep'?.82:.92;updateModeUI()}function updateTimelineBounds(){const years=state.nodes.map(n=>Number(String(n.date||'').slice(0,4))).filter(Number.isFinite),input=$('timelineRange');if(!years.length){input.min=0;input.max=0;input.value=0;$('timelineLabel').textContent='Tutto';return}const min=Math.min(...years),max=Math.max(...years);input.min=min;input.max=max;input.value=state.timelineYear||max;$('timelineLabel').textContent=state.timelineYear||'Tutto'}function setTimeline(value){state.timelineYear=value?Number(value):null;$('timelineLabel').textContent=state.timelineYear||'Tutto';updateStatus()}function selectChoice(group,value){document.querySelectorAll(`#${group} .choice`).forEach(b=>b.classList.toggle('on',b.dataset.value===value))}function choiceValue(group){return document.querySelector(`#${group} .choice.on`)?.dataset.value}function openGuided(){enter();closePanels();$('gTitle').value='';$('gTags').value='';selectChoice('gTypeChoices','Ricordo');selectChoice('gSizeChoices','Medio');$('guidedModal').classList.add('open');setTimeout(()=>$('gTitle').focus(),80)}function closeGuided(){$('guidedModal').classList.remove('open')}function continueGuided(){const title=$('gTitle').value.trim();if(!title){toast('Scrivi ciò che sta lasciando una traccia');return}closeGuided();openForm();$('title').value=title;$('type').value=choiceValue('gTypeChoices')||'Ricordo';$('eventSize').value=choiceValue('gSizeChoices')||'Medio';$('tags').value=$('gTags').value.trim();$('text').focus()}document.querySelectorAll('.choice').forEach(b=>b.addEventListener('click',()=>selectChoice(b.parentElement.id,b.dataset.value)));$('guidedBtn').addEventListener('click',openGuided);$('guidedCancel').addEventListener('click',closeGuided);$('guidedContinue').addEventListener('click',continueGuided);$('guidedModal').addEventListener('click',e=>{if(e.target===$('guidedModal'))closeGuided()});$('modeBtn').addEventListener('click',toggleMode);$('timelineRange').addEventListener('input',e=>setTimeline(e.target.value));$('timelineAll').addEventListener('click',()=>{state.timelineYear=null;updateTimelineBounds();$('timelineLabel').textContent='Tutto';updateStatus()});
$('enterBtn').addEventListener('click',enter);$('demoBtn').addEventListener('click',loadDemo);$('addBtn').addEventListener('click',()=>openForm());$('archiveAdd').addEventListener('click',()=>openForm());$('archiveBtn').addEventListener('click',()=>{renderFilters();renderList();openPanel('archive')});$('centerBtn').addEventListener('click',center);$('zoomIn').addEventListener('click',()=>state.targetZoom=Math.min(2.1,state.targetZoom+.18));$('zoomOut').addEventListener('click',()=>state.targetZoom=Math.max(.48,state.targetZoom-.18));$('clearSearch').addEventListener('click',()=>{$('searchInput').value='';state.query='';updateSearch();renderList();$('searchInput').focus()});$('searchInput').addEventListener('input',e=>{enter();state.query=e.target.value;updateSearch();renderList()});$('sortSelect').addEventListener('change',e=>{state.sort=e.target.value;renderList()});$('saveBtn').addEventListener('click',saveForm);$('cancelBtn').addEventListener('click',closeForm);$('modal').addEventListener('click',e=>{if(e.target===$('modal'))closeForm()});$('editBtn').addEventListener('click',()=>openForm(state.selected));$('deleteBtn').addEventListener('click',deleteSelected);$('focusBtn').addEventListener('click',focusSelected);$('addRelationBtn').addEventListener('click',addRelation);$('exportBtn').addEventListener('click',exportData);$('importBtn').addEventListener('click',()=>$('file').click());$('file').addEventListener('change',e=>{if(e.target.files[0])importData(e.target.files[0]);e.target.value=''});
canvas.addEventListener('pointerdown',e=>{enter();state.drag=true;state.lx=e.clientX;state.ly=e.clientY;state.moved=0});canvas.addEventListener('pointermove',e=>{if(!state.drag)return;const mx=e.clientX-state.lx,my=e.clientY-state.ly;state.moved+=Math.abs(mx)+Math.abs(my);if(state.mode==='deep'){state.targetRotY+=mx*.006;state.targetRotX=Math.max(-1.2,Math.min(1.2,state.targetRotX+my*.006))}else{state.targetX+=mx/state.zoom;state.targetY+=my/state.zoom}state.lx=e.clientX;state.ly=e.clientY});canvas.addEventListener('pointerup',e=>{if(!state.drag)return;state.drag=false;if(state.moved<12){let hit=null,best=Infinity;state.nodes.filter(visibleByTime).forEach(n=>{const p=nodePosition(n),factor=sizeScale[n.eventSize]||1,r=(16+n.intensity*.8)*factor*(p.depth||1),d=Math.hypot(e.clientX-p.x,e.clientY-p.y);if(d<r&&d<best){hit=n;best=d}});if(hit)showDetail(hit.id)}});canvas.addEventListener('pointercancel',()=>state.drag=false);
renderFilters();renderList();updateSearch();updateTimelineBounds();updateModeUI();updateStatus();if('serviceWorker'in navigator){addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(()=>{}))}
const showcaseScript=document.createElement('script');showcaseScript.src='./showcase.js';showcaseScript.defer=true;document.body.appendChild(showcaseScript);
