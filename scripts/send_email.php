<?php


$to = 'choonkiat.lee@gmail.com';

$subject = 'CUMSA Chronicle';

$headers = "From: " . 'rojakemail@gmail.com'. "\r\n";
$headers .= "CC: ckl41@cam.ac.uk\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";


$message = $_POST['email'];




mail($to, $subject, $message, $headers);


?>