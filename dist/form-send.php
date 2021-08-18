<?php

$mailToSend = "zamowienia@health-lab.pl";

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $name = $_POST["name"];
    $phone = $_POST["phone"];
    $privatePolice = $_POST["private-police"];
    $antiSpam = $_POST["honey"];

    $errors = array();
    $return = array();

    if (empty($name)) {
        array_push($errors, "name");
    }
    if (!filter_var($phone, FILTER_SANITIZE_NUMBER_INT)) {
        array_push($errors, "phone");
    }
    if (!filter_has_var(INPUT_POST, 'private-police')) {
        array_push($errors, "private-police");
    }
    if (!empty($antiSpam)) {
        array_push($errors, "honey");
    }

    if (count($errors) > 0) {
        $return["errors"] = $errors;
    } else {
        $headers  = "MIME-Version: 1.0" . "\r\n";
        $headers .= "Content-type: text/html; charset=UTF-8" . "\r\n";
        $headers .= "From: " . $mailToSend . "\r\n";
        $message  = "
            <html>
                <head>
                    <meta charset=\"utf-8\">
                </head>
                <body>
                    <div> Imię: $name</div>
                    <div> telefon do kontaktu: <a href=\"tel:$phone\">$phone</a> </div>
                    <div>Zgoda na przetwarzanie danych: $privatePolice</div>
                    <div> Wiadomość z formularza Biouron Landing Page </div>
                </body>
            </html>";

        if (mail($mailToSend, "Email ze strony - Biouron", $message, $headers)) {
            $return["status"] = "ok";
        } else {
            $return["status"] = "error";
        }
    }

    header("Content-Type: application/json");
    echo json_encode($return);
}
