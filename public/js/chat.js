// public/js/chat.js
async function loadChatList(){
  // mostrar eventos con botón a chat
  const res = await fetch(`${API_BASE}/events`, { headers: V.headers() });
  const events = await res.json();
  let html = `<div class="p-4"><h2 class="text-xl font-bold mb-3">Chats por Evento</h2>`;
  events.forEach(ev=>{
    html += `<div class="p-3 border rounded mb-2 flex justify-between items-center">
      <div><div class="font-bold">${ev.title}</div><div class="text-sm">${ev.datetime||''}</div></div>
      <button onclick="navigate('chat',{ eventId: ${ev.id} })" class="px-3 py-1 bg-blue-600 text-white rounded">Abrir Chat</button>
    </div>`;
  });
  html += `</div>`;
  V.el.innerHTML = html;
}

async function loadChat(eventId){
  V.el.innerHTML = `<div class="p-4">Cargando chat...</div>`;
  const res = await fetch(`${API_BASE}/chat/event/${eventId}`, { headers: V.headers() });
  if (!res.ok) { V.el.innerHTML = 'Error'; return; }
  const msgs = await res.json();
  let html = `<div class="p-4 max-w-lg mx-auto"><h2 class="text-xl font-bold mb-3">Chat del evento</h2>`;
  html += `<div id="messages" class="space-y-2 mb-4">`;
  msgs.forEach(m=>{
    html += `<div class="p-2 border rounded"><div class="text-xs text-gray-500">${m.author ? m.author.name : 'Usuario' } - ${new Date(m.createdAt).toLocaleString()}</div>
      <div>${m.text || ''}</div>${m.imageUrl ? `<img src="${m.imageUrl}" class="w-32 mt-2 rounded" />` : ''}</div>`;
  });
  html += `</div>
    <div class="flex gap-2">
      <input id="chat_text" class="flex-grow p-2 border rounded" placeholder="Mensaje..." />
      <input id="chat_file" type="file" class="hidden" />
      <button onclick="sendMessage(${eventId})" class="px-3 py-2 bg-blue-600 text-white rounded">Enviar</button>
    </div>
  </div>`;
  V.el.innerHTML = html;
}

async function sendMessage(eventId){
  const text = document.getElementById('chat_text').value;
  const fileInput = document.getElementById('chat_file');
  const form = new FormData();
  form.append('text', text);
  if (fileInput && fileInput.files[0]) form.append('image', fileInput.files[0]);
  const res = await fetch(`${API_BASE}/chat/event/${eventId}`, { method:'POST', headers: { 'Authorization': 'Bearer ' + V.token() }, body: form });
  const data = await res.json();
  if (res.ok) {
    loadChat(eventId);
  } else {
    alert(data.error || 'Error');
  }
}
