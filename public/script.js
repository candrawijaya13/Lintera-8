/**
 * LINTERA (Lingkaran Interaktif untuk Matematika)
 * Vanilla JavaScript untuk Welcome Page & Dashboard LINTERA
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Containers & Views
  const viewLanding = document.getElementById('view-landing');
  const viewDashboard = document.getElementById('view-dashboard');
  const orientationOverlay = document.getElementById('orientation-overlay');

  // Landing Page Buttons
  const btnExplore = document.getElementById('btn-explore');
  const btnMenuToggle = document.getElementById('btn-menu-toggle');
  const navDrawer = document.getElementById('nav-drawer');
  const drawerClose = document.getElementById('drawer-close');

  // Dashboard Buttons
  const btnDashBack = document.getElementById('btn-dash-back');
  const btnDashInfo = document.getElementById('btn-dash-info');

  // Modals
  const modalTentang = document.getElementById('modal-tentang');
  const modalFitur = document.getElementById('modal-fitur');
  const modalKontak = document.getElementById('modal-kontak');
  const modalDashInfo = document.getElementById('modal-dash-info');
  const modalMateri = document.getElementById('modal-materi');
  const modalGame = document.getElementById('modal-game');
  const modalSimulasi = document.getElementById('modal-simulasi');
  const modalLatihan = document.getElementById('modal-latihan');
  const modalRefleksi = document.getElementById('modal-refleksi');

  // 2. Navigation Flow: Landing <-> Dashboard
  function showDashboard() {
    if (viewLanding && viewDashboard) {
      viewLanding.style.display = 'none';
      viewDashboard.style.display = 'flex';
      window.scrollTo(0, 0);
    }
  }

  function showLanding() {
    if (viewLanding && viewDashboard) {
      viewDashboard.style.display = 'none';
      viewLanding.style.display = 'flex';
      window.scrollTo(0, 0);
    }
  }

  if (btnExplore) {
    btnExplore.addEventListener('click', (e) => {
      e.preventDefault();
      showDashboard();
    });
  }

  if (btnDashBack) {
    btnDashBack.addEventListener('click', (e) => {
      e.preventDefault();
      showLanding();
    });
  }

  // 3. Orientation Detection (Landscape Recommendation on mobile portrait)
  function checkDeviceOrientation() {
    if (!orientationOverlay) return;

    const isPortrait = window.innerHeight > window.innerWidth;
    const isMobile =
      window.innerWidth <= 900 ||
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    if (isPortrait && isMobile) {
      orientationOverlay.style.display = 'flex';
    } else {
      orientationOverlay.style.display = 'none';
    }
  }

  checkDeviceOrientation();
  window.addEventListener('resize', checkDeviceOrientation);
  window.addEventListener('orientationchange', checkDeviceOrientation);

  // 4. Drawer & Modal Helpers
  function openModal(modal) {
    if (modal) modal.classList.add('active');
  }

  function closeModal(modal) {
    if (modal) modal.classList.remove('active');
  }

  // Bind close buttons in modals
  document.querySelectorAll('.modal-backdrop').forEach((backdrop) => {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) {
        backdrop.classList.remove('active');
      }
    });

    const closeBtn = backdrop.querySelector('.modal-btn-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        backdrop.classList.remove('active');
      });
    }

    const actionBtn = backdrop.querySelector('.btn-secondary');
    if (actionBtn) {
      actionBtn.addEventListener('click', () => {
        backdrop.classList.remove('active');
      });
    }
  });

  // Drawer Toggle
  if (btnMenuToggle && navDrawer) {
    btnMenuToggle.addEventListener('click', () => {
      navDrawer.classList.toggle('active');
    });
  }

  if (drawerClose && navDrawer) {
    drawerClose.addEventListener('click', () => {
      navDrawer.classList.remove('active');
    });
  }

  // Landing Page Modal Bindings
  const linkTentang = document.getElementById('link-tentang');
  const linkFitur = document.getElementById('link-fitur');
  const linkKontak = document.getElementById('link-kontak');

  const drawerTentang = document.getElementById('drawer-tentang');
  const drawerFitur = document.getElementById('drawer-fitur');
  const drawerKontak = document.getElementById('drawer-kontak');

  if (linkTentang) linkTentang.addEventListener('click', () => openModal(modalTentang));
  if (linkFitur) linkFitur.addEventListener('click', () => openModal(modalFitur));
  if (linkKontak) linkKontak.addEventListener('click', () => openModal(modalKontak));

  if (drawerTentang) {
    drawerTentang.addEventListener('click', () => {
      if (navDrawer) navDrawer.classList.remove('active');
      openModal(modalTentang);
    });
  }

  if (drawerFitur) {
    drawerFitur.addEventListener('click', () => {
      if (navDrawer) navDrawer.classList.remove('active');
      openModal(modalFitur);
    });
  }

  if (drawerKontak) {
    drawerKontak.addEventListener('click', () => {
      if (navDrawer) navDrawer.classList.remove('active');
      openModal(modalKontak);
    });
  }

  // Dashboard Info Modal
  if (btnDashInfo) {
    btnDashInfo.addEventListener('click', () => openModal(modalDashInfo));
  }

  // Dashboard 5 Card Bindings
  const cardMateri = document.getElementById('card-materi');
  const cardGame = document.getElementById('card-game');
  const cardSimulasi = document.getElementById('card-simulasi');
  const cardLatihan = document.getElementById('card-latihan');
  const cardRefleksi = document.getElementById('card-refleksi');

  if (cardMateri) cardMateri.addEventListener('click', () => openModal(modalMateri));
  if (cardGame) cardGame.addEventListener('click', () => openModal(modalGame));
  if (cardSimulasi) cardSimulasi.addEventListener('click', () => openModal(modalSimulasi));
  if (cardLatihan) cardLatihan.addEventListener('click', () => openModal(modalLatihan));
  if (cardRefleksi) cardRefleksi.addEventListener('click', () => openModal(modalRefleksi));

  // Kontak Form submit handler
  const contactForm = document.getElementById('contact-form');
  const contactSuccess = document.getElementById('contact-success');
  if (contactForm && contactSuccess) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      contactForm.style.display = 'none';
      contactSuccess.style.display = 'block';
    });
  }
});
