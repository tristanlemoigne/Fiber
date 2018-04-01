import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { GetDataProvider } from '../../providers/get-data/get-data';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { ProfilePage } from '../profile/profile';
import { PostDataProvider } from '../../providers/post-data/post-data';



@IonicPage()
@Component({
  selector: 'page-selected-photo',
  templateUrl: 'selected-photo.html',
})
export class SelectedPhotoPage implements OnInit {
  public imageSelectionne:string;
  public token:any;
  //Données photos
  public nbLike:any;
  public nbCom:any;
  public nbVet:any;

  public description:any;
  public occasion:any;
  public style:any;
  public saison:any;

  public idPhoto:any;
  public commentaires:any;
  public listeVetement:any;

  public postCom:any;
  public infoCom:any;

  public activeUser:boolean;
  public hasComment:boolean = false;
  public hasDescription:boolean = false;
  public commentEmpty:boolean = true;
  public hasVetement:boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController,
    private getDataProvider:GetDataProvider, private storage:Storage, public postDataProvider: PostDataProvider) {
    this.imageSelectionne = this.navParams.get('imageSelectionne');
    this.activeUser = this.navParams.get('userParams');
  }

  //on récupère les infos de la photo
  ngOnInit(){
    this.storage.get("token").then((val) => {
        this.token = val;
        let headers = new HttpHeaders().set("Authorization","Bearer "+this.token);
        let link = "http://fiber-app.com/SERVER/getPhoto.php?linkPhoto="+this.imageSelectionne;
        let req = this.getDataProvider.getData(link,{headers});
        req.subscribe(data=>{
          console.log(data);
          this.idPhoto = data[0]["id_photo"];
          this.description = data[0]["caption_photo"];
          this.occasion = data[0]["name_occasion"];
          this.style = data[0]["name_style"];
          this.saison = data[0]["name_season"];
          this.nbLike = data[1]["nbLike"];
          this.nbCom = data[1]["nbCom"];
          this.nbVet = data[1]["nbVet"];

          if(this.description !== "undefined"){
            this.hasDescription = true
          }

          this.storage.get("token").then((val) => {
            this.token = val;
            let headers = new HttpHeaders().set("Authorization","Bearer "+this.token);
            let link = "http://fiber-app.com/SERVER/getComment.php?id_photo="+this.idPhoto;
            let req = this.getDataProvider.getData(link,{headers});
            req.subscribe(data=>{
              this.commentaires = data;
              if(this.commentaires == null){
                this.commentEmpty = true;
              } else {
                this.commentEmpty = false
              }
              //data[1] = le token
            });
          });

          if(this.nbVet > 0){
            let link = "http://fiber-app.com/SERVER/getVetement.php?idPhoto="+this.idPhoto;
            let headers = new HttpHeaders().set("Authorization","Bearer "+this.token);
            let req = this.postDataProvider.postData(link,{headers});
            req.subscribe(data =>{
              console.log("affichage des vêtements")
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
          }else {
          this.hasVetement = false;
        }
      });
    });
  }



  envoyerCommentaire(){
    if(this.postCom === undefined || this.postCom === ""){
      alert("Aucun commentaire écrit");
    } else {
      let mydata = JSON.stringify({com: this.postCom});

      let link = "http://fiber-app.com/SERVER/postCom.php?id_photo="+this.idPhoto;
      let headers = new HttpHeaders().set("Authorization","Bearer "+this.token);
      let req = this.postDataProvider.postData(link,mydata,{headers});
      req.subscribe(data => {
        this.infoCom = data;
        // console.log(data);
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


  supprimerPhoto(){
    let alert = this.alertCtrl.create({
      title: 'Confirmer la suppression',
      message: 'Supprimer cette photo ?',
      buttons: [
        {
          text: 'Ne pas supprimer',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Supprimer',
          handler: () => {
            this.storage.get("token").then((val) => {
                this.token = val;
                let headers = new HttpHeaders().set("Authorization","Bearer "+this.token);
                let link = "http://fiber-app.com/SERVER/deletePhoto.php?idPhoto="+this.idPhoto;
                let req = this.getDataProvider.getData(link,{headers});
                req.subscribe(data=>{
                  console.log("REPONSE DU SERVEUR : " + data);
                  // this.navCtrl.pop(SelectedPhotoPage)
                  this.navCtrl.setRoot(ProfilePage);
                });
            });
            console.log("suppression de la photo")


          }
        }
      ]
    });
    alert.present();
  }

  popView(){
    this.navCtrl.setRoot(ProfilePage);
  }




}
