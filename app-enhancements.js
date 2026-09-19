const STYLE = `
.offline-status{position:fixed;top:10px;left:50%;transform:translateX(-50%);z-index:100;background:rgba(32,38,31,.94);color:#fff;padding:8px 14px;border-radius:999px;font:600 12px/1.3 system-ui,sans-serif;box-shadow:0 8px 24px rgba(0,0,0,.18)}
.app-install-banner{position:fixed;left:50%;bottom:16px;transform:translateX(-50%);width:min(92vw,540px);z-index:99;background:rgba(255,255,255,.97);color:#20261F;border:1px solid rgba(32,38,31,.12);border-radius:16px;box-shadow:0 16px 32px rgba(0,0,0,.16);font-family:system-ui,sans-serif}
.app-install-banner[hidden],.offline-status[hidden]{display:none}
.install-banner-content{display:flex;align-items:center;justify-content:space-between;gap:14px;padding:12px 14px}
.install-banner-content strong{display:block;font-size:14px}.install-banner-content small{display:block;color:#4B5548;font-size:11px;margin-top:2px}
.install-banner-button{background:#2F6F62;color:#fff;border:0;border-radius:10px;font-weight:700;padding:10px 16px;cursor:pointer}
.install-banner-button:hover{background:#1F4B41}
@media(max-width:860px){.offline-status{top:8px;width:calc(100% - 28px);left:14px;transform:none;text-align:center}.app-install-banner{left:9px;bottom:12px;transform:none;width:calc(100% - 18px)}.install-banner-content{align-items:stretch;flex-direction:column}.install-banner-button{width:100%}}
@media(prefers-reduced-motion:reduce){*,*::before,*::after{animation-duration:.01ms!important;transition-duration:.01ms!important;scroll-behavior:auto!important}}
`;

const style = document.createElement('style');
style.textContent = STYLE;
document.head.appendChild(style);

const offlineStatus = document.createElement('div');
offlineStatus.className = 'offline-status';
offlineStatus.setAttribute('role', 'status');
offlineStatus.setAttribute('aria-live', 'polite');
offlineStatus.hidden = true;
offlineStatus.textContent = 'Offline mode: cached lessons are available.';
document.body.appendChild(offlineStatus);

const installBanner = document.createElement('div');
installBanner.className = 'app-install-banner';
installBanner.hidden = true;
installBanner.innerHTML = '<div class="install-banner-content"><div><strong>Install Narration Master</strong><small>Keep your grammar course ready offline.</small></div><button class="install-banner-button" type="button">Install</button></div>';
document.body.appendChild(installBanner);

const installButton = installBanner.querySelector('button');
let deferredPrompt = null;

function updateConnectionState() {
  offlineStatus.hidden = navigator.onLine;
  document.body.classList.toggle('offline', !navigator.onLine);
}

function showView(name, jumpId) {
  const target = document.getElementById(`view-${name}`);
  if (!target) return;
  document.querySelectorAll('.view').forEach((view) => view.classList.remove('active'));
  target.classList.add('active');
  document.querySelectorAll('.navitem').forEach((item) => item.classList.remove('active'));
  document.querySelectorAll(`.navitem[data-view="${name}"]`).forEach((item) => {
    if (!jumpId || item.dataset.jump === jumpId) item.classList.add('active');
  });
  document.getElementById('sidebar')?.classList.remove('open');
  window.scrollTo({ top: 0, behavior: 'smooth' });
  if (name === 'rules' && jumpId) {
    setTimeout(() => document.getElementById(`rule-${jumpId}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80);
  }
}

function bindExistingControls() {
  document.querySelectorAll('[data-view]').forEach((element) => {
    if (element.dataset.enhancementBound) return;
    element.dataset.enhancementBound = 'true';
    element.addEventListener('click', () => showView(element.dataset.view, element.dataset.jump));
  });

  document.getElementById('menuToggle')?.addEventListener('click', () => {
    document.getElementById('sidebar')?.classList.toggle('open');
  });

  const btnEn = document.getElementById('btnEn');
  const btnBn = document.getElementById('btnBn');
  const setLang = (lang) => {
    document.body.classList.toggle('lang-en', lang === 'en');
    document.body.classList.toggle('lang-bn', lang === 'bn');
    btnEn?.classList.toggle('on', lang === 'en');
    btnBn?.classList.toggle('on', lang === 'bn');
    try { localStorage.setItem('narr_lang', lang); } catch (_) {}
  };
  btnEn?.addEventListener('click', () => setLang('en'));
  btnBn?.addEventListener('click', () => setLang('bn'));

  document.getElementById('themeToggle')?.addEventListener('click', () => {
    const root = document.documentElement;
    const current = root.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('narr_theme', next); } catch (_) {}
  });

  try {
    const lang = localStorage.getItem('narr_lang');
    if (lang === 'en' || lang === 'bn') setLang(lang);
    const theme = localStorage.getItem('narr_theme');
    if (theme === 'dark' || theme === 'light') document.documentElement.setAttribute('data-theme', theme);
  } catch (_) {}
}

if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    try {
      const registration = await navigator.serviceWorker.register('./service-worker.js');
      registration.addEventListener('updatefound', () => {
        const worker = registration.installing;
        if (!worker) return;
        worker.addEventListener('statechange', () => {
          if (worker.state === 'installed' && navigator.serviceWorker.controller) {
            worker.postMessage({ type: 'SKIP_WAITING' });
          }
        });
      });
    } catch (error) {
      console.warn('Service worker registration failed:', error);
    }
  });
}

window.addEventListener('beforeinstallprompt', (event) => {
  event.preventDefault();
  deferredPrompt = event;
  installBanner.hidden = false;
});

installButton.addEventListener('click', async () => {
  if (!deferredPrompt) return;
  deferredPrompt.prompt();
  await deferredPrompt.userChoice;
  deferredPrompt = null;
  installBanner.hidden = true;
});

window.addEventListener('appinstalled', () => {
  installBanner.hidden = true;
  deferredPrompt = null;
});
window.addEventListener('online', updateConnectionState);
window.addEventListener('offline', updateConnectionState);

window.addEventListener('DOMContentLoaded', () => {
  bindExistingControls();
  updateConnectionState();
});
