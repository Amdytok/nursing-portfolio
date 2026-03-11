function setActiveTab(pageId, btn) {
  document.querySelectorAll('.page').forEach((page) => {
    const isActive = page.id === pageId;
    page.classList.toggle('active', isActive);
  });

  document.querySelectorAll('.tab-btn').forEach((tabBtn) => {
    const isSelected = tabBtn === btn;
    tabBtn.classList.toggle('active', isSelected);
    tabBtn.setAttribute('aria-selected', String(isSelected));
  });
}

function showPage(e, pageId) {
  const btn = e && e.currentTarget ? e.currentTarget : document.querySelector(`.tab-btn[aria-controls="${pageId}"]`);

  if (!document.getElementById(pageId) || !btn) return;

  setActiveTab(pageId, btn);

  if (window.location.hash !== `#${pageId}`) {
    history.replaceState(null, '', `#${pageId}`);
  }

  if (window.matchMedia('(max-width: 768px)').matches) {
    btn.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  }

  window.scrollTo(0, 0);
}

window.addEventListener('DOMContentLoaded', () => {
  const yearElement = document.getElementById('current-year');
  if (yearElement) yearElement.textContent = String(new Date().getFullYear());

  const initialPage = window.location.hash ? window.location.hash.slice(1) : 'home';
  showPage(null, initialPage);
});
