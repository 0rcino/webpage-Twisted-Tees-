document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('#payment-form');
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const productList = document.getElementById('product-list');
    const totalPriceElement = document.getElementById('total-price');

    let total = 0;

    cartItems.forEach((item) => {
        const productElement = document.createElement('div');
        productElement.innerHTML = `
            <p><strong>Product:</strong> ${item.name}</p>
            <p><strong>Quantity:</strong> ${item.quantity}</p>
            <p><strong>Price:</strong> ₱${
                parseInt(item.price.replace('₱', '')) * item.quantity
            }</p>
            <hr>
        `;
        productList.appendChild(productElement);

        total += parseInt(item.price.replace('₱', '')) * item.quantity;
    });

    totalPriceElement.textContent = `₱${total}`;

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const address = document.getElementById('address').value;
        const paymentMethod = document.getElementById('payment-method').value;

        alert(
            `Your order has been placed!\nName: ${name}\nAddress: ${address}\nPayment Method: ${paymentMethod}`
        );
        localStorage.removeItem('cartItems');
        localStorage.removeItem('totalPrice');
        window.location.href = 'confirmation.html';
    });
});
