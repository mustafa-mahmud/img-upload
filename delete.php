<?php
require_once 'db.php';

if (isset($_POST)) {
  $data = json_decode(file_get_contents('php://input'));

  // print_r($data);
  $id = intval($data->id);
  $src = $data->src;

  $sql = "DELETE FROM userimg WHERE id=:id;";
  $stmt = $conn->prepare($sql);
  $stmt->execute(['id' => $id]);

  if ($stmt->rowCount()) {
    echo 'Deleted successfully';

    if (file_exists($src)) {
      unlink($src);
    }
  }
}
?>