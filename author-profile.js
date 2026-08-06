(() => {
  'use strict';

  const seaCredit = document.querySelector('#hero .sea');
  if (!seaCredit || document.getElementById('creatorProfileBtn')) return;

  const button = document.createElement('button');
  button.id = 'creatorProfileBtn';
  button.type = 'button';
  button.className = 'creator-signature';
  button.textContent = 'Un’idea di Andrea R.';
  button.setAttribute('aria-haspopup', 'dialog');
  button.setAttribute('aria-controls', 'creatorProfileModal');
  seaCredit.insertAdjacentElement('afterend', button);

  const modal = document.createElement('div');
  modal.id = 'creatorProfileModal';
  modal.className = 'creator-profile-modal';
  modal.setAttribute('aria-hidden', 'true');
  modal.innerHTML = `
    <section class="creator-profile-card" role="dialog" aria-modal="true" aria-labelledby="creatorProfileTitle">
      <button class="creator-profile-close" type="button" aria-label="Chiudi profilo">×</button>
      <div class="creator-profile-kicker">Ideatore di Aevum Core</div>
      <h2 id="creatorProfileTitle">Andrea R.</h2>
      <p>Laureato in Scienze Biomediche, professionista nella vendita e allenatore di pallanuoto. Appassionato di intelligenza artificiale, neuroscienze e psicologia, esplora come memoria, emozioni e relazioni possano diventare uno spazio visivo e vivo.</p>
      <div class="creator-profile-footer">Andrea R. / Sea Eris</div>
    </section>`;
  document.body.appendChild(modal);

  const style = document.createElement('style');
  style.textContent = `
    .creator-signature{display:block;margin:7px auto 15px;padding:4px 8px;border:0;background:transparent;color:#bfb4ca;font:italic 15px Georgia,serif;letter-spacing:.01em;cursor:pointer;text-decoration:underline;text-decoration-color:rgba(201,180,255,.28);text-underline-offset:5px;-webkit-tap-highlight-color:transparent}
    .creator-signature:hover,.creator-signature:focus-visible{color:#f0e8f7;text-decoration-color:rgba(201,180,255,.75);outline:none}
    .creator-profile-modal{position:fixed;inset:0;z-index:80;display:grid;place-items:center;padding:18px;background:rgba(0,0,0,.72);backdrop-filter:blur(14px);opacity:0;visibility:hidden;transition:.22s}
    .creator-profile-modal.open{opacity:1;visibility:visible}
    .creator-profile-card{position:relative;width:min(510px,100%);padding:28px 25px 24px;border:1px solid rgba(255,255,255,.14);border-radius:26px;background:linear-gradient(145deg,rgba(18,20,32,.98),rgba(7,8,15,.98));box-shadow:0 28px 90px rgba(0,0,0,.58);text-align:left}
    .creator-profile-kicker{color:#c9b4ff;font-size:10px;letter-spacing:.22em;text-transform:uppercase}
    .creator-profile-card h2{margin:9px 0 13px;color:#f5f1e9;font:400 42px/1 Georgia,serif}
    .creator-profile-card p{margin:0;color:#c1bac7;font-size:15px;line-height:1.7}
    .creator-profile-footer{margin-top:19px;padding-top:15px;border-top:1px solid rgba(255,255,255,.1);color:#8f8996;font-size:11px;letter-spacing:.12em;text-transform:uppercase}
    .creator-profile-close{position:absolute;top:12px;right:12px;width:48px;height:48px;border:1px solid rgba(255,255,255,.12);border-radius:50%;background:rgba(255,255,255,.04);color:#fff;font-size:28px;line-height:1;cursor:pointer}
    @media(max-width:700px){.creator-signature{margin-top:5px;margin-bottom:12px;font-size:14px}.creator-profile-card{padding:25px 21px 22px}.creator-profile-card h2{font-size:36px}.creator-profile-card p{font-size:14px}}
  `;
  document.head.appendChild(style);

  const close = modal.querySelector('.creator-profile-close');
  const openProfile = () => {
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    setTimeout(() => close.focus(), 30);
  };
  const closeProfile = () => {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    button.focus();
  };

  button.addEventListener('click', openProfile);
  close.addEventListener('click', closeProfile);
  modal.addEventListener('click', event => {
    if (event.target === modal) closeProfile();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && modal.classList.contains('open')) closeProfile();
  });
})();
