<?php
$host = 'localhost';
$user = 'root';
$pass = '';
$db = 'imgupload';
$dsn = "mysql:host=$host;dbname=$db";

try {
  $conn = new PDO($dsn, $user, $pass);

} catch (PDOException $e) {
  echo $e->getMessage();
}
?>