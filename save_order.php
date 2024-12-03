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
    $shippingFee = 100; 

    if (!empty($cartItems)) {
        foreach ($cartItems as $item) {
            $itemPrice = (int) str_replace('₱', '', $item['price']);
            $quantity = (isset($item['quantity']) && $item['quantity'] > 0) ? $item['quantity'] : 1;  // Default to 1 if quantity is not set or invalid
            $itemTotal = $itemPrice * $quantity;
            $total += $itemTotal;

            $orderDetails .= "- Product: " . $item['name'] . 
                ", Type: " . $item['type'] . 
                ", Quantity: " . $quantity . 
                ", Price per Item: ₱" . $itemPrice . 
                ", Total Price: ₱" . $itemTotal . "\n";
        }
    } else {
        $orderDetails .= "No items in the cart.\n";
    }

    $total += $shippingFee;

    $orderDetails .= "-----------------------------------\n";
    $orderDetails .= "Shipping Fee: ₱$shippingFee\n"; 
    $orderDetails .= "Total Amount (including shipping): ₱$total\n";
    $orderDetails .= "-----------------------------------\n";

    $file = 'orders.txt';
    file_put_contents($file, $orderDetails, FILE_APPEND);
    
    header('Location: confirmation.html');
    exit();
} else {
    echo "Invalid request.";
}
?>