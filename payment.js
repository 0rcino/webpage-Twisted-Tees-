document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('#payment-form');
    const productList = document.getElementById('product-list');
    const totalPriceElement = document.getElementById('total-price');
    const closeBtn = document.getElementById('close-btn');

    const buyNowItem = JSON.parse(localStorage.getItem('buyNowItem'));
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    let total = 0;

    if (buyNowItem) {
        const productElement = document.createElement('div');
        productElement.innerHTML = `
            <p><strong>Product:</strong> ${buyNowItem.name}</p>
            <p><strong>Size:</strong> ${buyNowItem.size}</p>
            <p><strong>Price:</strong> ${buyNowItem.price}</p>
            <hr>
        `;
        productList.appendChild(productElement);
        total = parseInt(buyNowItem.price.replace('₱', ''));
        totalPriceElement.textContent = `₱${total}`;
    } else if (cartItems.length > 0) {
        cartItems.forEach((item) => {
            const price = parseInt(item.price.replace('₱', '')) * item.quantity;
            const productElement = document.createElement('div');
            productElement.innerHTML = `
                <p><strong>Product:</strong> ${item.name}</p>
                <p><strong>Size:</strong> ${item.size}</p>
                <p><strong>Quantity:</strong> ${item.quantity}</p>
                <p><strong>Price:</strong> ₱${price}</p>
                <hr>
            `;
            productList.appendChild(productElement);
            total += price;
        });
        totalPriceElement.textContent = `₱${total}`;
    } else {
        productList.innerHTML = '<p>Your cart is empty.</p>';
        totalPriceElement.textContent = `₱0`;
    }

    form.addEventListener('submit', (event) => {
        const cartItemsInput = document.getElementById('cart-items');
        if (buyNowItem) {
            cartItemsInput.value = JSON.stringify([buyNowItem]);
        } else {
            cartItemsInput.value = JSON.stringify(cartItems);
        }

        localStorage.removeItem('buyNowItem');
        localStorage.removeItem('cartItems');
    });

    closeBtn.addEventListener('click', () => {
        const confirmExit = confirm(
            'Are you sure you want to exit? The payment details will be cleared.'
        );
        if (confirmExit) {
            localStorage.removeItem('buyNowItem');
            window.location.href = 'mainpage.html';
        }
    });
});
