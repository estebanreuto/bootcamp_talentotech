document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.getElementById("hamburger");
    const menu = document.getElementById("menu");

    hamburger.addEventListener("click", () => {
        menu.classList.toggle("active");
    });
});

function agregarAlCarrito(producto, precio) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito.push({ producto, precio });
    localStorage.setItem('carrito', JSON.stringify(carrito));
    alert(`Se añadió el curso de  ${producto} al carrito`);
}

// Función para actualizar el carrito y mostrarlo en pantalla
function actualizarCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const contenedorCarrito = document.getElementById('cart');
    const contenedorTotal = document.getElementById('total');

    contenedorCarrito.innerHTML = ''; // Limpiar contenido previo
    if (carrito.length === 0) {
        contenedorCarrito.innerHTML = '<p>El carrito está vacío.</p>';
        contenedorTotal.textContent = '0';
    } else {
        let total = 0;
        carrito.forEach((objeto, index) => {
            const elementoProducto = document.createElement('div');
            elementoProducto.innerHTML = `
                <span>${objeto.producto} - ${objeto.precio}</span>
                <button onclick="eliminarDelCarrito(${index})">Eliminar</button>
            `;
            contenedorCarrito.appendChild(elementoProducto);
            total += parseFloat(objeto.precio);
        });
        contenedorTotal.textContent = total.toFixed(2); // Formatear total a 2 decimales
    }
}

// Función para eliminar un producto específico del carrito
function eliminarDelCarrito(index) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito.splice(index, 1); // Eliminar el producto por índice
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarCarrito(); // Actualizar la vista del carrito
}

// Mostrar el carrito al cargar la página carrito.html
if (window.location.pathname.includes('carrito.html')) {
    document.addEventListener('DOMContentLoaded', actualizarCarrito);
}
