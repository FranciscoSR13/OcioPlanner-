// public/js/app.js
/*
const V = {
  el: document.getElementById('view-container'),
  nav: document.getElementById('nav-placeholder'),
  token: () => localStorage.getItem('token'),
  setToken: (t) => localStorage.setItem('token', t),
  clearToken: () => localStorage.removeItem('token'),
  headers: function(){
    const h = { 'Content-Type': 'application/json' };
    const t = this.token();
    if (t) h['Authorization'] = 'Bearer ' + t;
    return h;
  }
};

// nav (visible tras login)
function renderNav(user){
  V.nav.innerHTML = `
    <div class="bg-blue-600 text-white p-3 flex justify-between items-center">
      <div class="font-bold">Planifícame</div>
      <div class="flex gap-2">
        <button onclick="navigate('dashboard')" class="px-2 py-1 bg-blue-500 rounded">Eventos</button>
        <button onclick="navigate('calendar')" class="px-2 py-1 rounded bg-blue-400">Calendario</button>
        <button onclick="navigate('create')" class="px-2 py-1 rounded bg-blue-400">Crear</button>
        <button onclick="navigate('chatList')" class="px-2 py-1 rounded bg-blue-400">Chat</button>
        <button onclick="navigate('profile')" class="px-2 py-1 rounded bg-blue-400">Perfil</button>
        <button onclick="logout()" class="px-2 py-1 bg-red-500 rounded">Salir</button>
      </div>
    </div>
  `;
}

// navegación simple
function navigate(page, opts = {}) {
  if (!V.token() && page !== 'login' && page !== 'register') {
    loadLogin();
    return;
  }
  if (page === 'login') return loadLogin();
  if (page === 'register') return loadRegister();
  if (page === 'dashboard') return loadDashboard();
  if (page === 'create') return loadCreateEvent();
  if (page === 'voting') return loadVoting(opts.eventId);
  if (page === 'calendar') return loadCalendar();
  if (page === 'chat') return loadChat(opts.eventId);
  if (page === 'chatList') return loadChatList();
  if (page === 'profile') return loadProfile();
}

// logout
function logout(){
  V.clearToken();
  V.nav.innerHTML = '';
  navigate('login');
}

// init
(async function init(){
  if (V.token()) {
    // obtener info de usuario
    try {
      const res = await fetch(`${API_BASE}/auth/me`, { headers: V.headers() });
      if (res.ok){
        const user = await res.json();
        renderNav(user);
        navigate('dashboard');
        return;
      } else {
        V.clearToken();
      }
    } catch(e){ V.clearToken(); }
  }
  navigate('login');
})();*/

// --- app.js ---
// Sistema de navegación SPA (Single Page Application)
const container = document.getElementById("view-container");

// Mapa de vistas disponibles
const views = [
  "login",
  "register",
  "dashboard",
  "createEvent",
  "voting",
  "calendar",
  "chat",
  "profile"
];

// Función para cargar una vista
async function loadView(view) {
  if (!views.includes(view)) view = "login"; // vista por defecto

  try {
    const res = await fetch(`/views/${view}.html`);
    const html = await res.text();
    container.innerHTML = html;
    window.location.hash = view; // actualiza la URL sin recargar
  } catch (err) {
    container.innerHTML = `<p class="text-red-500">Error al cargar la vista: ${view}</p>`;
  }
}

// Detectar cambios en el hash de la URL (ej: #dashboard)
window.addEventListener("hashchange", () => {
  const view = window.location.hash.replace("#", "");
  loadView(view);
});

// Cargar vista inicial
window.addEventListener("DOMContentLoaded", () => {
  const view = window.location.hash.replace("#", "") || "login";
  loadView(view);
});

