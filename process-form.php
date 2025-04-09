<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Form data
    $name = $_POST['name'];
    $email = $_POST['email'];
    $subject = $_POST['subject'] ?: "New Website Contact";
    $message = $_POST['message'];
    
    // Email content
    $to = "Info@mids-eg.com";
    $email_subject = "EIDLS Website Contact: $subject";
    $email_body = "You have received a new message.\n\n".
                  "Name: $name\nEmail: $email\n".
                  "Subject: $subject\n\nMessage:\n$message";
    $headers = "From: $name <$email>";
    
    // Send email
    mail($to, $email_subject, $email_body, $headers);
    
    // Redirect to thank you page
    header("Location: thank-you.html");
    exit();
}
?>
