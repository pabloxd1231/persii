const filas = [5,5,3];
const productosContainer = document.querySelector('.productos-container');
let productoId = 1;

function cargarCarritoUsuario() {
  return JSON.parse(localStorage.getItem(nombreCarrito())) || [];
}

function guardarCarritoUsuario(carrito) {
  localStorage.setItem(nombreCarrito(), JSON.stringify(carrito));
}

// Renderizar productos
filas.forEach(cantidad => {
  const fila = document.createElement('div');
  fila.className = 'fila-productos';
  for(let i=0;i<cantidad;i++){
    const precio = (Math.random()*5).toFixed(2);
    const producto = document.createElement('div');
    producto.className = 'producto';
    producto.innerHTML = `
      <div class="foto"></div>
      <h3>Producto ${productoId}</h3>
      <p>Precio: $${precio}</p>
      <button>Agregar</button>
    `;
    const btn = producto.querySelector('button');
    btn.addEventListener('click', ()=>{
      let carrito = cargarCarritoUsuario();
      const prod = { id: productoId, nombre:`Producto ${productoId}`, precio: parseFloat(precio) };
      carrito.push(prod);
      guardarCarritoUsuario(carrito);
      alert(`${prod.nombre} agregado al carrito`);
    });
    fila.appendChild(producto);
    productoId++;
  }
  productosContainer.appendChild(fila);
});
