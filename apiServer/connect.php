<?php
try{
  $link = new PDO("mysql:host=localhost;dbname=u984282888_fiber;chrset=utf8",'u984282888_alex','Fiberdb01*$');
  $link->setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_WARNING );
}
catch(Exception $e){
  die ("Erreur : ").$e->getMessage();
}


 ?>
