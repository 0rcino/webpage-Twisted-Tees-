document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.querySelector('.cart-items');
    const totalPriceElement = document.querySelector('.total-price');
    const closeCartBtn = document.getElementById('close-cart-btn');
    let total = 0;

    // Function to load cart items from localStorage
    function loadCartItems() {
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        cartItemsContainer.innerHTML = '';
        total = 0;

        cartItems.forEach((item, index) => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
        <div class="product-info">
          <img src="${item.image}" alt="${item.name}">
          <div>
            <h2>${item.name}</h2>
            <p>Type: ${item.type}</p>
          </div>
        </div>
        <div class="quantity">
          <button class="decrement" data-index="${index}">-</button>
          <span>${item.quantity}</span>
          <button class="increment" data-index="${index}">+</button>
        </div>
        <div class="price" data-unit-price="${parseInt(
            item.price.replace('₱', '')
        )}">
          ₱${parseInt(item.price.replace('₱', '')) * item.quantity}
        </div>
        <button class="delete" data-index="${index}">Delete</button>
      `;
            cartItemsContainer.appendChild(cartItem);
            total += parseInt(item.price.replace('₱', '')) * item.quantity;
        });

        totalPriceElement.textContent = `₱${total}`;
    }

    // Function to update the total price
    function updateTotal() {
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        total = 0;

        cartItems.forEach((item) => {
            total += parseInt(item.price.replace('₱', '')) * item.quantity;
        });
        totalPriceElement.textContent = `₱${total}`;
    }

    // Event listener for increment, decrement, and delete actions
    cartItemsContainer.addEventListener('click', (e) => {
        const button = e.target;
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        const index = button.dataset.index;

        if (button.classList.contains('increment')) {
            cartItems[index].quantity++;
        } else if (button.classList.contains('decrement')) {
            if (cartItems[index].quantity > 1) {
                cartItems[index].quantity--;
            }
        } else if (button.classList.contains('delete')) {
            cartItems.splice(index, 1);
        }

        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        loadCartItems();
        updateTotal();
    });

    // Event listener for closing the cart and redirecting
    closeCartBtn.addEventListener('click', () => {
        window.location.href = 'mainpage.html';
    });

    // Initial load of cart items
    loadCartItems();
});
