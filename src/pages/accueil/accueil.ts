import { Component, ViewChild, OnInit } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { FiltresPage } from '../filtres/filtres';
import { NavController} from 'ionic-angular';
import { GetDataProvider } from '../../providers/get-data/get-data';
import { ProfilePage } from '../profile/profile';
import { ComPredefiniPage } from '../com-predefini/com-predefini';
import { Storage } from '@ionic/storage';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RequestOptions } from '@angular/http';
import { PostDataProvider } from '../../providers/post-data/post-data';

@Component({
  selector: 'page-accueil',
  templateUrl: 'accueil.html',
})

export class AccueilPage  implements OnInit {
  data:any = {};
  public photoList:any;
  public currentPhoto:string;
  public authorPhoto:string;
  public filtresPage = FiltresPage;
  public commentaires:any;
  public hasComment:boolean = false;
  public hasLiked:boolean = false;
  public hasDisliked:boolean = false;
  public token:any;
  public postCom:any;
  public infoCom:any;



  constructor (private modalCtrl: ModalController, private getDataProvider:GetDataProvider, private nav: NavController, public storage: Storage, public postDataProvider: PostDataProvider) {
      this.data.lien = '';
    }
  ngOnInit(){
    let link = "http://fiber-app.com/SERVER/getPhoto.php";
    this.getDataProvider.getData(link).subscribe(data=>{
      this.photoList = data;
      this.currentPhoto = this.photoList[0]["photo"]["link_photo"];
      this.authorPhoto = this.photoList[0]["photo"]["login_user"];
      console.log(data);
    });
  }

  like(){
    this.storage.get("token").then((val) => {
      this.token = val;
      let headers = new HttpHeaders().set("Authorization","Bearer "+this.token);
      let link = "http://fiber-app.com/SERVER/likePhoto.php?id_photo="+this.photoList[0]["photo"]["id_photo"];
      let req = this.getDataProvider.getData(link,{headers});
      req.subscribe(data=>{
        console.log(data);
        //data[1] = le token
      })
    });
    // Send like to bdd
    this.hasLiked = true;

    setTimeout(() => {
      this.hasLiked = false;
      this.hasComment=false;
      this.photoList.splice(0,1);
      this.currentPhoto = this.photoList[0]["photo"]["link_photo"];
      this.authorPhoto = this.photoList[0]["photo"]["login_user"];
      },500)
  }

  dislike(){
    // Send dislike to bdd
    this.hasDisliked = true;

    setTimeout(() => {
       this.hasDisliked = false;
       this.hasComment=false;
       this.photoList.splice(0,1);
       this.currentPhoto = this.photoList[0]["photo"]["link_photo"];
       this.authorPhoto = this.photoList[0]["photo"]["login_user"];
    },500);
  }

  swipeEvent(e){
    if (e.direction == 2) {
      this.dislike();
        //direction 2 = right to left swipe.
        // Send dislike to bdd
    }

    if (e.direction == 4) {
      this.like();
        // Send like to bdd
    }
  }



  load(page: any){
      this.nav.setRoot(page);
  }

  clickProfile(){
    this.nav.setRoot(ProfilePage,{
      user:this.authorPhoto,
    });
  }

  commenter(){
     if(this.hasComment === true)
         this.hasComment=false;
      else
         this.hasComment=true;

    this.commentaires = this.photoList[0]["comments"];
    console.log(this.commentaires);

    //commentaires prédéfinis ou non
    this.storage.get("token").then((val) => {
      this.token = val;
      let headers = new HttpHeaders().set("Authorization","Bearer "+this.token);
      let link = "http://fiber-app.com/SERVER/commentToken.php";
      let req = this.getDataProvider.getData(link,{headers});
      req.subscribe(data=>{
        if(data["permissions"]=="Administrateur"){
          //LAISSER INPUT
          console.log("admin");
        } else{
          //METTRE BOUTON POUR COMMENTAIRES PREDEFINIS
          console.log("user");
        }
        console.log(data);
        //data[1] = le token
      })
    });

  }

  envoyerCommentaire(){
    console.log(this.postCom);
    let mydata = JSON.stringify({com: this.postCom});
    let link = "http://fiber-app.com/SERVER/insertCom.php?id_photo="+this.photoList[0]["photo"]["id_photo"];
    let headers = new HttpHeaders().set("Authorization","Bearer "+this.token);
    let req = this.postDataProvider.postData(link,mydata,{headers});
    req.subscribe(data => {
      this.infoCom = data;
      console.log(data);
    },
    (err) => {
    },
    () => {
      this.commentaires.push(this.infoCom);
      this.postCom="";
    });

    //at the end

  }
  // move(e){
  //
  //   var _windowSize = {w: window.innerWidth, h: window.innerHeight};
  //   var _mouseX = (e.clientX / _windowSize.w) * 2 - 1;
  //
  //
  //
  //   console.log(_mouseX);
  //
  //   var img = document.getElementById("card");
  //   img.style.transform = "translateX(" + _mouseX*200 + "px)";
  //
  //
  //   // console.log(img.style.transform);
  //   // img.translate = (Math.sin(e.clientX));
  //
  // }

}
