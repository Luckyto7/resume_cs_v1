<?php
$pdo = new PDO('mysql:host=localhost;dbname=cv_database', 'username', 'password');
$name = $_POST['name'];

$stmt = $pdo->prepare("INSERT INTO skills (name) VALUES (?)");
$stmt->execute([$name]);
echo $pdo->lastInsertId();
?>
