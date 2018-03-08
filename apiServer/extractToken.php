<?php
//ALSO VERIFIES IF THE TOKEN IS VALID
include ('./vendor/autoload.php');
include ('./key.php');

use Lcobucci\JWT\Builder;
use Lcobucci\JWT\Parser;
use Lcobucci\JWT\Claim\Factory as ClaimFactory;
use Lcobucci\JWT\Parsing\Decoder;
use Lcobucci\JWT\Signer\Hmac\Sha256;


$test = substr($_SERVER["HTTP_AUTHORIZATION"],7);
//echo(json_encode(explode('.',$test)));

try{
    $signer = new Sha256();
    $token = (new Parser())->parse((string) $test);
    $bool = $token->verify($signer,$key);
    if(!$bool){
        //DECONNECTER DE SUITE L'UTILISATEUR CAR TOKEN A ETE MODIFIE
        echo(json_encode("Erreur"));
        die;
    }
    $claims = $token->getClaims();
    //echo(json_encode($token->getClaims()));
}
catch(Exception $e){
    echo(json_encode($e->getMessage()));
}


?>