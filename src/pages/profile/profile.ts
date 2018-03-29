import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GetDataProvider } from '../../providers/get-data/get-data';
import { Storage } from '@ionic/storage';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RequestOptions } from '@angular/http';

import { FiltresPage } from '../filtres/filtres';
import { TakePhotoPage } from '../take-photo/take-photo';
import { AccueilPage } from '../accueil/accueil';
import { ModifProfilPage } from '../modif-profil/modif-profil';


@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage implements OnInit {
  public loaded:boolean = false;
  public user:string;
  public token:string;
  public photos:any;
  public userID:any;
  public suivi:any;
  public response:any;
  public userParams:boolean = false;
  public userBiographie:boolean = false;


  public filtresPage = FiltresPage;
  public profilPage = ProfilePage;
  public takePhotoPage = TakePhotoPage;
  public modifProfilePage = ModifProfilPage;

  public selectPictures: boolean = false;
  public visible: boolean = true;

  constructor(public navCtrl: NavController, public navParams: NavParams, private getDataProvider:GetDataProvider, private storage:Storage) {
    this.user = this.navParams.get('user');
    this.userID = this.navParams.get('userID');
  }

  ngOnInit(){
    //si c'est l'utilisateur actuel
    if(this.user == undefined){
      this.user="";
      this.storage.get("token").then((val) => {
          this.token = val;
          let headers = new HttpHeaders().set("Authorization","Bearer "+this.token);
          let link = "http://fiber-app.com/SERVER/profile.php";
          let req = this.getDataProvider.getData(link,{headers});
          req.subscribe(data=>{
            this.loaded = false;
            this.userParams = true;
            this.photos=data[0];
            //
            // data = data[0].json()
            // // this.photos={image: JSON.stringify(data[0])};
            // console.log(data)
            // // this.photos={image: data[0], icon:'checkmark-circle-outline'};

            this.user = data[1]["login"];
            //data[1] = le token
          })
      });
    } else{
      console.log("ooo");
      this.storage.get("token").then((val) => {
          this.token = val;
          let headers = new HttpHeaders().set("Authorization","Bearer "+this.token);
          console.log(this.userID);
          let link = "http://fiber-app.com/SERVER/profile.php"+"?userID="+this.userID;
          let req = this.getDataProvider.getData(link,{headers});
          req.subscribe(data=>{
            this.loaded = true;
            console.log(data);
            this.photos=data[0];
            //this.photos=image: data[0]; {icon:'checkmark-circle-outline'};

            this.suivi = data[2];
            //data[1] = le token
          })
      });
    }



  }
  abonnement(param){;
    this.storage.get("token").then((val) => {
        this.token = val;
        let headers = new HttpHeaders().set("Authorization","Bearer "+this.token);
        let link = "";
        if(param){
          link = "http://fiber-app.com/SERVER/abonnement.php?abo=true&userID="+this.userID;
        } else{
          link = "http://fiber-app.com/SERVER/abonnement.php?abo=false&userID="+this.userID;
        }
        let req = this.getDataProvider.getData(link,{headers});
        req.subscribe(data=>{
          this.response = data;
          console.log(this.response);
          if(this.response == 1){
            this.suivi = true;
          }
          if(this.response == 3){
            this.suivi = false;
          }

        });
    });

  }

  selectAll(){
    if(this.userParams === true){
      console.log("Sélection de toutes les photos");
      this.selectPictures = true;
    }

  }

  selectOne(index){
    console.log("Sélection de la photo " + index)
    // this.visible = !this.visible;
    // console.log(this.photos[index])
  }

  unSelect(){
    this.selectPictures = false;
  }


  load(page: any){
      this.navCtrl.setRoot(page);
  }

  popView(){
    this.navCtrl.setRoot(AccueilPage);
  }




}
