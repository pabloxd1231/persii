// --- Variables ---
const loginBtn = document.getElementById('loginBtn');
const loginContainer = document.getElementById('loginContainer');
const mainContent = document.getElementById('mainContent');
const comprarBtn = document.getElementById('comprarBtn');
const volverBtn = document.getElementById('volverBtn');
const productosContainer = document.querySelector('.productos-container');
const carritoBtn = document.getElementById('carritoBtn');
const pagarBtn = document.getElementById('pagarBtn');
const carritoPanel = document.getElementById('carritoPanel');
const cerrarCarrito = document.getElementById('cerrarCarrito');
const carritoItemsDiv = document.querySelector('.carrito-items');
const carritoTotalSpan = document.getElementById('carritoTotal');
const promoInput = document.getElementById('promoInput');
const aplicarPromo = document.getElementById('aplicarPromo');

let usuario = "";
let carrito = [];
let descuento = 0;

// --- Promocodes ---
const promoCodes = {
  "PERSI10": 0.10,
  "FUEGO20": 0.20,
  "VIP30": 0.30
};

// --- Lista de productos (igual que antes, 13 fijos con fotos reales) ---
// --- Lista de productos personalizada ---
const productosData = [
  { id: 1, nombre: "Spofity", precio: 35.99, img: "https://cdn.discordapp.com/attachments/1420943010857746493/1421308846927773696/public-20.jpg?ex=68d89083&is=68d73f03&hm=ab2762e9e652484d3fc6553d64016a9304ec598f4b286c398eb357c93e700bcb&" },
  { id: 2, nombre: "ExitLag", precio: 49.90, img: "https://cdn.discordapp.com/attachments/1420943010857746493/1421308847271841872/public-11.jpg?ex=68d89083&is=68d73f03&hm=99a7a397d03a50411e6f60a2ca359a9097a207fa8a587b74695857dddcff8ea6&" },
  { id: 3, nombre: "Game Pass", precio: 25.50, img: "https://cdn.discordapp.com/attachments/1420943010857746493/1421308847947120801/public-12.jpg?ex=68d89083&is=68d73f03&hm=a2b2d73f01b5e8673f6758df8d4018a5640701eb1b7b7f4eb424e708354a1106&" },
  { id: 4, nombre: "DaZn+", precio: 75.00, img: "https://cdn.discordapp.com/attachments/1420943010857746493/1421308848316223539/IMG_20250908_035108.jpg?ex=68d89084&is=68d73f04&hm=6623b9961a5efeb5c6777254527a22ab2b1c4222d5d674101fe6dd27d57f9444&" },
  { id: 5, nombre: "Cap Cut pro", precio: 19.90, img: "https://cdn.discordapp.com/attachments/1420943010857746493/1421308848706424903/public-232.jpg?ex=68d89084&is=68d73f04&hm=3ec04c40e349f1c0830b83c8021f1fd6eedbfdb9e15f2b50b5838f751a4785f4&" },
  { id: 6, nombre: "Crunchyroll", precio: 39.99, img: "https://cdn.discordapp.com/attachments/1420943010857746493/1421308849327177758/public-282.jpg?ex=68d89084&is=68d73f04&hm=9139b1d521731959ab716a6d518e887ce7a97fddb41c91c142594ec51eb18ff4&" },
  { id: 7, nombre: "Hbo Max", precio: 59.00, img: "https://cdn.discordapp.com/attachments/1420943010857746493/1421308849666658324/public-252.jpg?ex=68d89084&is=68d73f04&hm=ac61595cc694cd342fd4cbc681f284400eca1d0aed25e0778a48b310457267d3&" },
  { id: 8, nombre: "Disney", precio: 120.00, img: "https://cdn.discordapp.com/attachments/1420943010857746493/1421308850191208448/public-242.jpg?ex=68d89084&is=68d73f04&hm=0cc7e5c95b1eae90847d5d3e3a0e3a00879f69034403a36fee57661b84b5cd2f&" },
  { id: 9, nombre: "TikTok", precio: 320.00, img: "https://cdn.discordapp.com/attachments/1420943010857746493/1421308850551914566/public-212.jpg?ex=68d89084&is=68d73f04&hm=2378c3bbfec29dba01b5e6eed9b205b09705f44f6f913899716ce7179bd99b1b&" },
  { id: 10, nombre: "Youtube Premium", precio: 8.50, img: "https://cdn.discordapp.com/attachments/1420943010857746493/1421308851021680672/public-182.jpg?ex=68d89084&is=68d73f04&hm=3f378f5810381f38fd32c91aa5234129c0249cc6e1555161439cd67113a5553a&" },
  { id: 11, nombre: "Netflix", precio: 199.90, img: "https://cdn.discordapp.com/attachments/1420943010857746493/1421308868033642526/public-192.jpg?ex=68d89088&is=68d73f08&hm=3858e2210e532ef21fc958dc4f2408ac95e3484b28fc57edeb3349eb74ebdd2b&" },
  { id: 12, nombre: "Spofity", precio: 89.00, img: "https://cdn.discordapp.com/attachments/1420943010857746493/1421308868419522632/public-202.jpg?ex=68d89088&is=68d73f08&hm=a850408c8865fbedea9836f0354e02c5947f6a03153f767f3ca62c4f9c006a85&" },
];


