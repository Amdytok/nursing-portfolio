async function urlExists(url) {
  try {
    let res = await fetch(url, { method: 'HEAD', cache: 'no-store' }).catch(() => null);
    if (!res || res.status === 405) {
      res = await fetch(url, { method: 'GET', cache: 'no-store' }).catch(() => null);
    }
    return !!(res && res.ok);
  } catch (e) {
    return false;
  }
}

async function resolveCandidateLinks() {
  const links = Array.from(document.querySelectorAll('[data-file-candidates]'));

  for (const a of links) {
    const candidates = (a.dataset.fileCandidates || '')
      .split('|')
      .map(s => s.trim())
      .filter(Boolean);

    let found = null;

    for (const name of candidates) {
      const url = encodeURI(name);
      if (await urlExists(url)) {
        found = url;
        break;
      }
    }

    if (found) {
      a.setAttribute('href', found);
      a.classList.remove('disabled');
      const status = a.querySelector('.status');
      if (status) status.textContent = 'PDF';
    } else {
      a.classList.add('disabled');
      const status = a.querySelector('.status');
      if (status) status.textContent = 'Missing';
    }
  }
}

function showPage(e, pageId) {
  document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));

  const page = document.getElementById(pageId);
  if (page) page.classList.add('active');

  const btn = e && e.currentTarget ? e.currentTarget : null;
  if (btn) {
    btn.classList.add('active');

    if (window.matchMedia('(max-width: 768px)').matches) {
      btn.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  }

  window.scrollTo(0, 0);
}

window.addEventListener('DOMContentLoaded', async () => {
  await resolveCandidateLinks();

  const activeBtn = document.querySelector('.tab-btn.active');
  if (activeBtn && window.matchMedia('(max-width: 768px)').matches) {
    activeBtn.scrollIntoView({ behavior: 'auto', inline: 'center', block: 'nearest' });
  }
});
