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
import { SelectedPhotoPage } from '../selected-photo/selected-photo';


@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})

export class ProfilePage implements OnInit {
  public loaded:boolean = false;
  public user:string;
  public bio:string;
  public token:string;
  public photos:any;
  public userID:any;
  public suivi:any;
  public response:any;
  public userParams:boolean = false;
  public userPhoto:boolean = false;
  public userBiographie:boolean = false;
  public photoProfil:any;

  public filtresPage = FiltresPage;
  public profilPage = ProfilePage;
  public takePhotoPage = TakePhotoPage;
  public modifProfilePage = ModifProfilPage;

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
            console.log(data);
            this.loaded = false;
            this.userParams = true;
            this.photos=data[0].slice().reverse();
            this.bio = data[2]["bio"];
            this.user = data[1]["login"];
            this.photoProfil = data[2]["photo"];
            if(this.bio == ""){
              this.bio = this.user+" n'a pas encore de biographie";
            }
            if(this.photoProfil != ""){
              this.userPhoto = true;
            }


            //
            // data = data[0].json()
            // // this.photos={image: JSON.stringify(data[0])};
            // console.log(data)
            // // this.photos={image: data[0], icon:'checkmark-circle-outline'};


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
            this.bio = data[3]["bio"];
            if(this.bio == ""){
              this.bio = this.user+" n'a pas encore de biographie";
            }
            this.photoProfil = data[3]["photo"];
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

  selectOne(index){
    if(this.userParams === true){
      this.navCtrl.setRoot(SelectedPhotoPage, {
        imageSelectionne: this.photos[index]
      })
    }
  }




  load(page: any){
      this.navCtrl.setRoot(page);
  }

  popView(){
    this.navCtrl.setRoot(AccueilPage);
  }




}
