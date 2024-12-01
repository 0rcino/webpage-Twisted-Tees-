<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
 
    $name = htmlspecialchars(trim($_POST['name']));
    $email = htmlspecialchars(trim($_POST['email']));
    $number = htmlspecialchars(trim($_POST['number']));
    $subject = htmlspecialchars(trim($_POST['subject']));
    $message = htmlspecialchars(trim($_POST['message']));

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "Invalid email format";
        exit;
    }

    $data = "Name: " . $name . "\n";
    $data .= "Email: " . $email . "\n";
    $data .= "Phone Number: " . $number . "\n";
    $data .= "Subject: " . $subject . "\n";
    $data .= "Message: " . $message . "\n";
    $data .= "---------------------------\n";

    $file = 'contact_submissions.txt';

    if (file_put_contents($file, $data, FILE_APPEND | LOCK_EX)) {
        echo "Your message has been saved successfully!";
    } else {
        echo "There was an error saving your message.";
    }
}
?>