// --- Carrito ---
function nombreCarrito() {
  return usuario === 'p' ? 'carrito_p' : 'carrito_' + usuario;
}
function cargarCarrito() {
  carrito = JSON.parse(localStorage.getItem(nombreCarrito())) || [];
}
function guardarCarrito() {
  localStorage.setItem(nombreCarrito(), JSON.stringify(carrito));
}
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
  if (descuento > 0) {
    total = total - (total * descuento);
  }
  carritoTotalSpan.textContent = total.toFixed(2);
}

// --- Login ---
loginBtn.addEventListener('click', ()=>{
  const user = document.getElementById('username').value.trim().toLowerCase();
  if(user!==""){
    usuario = user;
    loginContainer.style.display = 'none';
    mainContent.style.display = 'flex';
    cargarCarrito();
  }
});

// --- Crear producto ---
function crearProducto(prod){
  const producto = document.createElement('div');
  producto.className = 'producto';
  producto.innerHTML = `
    <img src="${prod.img}" alt="${prod.nombre}" class="foto">
    <h3>${prod.nombre}</h3>
    <p>Precio: $${prod.precio.toFixed(2)}</p>
    <button>Agregar</button>
  `;
  const btn = producto.querySelector('button');
  btn.addEventListener('click', ()=>{
    cargarCarrito();
    carrito.push(prod);
    guardarCarrito();
    alert(`${prod.nombre} agregado al carrito`);
  });
  return producto;
}

// --- Render filas 5+5+3 ---
function renderProductos(){
  productosContainer.innerHTML = '';
  let index = 0;
  [5,5,3].forEach(cantidad => {
    const fila = document.createElement('div');
    fila.className = 'fila-productos';
    for (let i=0; i<cantidad; i++) {
      fila.appendChild(crearProducto(productosData[index]));
      index++;
    }
    productosContainer.appendChild(fila);
  });
}

// --- Eventos ---
comprarBtn.addEventListener('click', ()=>{
  mainContent.style.display = 'none';
  productosContainer.style.display = 'flex';
  volverBtn.style.display = 'block';
  renderProductos();
});
volverBtn.addEventListener('click', ()=>{
  productosContainer.style.display = 'none';
  volverBtn.style.display = 'none';
  mainContent.style.display = 'flex';
});
carritoBtn.addEventListener('click', ()=>{
  actualizarCarrito();
  carritoPanel.classList.add('active');
});
cerrarCarrito.addEventListener('click', ()=>{
  carritoPanel.classList.remove('active');
});
pagarBtn.addEventListener('click', ()=>{
  alert("Para pagar debe mandar una captura de su carrito.Total: $" + carrito.reduce((a,b)=>a+b.precio,0).toFixed(2));
});
aplicarPromo.addEventListener('click', ()=>{
  const code = promoInput.value.trim().toUpperCase();
  if (promoCodes[code]) {
    descuento = promoCodes[code];
    alert("Código aplicado: -" + (descuento*100) + "%");
  } else {
    descuento = 0;
    alert("Código inválido");
  }
  actualizarCarrito();
});

// --- Puntos de fondo ---
const background = document.getElementById('background');
for (let i=0; i<50; i++){
  const point = document.createElement('div');
  point.className = 'point';
  point.style.left = Math.random()*100 + "vw";
  point.style.animationDuration = (3 + Math.random()*5) + "s";
  point.style.animationDelay = (Math.random()*5) + "s";
  background.appendChild(point);
}

