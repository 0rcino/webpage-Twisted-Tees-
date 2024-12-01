<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
   
    $name = htmlspecialchars($_POST['name']);
    $address = htmlspecialchars($_POST['address']);
    $paymentMethod = htmlspecialchars($_POST['payment_method']);
    $cartItems = json_decode($_POST['cart_items'], true);

    $orderDetails = "Order Placed on: " . date('Y-m-d H:i:s') . "\n";
    $orderDetails .= "Name: $name\n";
    $orderDetails .= "Address: $address\n";
    $orderDetails .= "Payment Method: $paymentMethod\n";
    $orderDetails .= "Items:\n";

    $total = 0; 

    if (!empty($cartItems)) {
        foreach ($cartItems as $item) {
            $itemPrice = (int) str_replace('₱', '', $item['price']);
            $itemTotal = $itemPrice * $item['quantity'];
            $total += $itemTotal; 

            $orderDetails .= "- Product: " . $item['name'] . 
                ", Size: " . $item['size'] . 
                ", Quantity: " . $item['quantity'] . 
                ", Price per Item: ₱" . $itemPrice . 
                ", Total Price: ₱" . $itemTotal . "\n";
        }
    } else {
        $orderDetails .= "No items in the cart.\n";
    }

    $orderDetails .= "-----------------------------------\n";
    $orderDetails .= "Total Amount: ₱$total\n";
    $orderDetails .= "-----------------------------------\n";

    $file = 'orders.txt';
    file_put_contents($file, $orderDetails, FILE_APPEND);
    
    header('Location: confirmation.html');
    exit();
} else {
    echo "Invalid request.";
}
?>