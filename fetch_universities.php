<?php
$pdo = new PDO('mysql:host=localhost;dbname=cv_database', 'username', 'password');
$query = $pdo->query("SELECT * FROM universities");
$universities = $query->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($universities);
?>
