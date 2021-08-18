<?php

$mailToSend = "zamowienia@health-lab.pl";

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $name = $_POST["name"];
    $phone = $_POST["phone"];

    $errors = [];
    $return = [];

    if (empty($name)) { //jeżeli pusta wartość
        array_push($errors, "name");
    }
    if (!filter_var($email, FILTER_SANITIZE_NUMBER_INT)) {
        array_push($errors, "phone");
    }

    if (count($errors) > 0) {
        $return["errors"] = $errors;
    } else {
        //każde wysłanie wiadomości musi być poprzedzone ustawieniem nagłówków
        $headers  = "MIME-Version: 1.0" . "\r\n";
        $headers .= "Content-type: text/html; charset=UTF-8" . "\r\n";
        $headers .= "From: " . $mailToSend . "\r\n";
        $phone  = "
            <html>
                <head>
                    <meta charset=\"utf-8\">
                </head>
                <body>
                    <div> Imię: $name</div>
                    <div> telefon do kontaktu: <a href=\"tel:$phone\">$phone</a> </div>
                    <div> Wiadomość: </div>
                    <div> Wiadomość z formularza Landing Page </div>
                </body>
            </html>";

        if (mail($mailToSend, "Wiadomość ze strony - " . date("d-m-Y"), $phone, $headers)) {
            $return["status"] = "ok";
        } else {
            $return["status"] = "error";
        }
    }

    header("Content-Type: application/json");
    echo json_encode($return);
}
