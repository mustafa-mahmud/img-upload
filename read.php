<?php
require_once 'db.php';

if (isset($_GET)) {
  $sql = "SELECT * FROM userimg";
  $stmt = $conn->prepare($sql);
  $stmt->execute();

  if ($stmt->rowCount()) {
    $res = $stmt->fetchAll();

    $data = json_encode($res);

    echo $data;
  }
}
?>