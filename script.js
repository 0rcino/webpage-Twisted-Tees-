document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.menu_card').forEach((card) => {
        const priceElement = card.querySelector('.price');
        const sizeButtons = card.querySelectorAll('.menu_icon i');

        sizeButtons.forEach((button) => {
            button.addEventListener('click', () => {
                const newPrice = button.getAttribute('data-price');
                priceElement.textContent = newPrice;
            });
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

