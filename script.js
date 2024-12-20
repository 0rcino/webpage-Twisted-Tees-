document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.menu_card').forEach((card) => {
        const priceElement = card.querySelector('.price');
        const typeButtons = card.querySelectorAll('.menu_icon i');
        const primaryImageContainer = card.querySelector('.menu_image.primary');
        const secondaryImageContainer = card.querySelector(
            '.menu_image.secondary'
        );
        const addToCartButton = card.querySelector('.cart_btn');
        const buyNowButton = card.querySelector('.menu_btn:not(.cart_btn)');

        typeButtons.forEach((button) => {
            button.addEventListener('click', () => {
                const newPrice = button.getAttribute('data-price');
                const newType = button.getAttribute('data-type');

                priceElement.textContent = `${newPrice}`;

                if (newType === 'Single') {
                    primaryImageContainer.style.display = 'block';
                    secondaryImageContainer.style.display = 'none';
                } else if (newType === 'Bouquet') {
                    primaryImageContainer.style.display = 'none';
                    secondaryImageContainer.style.display = 'block';
                }

                typeButtons.forEach((btn) => btn.classList.remove('selected'));
                button.classList.add('selected');
            });
        });

        addToCartButton.addEventListener('click', () => {
            const productName = card.querySelector('h2').textContent;
            const selectedTypeElement = card.querySelector(
                '.menu_icon i.selected'
            );
            const selectedType = selectedTypeElement
                ? selectedTypeElement.getAttribute('data-type')
                : 'Single';
            const selectedPrice = selectedTypeElement
                ? selectedTypeElement.getAttribute('data-price')
                : priceElement.textContent.replace('₱', '');
            const selectedImage =
                selectedType === 'Single'
                    ? primaryImageContainer.querySelector('img').src
                    : secondaryImageContainer.querySelector('img').src;

            const cartItems =
                JSON.parse(localStorage.getItem('cartItems')) || [];
            cartItems.push({
                name: productName,
                type: selectedType,
                price: selectedPrice,
                image: selectedImage,
                quantity: 1,
            });
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
        });

        buyNowButton.addEventListener('click', () => {
            const productName = card.querySelector('h2').textContent;
            const selectedTypeElement = card.querySelector(
                '.menu_icon i.selected'
            );
            const selectedType = selectedTypeElement
                ? selectedTypeElement.getAttribute('data-type')
                : 'Single';
            const selectedPrice = selectedTypeElement
                ? selectedTypeElement.getAttribute('data-price')
                : priceElement.textContent.replace('₱', '');
            const selectedImage =
                selectedType === 'Single'
                    ? primaryImageContainer.querySelector('img').src
                    : secondaryImageContainer.querySelector('img').src;

            const buyNowItem = {
                name: productName,
                type: selectedType,
                price: selectedPrice,
                image: selectedImage,
            };

            localStorage.setItem('buyNowItem', JSON.stringify(buyNowItem));
            window.location.href = 'payment.html';
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

function submitForm(event) {
    event.preventDefault();

    const formData = new FormData(document.getElementById('contactForm'));

    fetch('submit.php', {
        method: 'POST',
        body: formData,
    })
        .then((response) => response.text())
        .then((data) => {
            if (data.includes('Your message has been saved successfully!')) {
                document.getElementById('contactForm').reset();
                alert('Your message has been submitted successfully!');
            } else {
                alert('There was an error submitting your message.');
            }
        })
        .catch((error) => {
            alert('Error: ' + error);
        });
}

function closeForm() {
    window.location.href = 'mainpage.html';
}
