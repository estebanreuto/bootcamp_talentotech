function getProductImage(productName) {
    const images = {
        'HTML y CSS': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQETI89dJCuUtbddIXzisr0heIKm8GrKvTpyA&s',
        'Python': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtdRsbNblY-trvVBgVFHyP_g2Lrz9dLP3k7Q&s',
        'JavaScript': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS12SMucV1yoXW-nEEb70ZXugC-RC7VM43xFg&s'
    };
    return images[productName] || './assets/placeholder.png';
}

function getProductDescription(productName) {
    const descriptions = {
        'HTML y CSS': 'Aprende a diseñar y estructurar páginas web de manera profesional.',
        'Python': 'Domina uno de los lenguajes de programación más versátiles.',
        'JavaScript': 'Descubre cómo dar interactividad y dinamismo a tus proyectos web.'
    };
    return descriptions[productName] || 'Curso de programación';
}

function renderCart() {
    const cartContainer = document.getElementById('cart');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cartContainer.innerHTML = '';

    if (cart.length === 0) {
        cartContainer.innerHTML = '<p style="color: white; text-align: center;">El carrito está vacío.</p>';
        updateTotal(0);
        return;
    }

    let total = 0;
    cart.forEach((item, index) => {
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.innerHTML = `
            <img src="${getProductImage(item.name)}" alt="${item.name}">
            <div class="cart-item-details">
                <h3>${item.name}</h3>
                <p>${getProductDescription(item.name)}</p>
                <p>Precio: $${item.price}</p>
            </div>
            <button class="remove-btn" onclick="removeItem(${index})">
                <i class="fas fa-trash"></i> Eliminar
            </button>
        `;
        cartContainer.appendChild(itemElement);
        total += parseFloat(item.price);
    });

    updateTotal(total);
}

function removeItem(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
}

function updateTotal(total) {
    document.getElementById('total').textContent = total.toFixed(2);
}

// Initial render
document.addEventListener('DOMContentLoaded', renderCart);