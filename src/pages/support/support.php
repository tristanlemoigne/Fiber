<?php

  $to = $_POST["emailTo"];
  $object = $_POST[]
  $msg = $_POST["msg"];

  mail($to, "Some test subject", $msg);

?>
