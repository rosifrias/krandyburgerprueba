let cart = [];
let total = 0;

function addToCart(item, precio) {
    cart.push({ item, precio });
    total += precio;
    guardarCarrito();
    renderCarrito();
    actualizarBotonPedido();
}

function removeFromCart(index) {
    total -= cart[index].precio;
    cart.splice(index, 1);
    guardarCarrito();
    renderCarrito();
    actualizarBotonPedido();
}

function renderCarrito() {
    const carritoElemento = document.getElementById('cart');
    carritoElemento.innerHTML = '';
    cart.forEach((producto, index) => {
        const li = document.createElement('li');
        li.classList.add('cart-item');

        const span = document.createElement('span');
        span.textContent = `${producto.item} - $${formatearPrecio(producto.precio)}`;
        span.classList.add('product-details');

        const botonEliminar = document.createElement('button');
        botonEliminar.textContent = 'Eliminar';
        botonEliminar.classList.add('button-remove');
        botonEliminar.onclick = () => {
            removeFromCart(index);
        };

        li.appendChild(span);
        li.appendChild(botonEliminar);
        carritoElemento.appendChild(li);
    });
    document.getElementById('total').textContent = `$${formatearPrecio(total)}`;
}

function formatearPrecio(precio) {
    return precio.toFixed(2);
}

function guardarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(cart));
    localStorage.setItem('total', total);
}

function cargarCarrito() {
    const carritoGuardado = JSON.parse(localStorage.getItem('carrito'));
    if (carritoGuardado) {
        cart = carritoGuardado;
        total = parseFloat(localStorage.getItem('total'));
        renderCarrito();
        actualizarBotonPedido();
    }
}

function actualizarBotonPedido() {
    const botonEnviarPedido = document.getElementById('sendOrder');
    if (cart.length === 0) {
        botonEnviarPedido.disabled = true;
    } else {
        botonEnviarPedido.disabled = false;
    }
}

document.getElementById('sendOrder').addEventListener('click', () => {
    if (cart.length === 0) return; // Evitar enviar un pedido vacío
    const numeroTelefono = '56954381023';
    let textoPedido = 'Hola, quiero hacer el siguiente pedido:\n';
    cart.forEach(producto => {
        textoPedido += `${producto.item} - $${formatearPrecio(producto.precio)}\n`;
    });
    textoPedido += `Total: $${formatearPrecio(total)}`;
    const textoCodificado = encodeURIComponent(textoPedido);
    const urlWhatsApp = `https://wa.me/${numeroTelefono}?text=${textoCodificado}`;
    window.open(urlWhatsApp, '_blank');
});

// Cargar el carrito cuando la página se cargue
window.onload = cargarCarrito;