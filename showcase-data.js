function loadDemo(){
  enter();
  if(state.nodes.length&&!confirm('Aggiungere la storia demo alle tracce già presenti?'))return;
  state.nodes=state.nodes.filter(n=>!String(n.id).startsWith('demo-'));
  state.connections=state.connections.filter(c=>!String(c.from).startsWith('demo-')&&!String(c.to).startsWith('demo-'));
  const demo=[
    {id:'demo-child-birth',title:'La nascita di mio figlio',text:'Il giorno in cui sono diventato padre. Il centro della vita ha cambiato posizione.',type:'Ricordo',emotion:'Amore',intensity:10,meaning:'Mi ha cambiato',date:'2024-04-14',eventSize:'Grande',tags:['figlio','famiglia','nascita','padre'],a:.18,r:145,z:-120},
    {id:'demo-father',title:'Imparare a essere padre',text:'Una nuova identità che cresce tra responsabilità, paura e meraviglia.',type:'Persona',emotion:'Speranza',intensity:9,meaning:'Mi ha formato',date:'2024-04-15',eventSize:'Grande',tags:['figlio','famiglia','padre','crescita'],a:.82,r:220,z:80},
    {id:'demo-bedtime',title:'La routine della buonanotte',text:'Una piccola abitudine quotidiana che col tempo diventa memoria condivisa.',type:'Routine',emotion:'Serenità',intensity:7,meaning:'Fa parte di me',date:'2026-07-20',eventSize:'Piccolo',tags:['figlio','famiglia','routine','sera'],a:1.55,r:300,z:-250},
    {id:'demo-work-city',title:'Il lavoro in città',text:'Responsabilità, crescita professionale e la sensazione di dover tenere insieme molti fili.',type:'Sfida',emotion:'Orgoglio',intensity:8,meaning:'Mi ha formato',date:'2025-01-20',eventSize:'Grande',tags:['lavoro','città','carriera','pressione'],a:2.18,r:260,z:160},
    {id:'demo-traffic',title:'Il traffico quotidiano',text:'Tempo perso, stanchezza e rientri più tardi del previsto.',type:'Routine',emotion:'Rabbia',intensity:7,meaning:'Mi ha insegnato',date:'2025-02-03',eventSize:'Medio',tags:['lavoro','traffico','pressione','tempo'],a:2.78,r:355,z:280},
    {id:'demo-bonus',title:'Un riconoscimento economico importante',text:'Il risultato concreto di un lavoro complesso e di una responsabilità sostenuta nel tempo.',type:'Obiettivo',emotion:'Orgoglio',intensity:8,meaning:'Mi ha insegnato',date:'2026-03-28',eventSize:'Medio',tags:['lavoro','successo','riconoscimento','futuro'],a:3.34,r:330,z:-80},
    {id:'demo-waterpolo',title:'Lo sport di squadra come parte di me',text:'Non soltanto sport: disciplina, identità, squadra e capacità di resistere.',type:'Persona',emotion:'Nostalgia',intensity:9,meaning:'Fa parte di me',date:'2024-09-02',eventSize:'Grande',tags:['sport','squadra','disciplina','identità'],a:3.92,r:245,z:-190},
    {id:'demo-team-win',title:'La vittoria della squadra',text:'Una vittoria costruita insieme, capace di restituire fiducia anche a chi guida il gruppo.',type:'Sfida',emotion:'Orgoglio',intensity:9,meaning:'Mi ha insegnato',date:'2026-05-17',eventSize:'Grande',tags:['sport','squadra','vittoria','fiducia'],a:4.48,r:315,z:130},
    {id:'demo-child-difficulty',title:'Una giornata difficile con mio figlio',text:'Stanchezza, incomprensione e il timore di non riuscire sempre a essere il padre che vorrei.',type:'Paura',emotion:'Tristezza',intensity:8,meaning:'Mi ha ferito',date:'2026-06-09',eventSize:'Medio',tags:['figlio','famiglia','pressione','difficoltà'],a:5.04,r:285,z:250},
    {id:'demo-couple-tension',title:'Una tensione di coppia',text:'Quando lavoro, stanchezza e responsabilità familiari arrivano nello stesso punto.',type:'Sfida',emotion:'Rabbia',intensity:7,meaning:'Mi ha insegnato',date:'2026-06-11',eventSize:'Medio',tags:['coppia','famiglia','pressione','lavoro'],a:5.56,r:345,z:-20},
    {id:'demo-future',title:'Il futuro che vorrei lasciare a mio figlio',text:'Uno spazio in cui possa ricordare da dove viene senza sentirsi definito dal passato.',type:'Sogno',emotion:'Speranza',intensity:10,meaning:'Mi chiama ancora',date:'2026-07-26',eventSize:'Grande',tags:['figlio','famiglia','futuro','sogno'],a:6.05,r:390,z:30}
  ].map(normalizeNode);
  state.nodes.push(...demo);
  const rels=[
    ['demo-child-birth','demo-father','Padre / figlio'],
    ['demo-father','demo-bedtime','È causa di'],
    ['demo-father','demo-child-difficulty','Contrasta con'],
    ['demo-child-difficulty','demo-couple-tension','È collegato a'],
    ['demo-work-city','demo-traffic','È causa di'],
    ['demo-work-city','demo-bonus','È causa di'],
    ['demo-traffic','demo-couple-tension','È conseguenza di'],
    ['demo-waterpolo','demo-team-win','È causa di'],
    ['demo-team-win','demo-father','Mi ha fatto crescere'],
    ['demo-child-birth','demo-future','Obiettivo nato da'],
    ['demo-bedtime','demo-future','Mi ha fatto crescere'],
    ['demo-bonus','demo-future','È collegato a']
  ];
  rels.forEach(([from,to,type])=>state.connections.push(normalizeConnection({from,to,type})));
  save();renderFilters();renderList();updateSearch();updateTimelineBounds();updateStatus();
  toast('Showcase pubblico caricato.');
  document.dispatchEvent(new CustomEvent('aevum:demo-loaded'));
}
