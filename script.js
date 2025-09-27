// Login
const loginBtn = document.getElementById('loginBtn');
const loginContainer = document.getElementById('loginContainer');
const mainContent = document.getElementById('mainContent');
let usuario = "";

loginBtn.addEventListener('click', ()=>{
  const user = document.getElementById('username').value.trim();
  if(user !== ""){
    usuario = user.toLowerCase(); // para estandarizar
    loginContainer.style.display = 'none';
    mainContent.style.display = 'flex';
    cargarCarrito();
  }
});

// Nombre de carrito según usuario
function nombreCarrito() {
  if(usuario === 'p') return 'carrito_p';
  else return 'carrito_' + usuario;
}

// Inicializar carrito del usuario
let carrito = [];
function cargarCarrito() {
  carrito = JSON.parse(localStorage.getItem(nombreCarrito())) || [];
}

// Guardar carrito
function guardarCarrito() {
  localStorage.setItem(nombreCarrito(), JSON.stringify(carrito));
}

// Carrito lateral
const carritoBtn = document.getElementById('carritoBtn');
const carritoPanel = document.getElementById('carritoPanel');
const cerrarCarrito = document.getElementById('cerrarCarrito');
const carritoItemsDiv = document.querySelector('.carrito-items');
const carritoTotalSpan = document.getElementById('carritoTotal');

function actualizarCarrito(){
  cargarCarrito();
  carritoItemsDiv.innerHTML = '';
  let total = 0;
  carrito.forEach((item,index)=>{
    const div = document.createElement('div');
    div.className = 'carrito-item';
    div.innerHTML = `
      <div class="nombre">${item.nombre}</div>
      <div class="precio">$${item.precio.toFixed(2)}</div>
      <button class="eliminar">X</button>
    `;
    div.querySelector('.eliminar').addEventListener('click', ()=>{
      carrito.splice(index,1);
      guardarCarrito();
      actualizarCarrito();
    });
    carritoItemsDiv.appendChild(div);
    total += item.precio;
  });
  carritoTotalSpan.textContent = total.toFixed(2);
}

// Abrir carrito
carritoBtn.addEventListener('click', ()=>{
  actualizarCarrito();
  carritoPanel.classList.add('active');
});

// Cerrar carrito
cerrarCarrito.addEventListener('click', ()=>{
  carritoPanel.classList.remove('active');
});
