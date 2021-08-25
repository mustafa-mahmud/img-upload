<?php
$host = 'localhost';
$user = 'root';
$pass = '';
$db = 'imgupload';
$dsn = "mysql:host=$host;dbname=$db";

try {
  $conn = new PDO($dsn, $user, $pass);
  $conn->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_OBJ);
  $conn->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);

} catch (PDOException $e) {
  echo $e->getMessage();
}
?>