// public/js/dashboard.js
async function loadDashboard(){
  V.el.innerHTML = `<div class="p-4">Cargando...</div>`;
  const res = await fetch(`${API_BASE}/events`, { headers: V.headers() });
  if (!res.ok) { V.el.innerHTML = '<div class="p-4 text-red-500">Error al cargar eventos</div>'; return; }
  const events = await res.json();
  // render
  let html = `<div class="p-4"><h2 class="text-xl font-bold mb-4">Próximos Eventos</h2>`;
  html += `<div class="grid gap-3">`;
  events.forEach(ev=>{
    html += `
      <div class="p-3 border rounded shadow-sm">
        <div class="flex justify-between items-center">
          <div>
            <div class="font-bold">${ev.title}</div>
            <div class="text-sm text-gray-600">${ev.datetime || ''} — ${ev.location || ''}</div>
          </div>
          <div class="flex flex-col gap-2">
            <button onclick="navigate('voting',{ eventId: ${ev.id} })" class="px-2 py-1 bg-blue-500 text-white rounded">Votar</button>
            <button onclick="navigate('chat',{ eventId: ${ev.id} })" class="px-2 py-1 bg-gray-200 rounded">Chat</button>
          </div>
        </div>
      </div>
    `;
  });
  html += `</div></div>`;
  V.el.innerHTML = html;
}
