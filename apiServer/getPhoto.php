<?php
include('./connect.php');
$req = $link->query("SELECT id_photo, login_user, link_photo
        FROM photo
        JOIN user
        ON ext_author_photo = id_user
        ");
$data=[];
$comments = [];
$i = 0;
while($datum = $req->fetch()){
  $subrequest = $link->query("SELECT text_comment, login_user, id_photo
                              FROM comment
                              JOIN photo
                              ON ext_photo_comment = id_photo
                              JOIN user
                              ON ext_author_comment = id_user
                              WHERE id_photo = ".$datum["id_photo"]);
  while($comment = $subrequest->fetch()){
    $comments[] = $comment;
  }
  $data[$i]["comments"] = $comments;
  $data[$i]["photo"]=$datum;
  unset($comments);
  $comments = [];
  $i++;
}
shuffle($data);
echo(json_encode($data));


 ?>