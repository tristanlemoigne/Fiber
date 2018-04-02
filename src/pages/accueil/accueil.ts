import { Component, ViewChild, OnInit } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { NavController, NavParams} from 'ionic-angular';
import { GetDataProvider } from '../../providers/get-data/get-data';
import { ComPredefiniPage } from '../com-predefini/com-predefini';
import { Storage } from '@ionic/storage';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RequestOptions } from '@angular/http';
import { PostDataProvider } from '../../providers/post-data/post-data';

import { FiltresPage } from '../filtres/filtres';
import { ProfilePage } from '../profile/profile';
import { TakePhotoPage } from '../take-photo/take-photo';
import { AbsoluteDrag } from '../../directives/absolute-drag/absolute-drag';


@Component({
  selector: 'page-accueil',
  templateUrl: 'accueil.html',
})

export class AccueilPage  implements OnInit {
  data:any = {};
  //Liste des photos qui contient toutes les infos
  public photoList:any;
  //La photo affichéen actuellement
  public currentPhoto:string;
  //L'utilisateur qui a pris la photo actuelle
  public authorPhoto:string;
  //Son id
  public authorPhotoId:any;
  //Nombre de like d'une photo
  public nbLike:any;
  //Nombre de vêtements
  public nbVet:any;
  //Nombre de commentaires
  public nbCom:any;
  //occasion de la photo
  public occasion:any;
  //style de la photo
  public style:any;
  //saison de la photo
  public saison:any;
  //légende de la photo
  public description:any;
  //La liste des commentaires reliés à une photo
  public commentaires:any;
  //La liste des vêtements reliés à une photo
  public listeVetement:any;


  public hasComment:boolean = false;
  public hasLiked:boolean = false;
  public hasDisliked:boolean = false;

  //Boolean pour afficher le bouton + si la photo a des vêtements renseignés
  public hasVetement:boolean = false;
  //Boolean pour afficher les vêtements quand on clique sur le +
  public afficheVetement:boolean = false;
  //Propriété qui contient le token de l'utilisateur avec ses infos etc pour l'identifier
  public token:any;

  public postCom:any;
  public infoCom:any;
  public commentEmpty:any;

  public filtresPage = FiltresPage;
  public profilPage = ProfilePage;
  public takePhotoPage = TakePhotoPage;

  public affichePlusDePhoto: boolean = false;
  public afficheLesPhotos: boolean = true;

  public plusAffiche: boolean = true;
  public executed: boolean = true;

  @ViewChild(AbsoluteDrag) vc:AbsoluteDrag;

  public filtres:boolean = false;
  public photoListFiltrees:any;

