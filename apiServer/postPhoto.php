<?php
include('./connect.php');
include('./extractToken.php');
//On compte le nombre de photos de l'utilisateur
$login = $claims["login"];
$req = $link->query("SELECT COUNT(id_photo) FROM photo, user WHERE ext_author_photo = id_user AND login_user = '".$login."'");
$nbPhotos = $req->fetchColumn();

$target_path = "photos/";
//On nomme le fichier login_user+nbPhotos.jpg
$fileName = $login.$nbPhotos.".jpg";
$_FILES["file"]["name"] = $fileName;
$target_path = $target_path.basename($_FILES["file"]["name"]);
if(move_uploaded_file($_FILES["file"]["tmp_name"],$target_path)){
    $linkPhoto = "http://fiber-app.com/SERVER/".$target_path;
    $date = date('Y'.'-'.'m'.'-'.'d');
    $req = $link->query("SELECT id_user FROM user WHERE login_user = '".$login."'");
    $id = $req->fetch();
    $id = $id[0];
    $prep = $link->prepare("INSERT INTO photo (date_photo, link_photo, ext_author_photo) VALUES (:daate, :link, :auteur)");
    echo(json_encode($prep));
    $prep->bindParam(':daate',$date);
    $prep->bindParam(':link',$linkPhoto);
    $prep->bindParam(':auteur',$id);
    if($prep->execute()){
        echo(json_encode("Photo insérée dans la base"));
    } else{
        echo(json_encode("Echec"));
    }
    //echo(json_encode($linkPhoto));
    //echo(json_encode("Upload and move success"));
} else{
    //echo(json_encode($target_path));
    //echo(json_encode("Error"));
}
?>