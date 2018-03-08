<?php
include('./extractToken.php');
include('./connect.php');
if(isset($_GET["username"])){
    $req = $link->query("SELECT * FROM user, photo 
                        WHERE login_user ='".$_GET["username"]."' 
                        AND ext_author_photo = id_user");
                        
    while($data = $req->fetch()){
        $result[]=$data["link_photo"];
    }
    $donnees = [$result,$claims];
    echo(json_encode($donnees));
}




?>