(() => {
  const current = document.getElementById('demoBtn');
  if (!current) return;
  const clean = current.cloneNode(true);
  current.replaceWith(clean);
  clean.addEventListener('click', () => loadDemo());
})();
