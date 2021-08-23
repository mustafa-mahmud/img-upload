<?php
if (isset($_POST)) {
  $name = $_POST['name'];
  $pass = $_POST['password'];
  $file = $_FILES['my-file'];

  print_r($file);
  print_r($_POST);
}
?>