  constructor (private modalCtrl: ModalController, private getDataProvider:GetDataProvider, private nav: NavController,
    public storage: Storage, public postDataProvider: PostDataProvider, public navParams:NavParams) {
      this.photoListFiltrees = this.navParams.get("photos");
      this.filtres = this.navParams.get("filtres");
      this.data.lien = '';
    }
  ngOnInit(){
    if(!this.filtres){
      this.storage.get("token").then((val) => {
        this.token = val;
        let headers = new HttpHeaders().set("Authorization","Bearer "+this.token);
        let link = "http://fiber-app.com/SERVER/getPhotos.php";
        this.getDataProvider.getData(link,{headers}).subscribe(data=>{
          this.photoList = data;
          if(data === null || data.byteLength <= 0 || data === undefined || this.photoList.length <= 1){
            console.log("PLus de photos à afficher");
            this.affichePlusDePhoto = true;
            this.afficheLesPhotos = false;
          } else {
            this.currentPhoto = this.photoList[0]["link_photo"];
            this.authorPhoto = this.photoList[0]["login_user"];
            this.authorPhotoId = this.photoList[0]["id_user"];
            this.occasion = this.photoList[0]["name_occasion"];
            this.style = this.photoList[0]["name_style"];
            this.saison = this.photoList[0]["name_season"];
            this.description = this.photoList[0]["caption_photo"];
            if(this.description == "undefined"){
              this.description = "Pas de description";
            }
            this.nbLike = this.photoList[0]["nbLike"];
            this.nbCom = this.photoList[0]["nbCom"];
            this.nbVet = this.photoList[0]["nbVet"];
            if(this.nbVet != 0){
              this.hasVetement = true;
            }
          }
        });
      });
    }  else{
        this.currentPhoto = this.photoListFiltrees[0]["link_photo"];
        this.authorPhoto = this.photoListFiltrees[0]["login_user"];
        this.authorPhotoId = this.photoListFiltrees[0]["id_user"];
        this.occasion = this.photoListFiltrees[0]["name_occasion"];
        this.style = this.photoListFiltrees[0]["name_style"];
        this.saison = this.photoListFiltrees[0]["name_season"];
        this.description = this.photoListFiltrees[0]["caption_photo"];
        if(this.description == "undefined"){
          this.description = "Pas de descritpion";
        }
        this.nbLike = this.photoListFiltrees[0]["nbLike"];
        this.nbCom = this.photoListFiltrees[0]["nbCom"];
        this.nbVet = this.photoListFiltrees[0]["nbVet"];
        if(this.nbVet != 0){
          this.hasVetement = true;
        }
        this.photoList = this.photoListFiltrees;
      }

    // EXECUTION DE VERIFSWIPE TOUTES LES 20ms
    // let interval = setInterval(()=> {
    //   this.verifSwipe()
    // }, 1)
  }

  // verifSwipe(){
  //   if(this.executed){
  //     console.log(this.vc.newLeft)
  //
  //     if(this.vc.newLeft >= 225){
  //       this.like()
  //       setTimeout(()=> {
  //         this.executed = true;
  //       }, 1000)
  //     }
  //
  //     if(this.vc.newLeft <= -225){
  //       this.dislike()
  //       setTimeout(()=> {
  //         this.executed = true;
  //       }, 1000)
  //     }
  //   }
  // }


  like(){
    this.executed = false;
    this.plusAffiche = true;
    this.afficheVetement = false;
    this.commentaires = [];
    this.storage.get("token").then((val) => {
      this.token = val;
      let headers = new HttpHeaders().set("Authorization","Bearer "+this.token);

      if(this.photoList.length <= 1){
        this.photoList = this.photoList.slice(1);
        this.hasLiked = false;
        this.hasComment=false;

        console.log("PLus de photos à afficher");
        console.log(this.photoList);
        this.affichePlusDePhoto = true;
        this.afficheLesPhotos = false;
      } else {
        let link = "http://fiber-app.com/SERVER/likePhoto.php?id_photo="+this.photoList[0]["id_photo"];

        this.getDataProvider.getData(link,{headers}).subscribe(data=>{
            // setTimeout(() => {
              console.log(this.description);
                this.hasLiked = false;
                this.hasComment=false;
                this.photoList.splice(0,1);
                this.nbLike = this.photoList[0]["nbLike"];
                this.nbCom = this.photoList[0]["nbCom"];
                this.nbVet = this.photoList[0]["nbVet"];
                this.description = this.photoList[0]["caption_photo"];
                if(this.description == "undefined"){
                  this.description = "Pas de descritpion";
                }
                if(this.nbVet != 0){
                  this.hasVetement = true;
                } else{
                  this.hasVetement = false;
                }
                this.occasion = this.photoList[0]["name_occasion"];
                this.style = this.photoList[0]["name_style"];
                this.saison = this.photoList[0]["name_season"];
                this.currentPhoto = this.photoList[0]["link_photo"];
                this.authorPhoto = this.photoList[0]["login_user"];
                this.authorPhotoId = this.photoList[0]["id_user"];
            // },300)
          //data[1] = le token
        })

      }

    });

    // Send like to bdd
    this.hasLiked = true;


  }

