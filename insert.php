<?php
require_once 'db.php';

if (isset($_POST)) {
  $name = $_POST['name'];
  $pass = $_POST['password'];
  $file = $_FILES['my-file'];

  if (nameValidation($name) && fileValidation($file) && passwordValidation($pass)) {
    $sql = "INSERT INTO userimg (name, pass, img)
    VALUES (:name, :pass, :img)";
    $stmt = $conn->prepare($sql);
    $stmt->execute(['name' => $name, 'pass' => $pass, 'img' => $newName]);

    if ($stmt->rowCount()) {
      echo 'successfully';
    }
  }
}

function passwordValidation($pass) {
  if ($pass >= 3) {
    global $pass;
    $pass = md5($pass);
    return true;
  }
}

function nameValidation($name) {
  $name = strip_tags($name);
  if (filter_var($name, FILTER_SANITIZE_STRING)) {
    return true;
  } else {
    echo 'Only string are supported.';
  }
}

function fileValidation($file) {
  $name = $file['name'];
  $type = $file['type'];
  $tmpName = $file['tmp_name'];
  $error = $file['error'];
  $size = $file['size'];

  $type = explode('/', $type);
  $type = end($type);
  $type = strtolower($type);

  $validType = ['jpg', 'jpeg', 'png', 'gif'];

  if (in_array($type, $validType)) {
    if ($size < 3000000 && !$error) {
      global $newName;
      $newName = uniqid('', true) . md5($name) . '.' . $type;
      $destination = "uploads/$newName";

      move_uploaded_file($tmpName, $destination);

      return true;
    } else {
      echo 'Size support only in 3mb';
    }
  } else {
    echo 'Only jpg|jpeg|png|gif supported.';
  }
}

?>