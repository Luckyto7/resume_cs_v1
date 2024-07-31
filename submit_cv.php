<?php
$pdo = new PDO('mysql:host=localhost;dbname=cv_database', 'username', 'password');

$name = $_POST['name'];
$middle_name = $_POST['middle_name'];
$last_name = $_POST['last_name'];
$dob = $_POST['dob'];
$university = $_POST['university'];
$skills = $_POST['skills'];

$stmt = $pdo->prepare("INSERT INTO candidates (name, middle_name, last_name, dob, university) VALUES (?, ?, ?, ?, ?)");
$stmt->execute([$name, $middle_name, $last_name, $dob, $university]);

$candidateId = $pdo->lastInsertId();

foreach ($skills as $skill) {
    $stmt = $pdo->prepare("INSERT INTO candidate_skills (candidate_id, skill_id) VALUES (?, ?)");
    $stmt->execute([$candidateId, $skill]);
}

echo "CV успешно записано!";
?>