  dislike(){
    this.executed = false;
    this.plusAffiche = true;
    this.afficheVetement = false;
    this.commentaires = [];
    this.hasDisliked = true;
    this.storage.get("token").then((val) => {
      this.token = val;
      let headers = new HttpHeaders().set("Authorization","Bearer "+this.token);
      if(this.photoList.length <= 1){
        this.photoList = this.photoList.slice(1);
        this.hasLiked = false;
        this.hasComment=false;

        console.log("PLus de photos à afficher");
        this.affichePlusDePhoto = true;
        this.afficheLesPhotos = false;
      } else {
        let link = "http://fiber-app.com/SERVER/nextPhoto.php?id_photo="+this.photoList[0]["id_photo"];

        this.getDataProvider.getData(link,{headers}).subscribe(data=>{
          // setTimeout(() => {
            console.log(this.description);
             this.hasDisliked = false;
             this.hasComment=false;
             this.photoList.splice(0,1);
             this.nbLike = this.photoList[0]["nbLike"];
             this.nbCom = this.photoList[0]["nbCom"];
             this.nbVet = this.photoList[0]["nbVet"];
             this.description = this.photoList[0]["caption_photo"];
             if(this.description == "undefined"){
               this.description = "Pas de descritpion";
             }
             if(this.nbVet != 0){
               this.hasVetement = true;
             } else{
               this.hasVetement = false;
             }
             this.occasion = this.photoList[0]["name_occasion"];
             this.style = this.photoList[0]["name_style"];
             this.saison = this.photoList[0]["name_season"];
             this.currentPhoto = this.photoList[0]["link_photo"];
             this.authorPhoto = this.photoList[0]["login_user"];
             this.authorPhotoId = this.photoList[0]["id_user"];
          // },300);
        });
      }
    });
  }

  swipeEvent(e){
    if (e.direction == 2) {
      this.dislike();
        //direction 2 = right to left swipe.
    }
    if (e.direction == 4) {
      this.like();
    }
  }


  move(e){

    var _windowSize = {w: window.innerWidth, h: window.innerHeight};
    var _mouseX = (e.clientX / _windowSize.w) * 2 - 1;



    console.log(_mouseX);
    console.log("ça bouge");

    var carte = document.getElementById("carte");

    carte.style.transform = "translateX(" + _mouseX*200 + "px)";


    // console.log(img.style.transform);
    // img.translate = (Math.sin(e.clientX));

  }





  load(page: any){
      this.nav.setRoot(page);
  }

  clickProfile(){
    this.nav.setRoot(ProfilePage,{
      user:this.authorPhoto,
      userID:this.authorPhotoId
    });
  }

  afficherVetement(){
    if (this.plusAffiche === true){
      this.plusAffiche = false;
      this.afficheVetement = true;
      if(this.nbVet > 0){
        let link = "http://fiber-app.com/SERVER/getVetement.php?idPhoto="+this.photoList[0]["id_photo"];
        let headers = new HttpHeaders().set("Authorization","Bearer "+this.token);
        let req = this.postDataProvider.postData(link,{headers});
        req.subscribe(data =>{
          this.hasVetement = true;
          this.listeVetement = data;
          for(let i = 0;i<this.listeVetement.length;i++){
            if(this.listeVetement[i].price_cloth == null){
              this.listeVetement[i].price_cloth = "Prix non renseigné";
            }
            if(this.listeVetement[i].name_store == null){
              this.listeVetement[i].name_store = "Magasin non renseigné";
            }
          }
          console.log(this.listeVetement);
        },
        (err) =>{

        },()=>{

        });
      }
    } else {
      this.plusAffiche = true;
      this.afficheVetement = false;
    }
  }

