document.addEventListener('DOMContentLoaded', () => {
    const cartItems = document.querySelector('.cart-items');
    const totalPriceElement = document.querySelector('.total-price');
    let total = 0;
    function updateTotal() {
        const prices = document.querySelectorAll('.price');
        total = 0;
        prices.forEach((price) => {
            const priceValue = parseInt(
                price.textContent.replace('₱', '').trim()
            );
            total += priceValue;
        });
        totalPriceElement.textContent = `₱${total}`;
    }
    if (cartItems) {
        cartItems.addEventListener('click', (e) => {
            if (
                e.target.classList.contains('increment') ||
                e.target.classList.contains('decrement')
            ) {
                const quantityElement =
                    e.target.parentElement.querySelector('span');
                const priceElement = e.target
                    .closest('.cart-item')
                    .querySelector('.price');
                const unitPrice = parseInt(
                    priceElement.getAttribute('data-unit-price')
                );
                let quantity = parseInt(quantityElement.textContent.trim());
                if (e.target.classList.contains('increment')) {
                    quantity++;
                } else if (
                    e.target.classList.contains('decrement') &&
                    quantity > 1
                ) {
                    quantity--;
                }
                quantityElement.textContent = quantity;
                priceElement.textContent = `₱${unitPrice * quantity}`;
                updateTotal();
            }
        });
    }

    updateTotal();
});
