<?php
$pdo = new PDO('mysql:host=localhost;dbname=cv_database', 'username', 'password');
$name = $_POST['name'];
$rating = $_POST['rating'];

$stmt = $pdo->prepare("INSERT INTO universities (name, rating) VALUES (?, ?)");
$stmt->execute([$name, $rating]);
echo $pdo->lastInsertId();
?>
