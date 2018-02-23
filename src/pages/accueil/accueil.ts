import { Component, ViewChild, OnInit } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { FiltresPage } from '../filtres/filtres';
import { NavController} from 'ionic-angular';
import { GetDataProvider } from '../../providers/get-data/get-data';
import { ProfilePage } from '../profile/profile';
import { ComPredefiniPage } from '../com-predefini/com-predefini';

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



  constructor (private modalCtrl: ModalController, private getDataProvider:GetDataProvider, private nav: NavController) {
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

  swipeEvent(e){
    if (e.direction == 2) {
      this.hasComment=false;
      this.photoList.splice(0,1);
      this.currentPhoto = this.photoList[0]["photo"]["link_photo"];
      this.authorPhoto = this.photoList[0]["photo"]["login_user"];
        //direction 2 = right to left swipe.
        // Send dislike to bdd

    }

    if (e.direction == 4) {
      this.hasComment=false;
      this.photoList.splice(0,1);
      this.currentPhoto = this.photoList[0]["photo"]["link_photo"];
      this.authorPhoto = this.photoList[0]["photo"]["login_user"];
        // Send like to bdd
    }
  }

  like(){
    // Send like to bdd
    this.hasComment=false;
    this.photoList.splice(0,1);
    this.currentPhoto = this.photoList[0]["photo"]["link_photo"];
    this.authorPhoto = this.photoList[0]["photo"]["login_user"];
  }

  dislike(){
    // Send dislike to bdd
    this.hasComment=false;
    this.photoList.splice(0,1);
    this.currentPhoto = this.photoList[0]["photo"]["link_photo"];
    this.authorPhoto = this.photoList[0]["photo"]["login_user"];
  }

  load(page: any){
      this.nav.setRoot(page);
  }

  clickProfile(){
    this.nav.push(ProfilePage,{
      user:this.authorPhoto,
    });
  }

  commenter(){
    this.hasComment=true;
    this.commentaires = this.photoList[0]["comments"];
    console.log(this.commentaires);
  }

  ecrireCommentaire(){
    this.nav.push(ComPredefiniPage);
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
