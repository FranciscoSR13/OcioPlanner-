// public/js/auth.js
function loadLogin(){
  V.el.innerHTML = `
    <div class="p-6 max-w-md mx-auto">
      <h2 class="text-2xl font-bold mb-4">Iniciar sesión</h2>
      <input id="email" placeholder="Correo" class="w-full p-2 border mb-2 rounded"/>
      <input id="password" type="password" placeholder="Contraseña" class="w-full p-2 border mb-2 rounded"/>
      <button onclick="doLogin()" class="w-full bg-blue-600 text-white p-2 rounded">Entrar</button>
      <div class="mt-3 text-sm">¿No tienes cuenta? <a href="#" onclick="navigate('register')" class="text-blue-600">Regístrate</a></div>
    </div>
  `;
}

function loadRegister(){
  V.el.innerHTML = `
    <div class="p-6 max-w-md mx-auto">
      <h2 class="text-2xl font-bold mb-4">Registro</h2>
      <input id="rname" placeholder="Nombre" class="w-full p-2 border mb-2 rounded"/>
      <input id="remail" placeholder="Correo" class="w-full p-2 border mb-2 rounded"/>
      <input id="rpassword" type="password" placeholder="Contraseña" class="w-full p-2 border mb-2 rounded"/>
      <button onclick="doRegister()" class="w-full bg-green-600 text-white p-2 rounded">Crear cuenta</button>
      <div class="mt-3 text-sm">¿Ya tienes cuenta? <a href="#" onclick="navigate('login')" class="text-blue-600">Entrar</a></div>
    </div>
  `;
}

async function doLogin(){
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const res = await fetch(`${API_BASE}/auth/login`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ email, password })});
  const data = await res.json();
  if (res.ok) {
    V.setToken(data.token);
    renderNav(data.user);
    navigate('dashboard');
  } else {
    alert(data.error || 'Error');
  }
}

async function doRegister(){
  const name = document.getElementById('rname').value;
  const email = document.getElementById('remail').value;
  const password = document.getElementById('rpassword').value;
  const res = await fetch(`${API_BASE}/auth/register`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ name, email, password })});
  const data = await res.json();
  if (res.ok) {
    V.setToken(data.token);
    renderNav(data.user);
    navigate('dashboard');
  } else {
    alert(data.error || 'Error');
  }
}
