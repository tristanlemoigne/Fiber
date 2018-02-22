<?php
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$object = $request->object;
$question = $request->question;
$from = $request->userMail;
$mail = "contact@fiber-app.com";
$headers = 'From: '.$from. "\r\n";

mail($mail, $object, $question, $headers);
echo(json_encode("test"));

?>