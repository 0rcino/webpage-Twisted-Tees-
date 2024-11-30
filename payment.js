const form = document.querySelector('#payment-form');

form.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent the default form submission

    // Get form data
    const name = document.getElementById('name').value;
    const address = document.getElementById('address').value;
    const paymentMethod = document.getElementById('payment-method').value;

    // Process the data (e.g., send to the server)
    console.log('Name:', name);
    console.log('Address:', address);
    console.log('Payment Method:', paymentMethod);

    // Display a confirmation message or redirect the user
    alert(
        `Your order has been placed!\nName: ${name}\nAddress: ${address}\nPayment Method: ${paymentMethod}`
    );
});
