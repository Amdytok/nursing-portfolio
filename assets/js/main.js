function showPage(e, pageId) {
  document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));

  const page = document.getElementById(pageId);
  if (page) page.classList.add('active');

  const btn = e && e.currentTarget ? e.currentTarget : null;
  if (btn) {
    btn.classList.add('active');

    // On mobile screens, scroll the active tab into view
    if (window.matchMedia('(max-width: 768px)').matches) {
      btn.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  }

  // Reset scroll position when changing pages
  window.scrollTo(0, 0);
}

window.addEventListener('DOMContentLoaded', () => {
  const activeBtn = document.querySelector('.tab-btn.active');
  // Ensure the initially active tab is visible on mobile
  if (activeBtn && window.matchMedia('(max-width: 768px)').matches) {
    activeBtn.scrollIntoView({ behavior: 'auto', inline: 'center', block: 'nearest' });
  }
});
