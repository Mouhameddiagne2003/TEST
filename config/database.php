<?php
// INFOS DE CONNEXION SUR LA BASE DE DONNEES
$host = "localhost";
$db_name = "test";
$username = "username";
$password = "password";
try {
    $conn = new PDO("mysql:host=$host;dbname=$db_name", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
    die();
}
?>