document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.menu_card').forEach((card) => {
        const priceElement = card.querySelector('.price');
        const sizeButtons = card.querySelectorAll('.menu_icon i');

        // Update price when size is selected
        sizeButtons.forEach((button) => {
            button.addEventListener('click', () => {
                const newPrice = button.getAttribute('data-price');
                priceElement.textContent = newPrice;

                // Highlight selected size
                sizeButtons.forEach((btn) => btn.classList.remove('selected'));
                button.classList.add('selected');
            });
        });

        // Add to Cart button functionality
        const addToCartButton = card.querySelector('.cart_btn');
        addToCartButton.addEventListener('click', () => {
            const productName = card.querySelector('h2').textContent;
            const productImage = card.querySelector('img').src;
            const selectedSizeElement = card.querySelector(
                '.menu_icon i.selected'
            );
            const selectedSize = selectedSizeElement
                ? selectedSizeElement.getAttribute('data-size')
                : 'Default';
            const selectedPrice = selectedSizeElement
                ? selectedSizeElement.getAttribute('data-price')
                : priceElement.textContent;

            // Save product details to localStorage
            const cartItems =
                JSON.parse(localStorage.getItem('cartItems')) || [];
            cartItems.push({
                name: productName,
                size: selectedSize,
                price: selectedPrice,
                image: productImage,
                quantity: 1,
            });
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
        });
    });
});

const signUpButton = document.getElementById('signUpButton');
const signInButton = document.getElementById('signInButton');
const signInForm = document.getElementById('signIn');
const signUpForm = document.getElementById('signup');

signUpButton.addEventListener('click', function () {
    signInForm.style.display = 'none';
    signUpForm.style.display = 'block';
});

signInButton.addEventListener('click', function () {
    signUpForm.style.display = 'none';
    signInForm.style.display = 'block';
});

function validateSignUp() {
    const firstName = document.getElementById('fName').value.trim();
    const lastName = document.getElementById('lName').value.trim();
    const email = document.getElementById('signupEmail').value.trim();
    const password = document.getElementById('signupPassword').value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
        firstName === '' ||
        lastName === '' ||
        email === '' ||
        password === ''
    ) {
        alert('All fields are required.');
        return false;
    }

    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return false;
    }

    if (password.length < 6) {
        alert('Password must be at least 6 characters long.');
        return false;
    }

    return true;
}

function validateSignIn() {
    const email = document.getElementById('signinEmail').value.trim();
    const password = document.getElementById('signinPassword').value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email === '' || password === '') {
        alert('Both email and password are required.');
        return false;
    }

    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return false;
    }

    return true;
}