  commenter(){
     if(this.hasComment === true)
         this.hasComment=false;
      else
         this.hasComment=true;

    this.storage.get("token").then((val) => {
      this.token = val;
      let headers = new HttpHeaders();
      headers.append("Authorization","Bearer "+this.token);
      headers.append("Accept-Charset","UTF-8");
      let link = "http://fiber-app.com/SERVER/getComment.php?id_photo="+this.photoList[0]["id_photo"];
      let req = this.getDataProvider.getData(link,{headers});
      req.subscribe(data=>{
        this.commentaires = data;
        // console.log(this.commentaires);
        if(this.commentaires == null){
          this.commentEmpty = true;
        }
        //data[1] = le token
      });
    });

    //commentaires prédéfinis ou non
  }

  envoyerCommentaire(){
    let blackList = "connard, con, conasse, putain, pute, merde, bite, salaud, salope, encule, enculé, batard, bâtard, bâtarde, batarde, moche, laid, laideron, chienne, chiennasse, pd, tapette, gros, grosse, fdp, ntm, vtff, fils de pute, nique, niqué, niquer, abruti, andouille, attardé, foutre, anus, pénis, andouille, bête, bete, bouffon, bouffonne, boufone, boufon, boulet, bougnoule, bougnoul, nègre, chinetoque, couilles, crétin, débile, ducon, emmerdé, emmerder, enflure, enfoiré, rat, fiotte, fumier, garce, gland, glandu, glandeuse, glandeur, gogol, gouine, gourde, grognasse, gourgandine, imbécile, incapable, kikoo, kikou, lavette, lopette, mauviette, merdeux, merdouillard, minable, minus, misérable, merdouille, michto, naze, négro, nul, ordure, pédé, petite bite, petite merde, porc, pouffiasse, poufiasse, pourriture, poundé, raclure, raté, sale, salop, sauvage, sous-merde, ta gueule, tg, gueule, race, tarlouze, tache, tafiole, tantouze, teubé, thon, tocard, traînée, trouduc, vaurien, vieux, zguègue, avorton, asticot, trisomique, trizo, triso, handicapé, bigleux, blaireau, boloss, bolosse, bourrique, bourrin, bouricot, bouseux, boutonneux, burne, cancrelat, cassos, chieur, cinglé, cloche, cocu, gourde, couillon, crevard, crevure, cul, anal, filou, fion, fiotte, gland, goujat, gueux, has-been, idiot, impuissant, kéké, nabot, nain, neuneu, nigaud, parasite, patate, pervers, plouc, quetard, quiche, tanche, taré, zoulou, juif, feuj, terroriste, dégueu, dégueulasse, cochon, cochonne, porc";

    if(this.postCom === undefined || this.postCom === ""){
      alert("Aucun commentaire écrit");
    } else {
      this.postCom = this.filter(this.postCom, blackList)
      let mydata = JSON.stringify({com: this.postCom});

      let link = "http://fiber-app.com/SERVER/postCom.php?id_photo="+this.photoList[0]["id_photo"];
      let headers = new HttpHeaders().set("Authorization","Bearer "+this.token);
      let req = this.postDataProvider.postData(link,mydata,{headers});
      req.subscribe(data => {
        this.infoCom = data;
      },
      (err) => {
      },
      () => {
        this.nbCom = parseInt(this.nbCom[0])+1;
        //this.nbCom[0] = this.nbCom[0]+1;
        this.commentEmpty = false;
        if(this.commentaires == null){
          this.commentaires = [this.infoCom];
        } else{
          this.commentaires.push(this.infoCom);
        }
        this.postCom="";
      });
    }
  }

  filter(commentaire, blackList) {
    var wordArr = commentaire.match(/'\w+|\w+'\w+|\w+'|\w+/g),
        commonObj = {},
        commentaireFiltre = [],
        word, i;

    blackList = blackList.split(',');
    for ( i = 0; i < blackList.length; i++ ) {
        commonObj[ blackList[i].trim() ] = true;
    }
    for ( i = 0; i < wordArr.length; i++ ) {
        word = wordArr[i].trim().toLowerCase();
        console.log(word)

        if ( !commonObj[word] ) {
            commentaireFiltre.push(word);
        }
    }
    return commentaireFiltre.join(' ');
    // return commentaireFiltre;
 }





}
