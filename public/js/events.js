// public/js/events.js
function loadCreateEvent(){
  V.el.innerHTML = `
    <div class="p-4 max-w-lg mx-auto">
      <h2 class="text-xl font-bold mb-3">Crear Evento</h2>
      <input id="ev_title" placeholder="Nombre del evento" class="w-full p-2 border mb-2 rounded" />
      <textarea id="ev_desc" placeholder="Descripción" class="w-full p-2 border mb-2 rounded"></textarea>
      <input id="ev_datetime" placeholder="Fecha / Hora (ISO o texto)" class="w-full p-2 border mb-2 rounded" />
      <input id="ev_location" placeholder="Lugar" class="w-full p-2 border mb-2 rounded" />
      <div id="options-list" class="space-y-2 mb-2">
        <input class="opt p-2 border rounded w-full" placeholder="Opción 1"/>
      </div>
      <div class="flex gap-2 mb-4">
        <button onclick="addOptionField()" class="px-3 py-2 border rounded">+ Opción</button>
      </div>
      <button onclick="createEvent()" class="w-full bg-green-600 text-white p-2 rounded">Crear</button>
    </div>
  `;
}

function addOptionField(){
  const wrapper = document.getElementById('options-list');
  const input = document.createElement('input');
  input.className = 'opt p-2 border rounded w-full';
  input.placeholder = 'Nueva opción';
  wrapper.appendChild(input);
}

async function createEvent(){
  const title = document.getElementById('ev_title').value;
  const description = document.getElementById('ev_desc').value;
  const datetime = document.getElementById('ev_datetime').value;
  const location = document.getElementById('ev_location').value;
  const options = Array.from(document.querySelectorAll('.opt')).map(i=>i.value).filter(v=>v);
  const body = { title, description, datetime, location, options };
  const res = await fetch(`${API_BASE}/events`, { method:'POST', headers: V.headers(), body: JSON.stringify(body) });
  const data = await res.json();
  if (res.ok) {
    alert('Evento creado');
    navigate('dashboard');
  } else {
    alert(data.error || 'Error');
  }
}

// Voting view
async function loadVoting(eventId){
  V.el.innerHTML = `<div class="p-4">Cargando...</div>`;
  const res = await fetch(`${API_BASE}/events/${eventId}`, { headers: V.headers() });
  if (!res.ok) { V.el.innerHTML = '<div class="p-4 text-red-500">Evento no encontrado</div>'; return; }
  const ev = await res.json();
  let html = `<div class="p-4 max-w-lg mx-auto"><h2 class="text-xl font-bold mb-2">${ev.title}</h2><div>${ev.description || ''}</div><div class="mt-4">`;
  ev.options.forEach(opt=>{
    html += `
      <div class="p-3 border rounded mb-2 flex justify-between items-center">
        <div>${opt.text}</div>
        <div><button onclick="voteOption(${opt.id}, ${eventId})" class="px-3 py-1 bg-blue-600 text-white rounded">Votar</button></div>
      </div>
    `;
  });
  html += `<button onclick="loadVotingResults(${eventId})" class="mt-3 px-3 py-2 bg-gray-200 rounded">Ver resultados</button>`;
  html += `</div></div>`;
  V.el.innerHTML = html;
}

async function voteOption(optionId, eventId){
  const res = await fetch(`${API_BASE}/votes/${optionId}`, { method:'POST', headers: V.headers() });
  const data = await res.json();
  if (res.ok) {
    alert('Voto guardado');
    loadVotingResults(eventId);
  } else {
    alert(data.error || 'Error');
  }
}

async function loadVotingResults(eventId){
  const res = await fetch(`${API_BASE}/votes/event/${eventId}/results`);
  const data = await res.json();
  let html = `<div class="p-4 max-w-lg mx-auto"><h2 class="text-xl font-bold mb-3">Resultados</h2>`;
  data.forEach(r=>{
    const pct = (r.votes || 0);
    html += `<div class="mb-2"><div class="flex justify-between"><div>${r.text}</div><div>${r.votes}</div></div>
      <div class="w-full bg-gray-200 rounded h-2 mt-1"><div style="width:${Math.min(pct*10,100)}%" class="bg-blue-500 h-2 rounded"></div></div></div>`;
  });
  html += `<div class="mt-3"><button onclick="navigate('dashboard')" class="px-3 py-1 bg-blue-500 text-white rounded">Volver</button></div></div>`;
  V.el.innerHTML = html;
}
