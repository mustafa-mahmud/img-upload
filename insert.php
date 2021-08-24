<?php
if (isset($_POST)) {
  $name = $_POST['name'];
  $pass = $_POST['password'];
  $file = $_FILES['my-file'];

  fileValidation($file);
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
    if ($size < 3000000) {
      $newName = uniqid('', true) . md5($name) . '.' . $type;
			$destination="uploads/$newName";

			move_uploaded_file($tmpName,$destination);

			echo 'Data save successfully';
    } else {
      echo 'Size support only in 3mb';
    }
  } else {
    echo 'Only jpg|jpeg|png|gif supported.';
  }
}

?>