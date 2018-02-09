import { Component, ViewChild, OnInit } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { FiltresPage } from '../filtres/filtres';
import { NavController} from 'ionic-angular';
import { GetDataProvider } from '../../providers/get-data/get-data';
import { ProfilePage } from '../profile/profile';

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



  constructor (private modalCtrl: ModalController, private getDataProvider:GetDataProvider, private nav: NavController) {
      this.data.lien = '';
    }
  ngOnInit(){
    let link = "http://fiber-app.com/SERVER/getPhoto.php";
    this.getDataProvider.getData(link).subscribe(data=>{
      this.photoList = data;
      this.currentPhoto = this.photoList[0]["link_photo"];
      this.authorPhoto = this.photoList[0]["login_user"];
      console.log(this.authorPhoto);
    });
  }

  swipeEvent(e){
    if (e.direction == 2) {
      console.log("swipe");
      this.photoList.splice(0,1);
      this.currentPhoto = this.photoList[0]["link_photo"];
      this.authorPhoto = this.photoList[0]["login_user"];
      // console.log(e)
      // console.log(e.distance);
        //direction 2 = right to left swipe.
    }

    if (e.direction == 4) {
      console.log("swipe");
      this.photoList.splice(0,1);
      this.currentPhoto = this.photoList[0]["link_photo"];
      this.authorPhoto = this.photoList[0]["login_user"];
        //direction 2 = right to left swipe.
    }
  }

  load(page: any){
      this.nav.setRoot(page);
  }
  clickProfile(){
    this.nav.push(ProfilePage,{
      user:this.authorPhoto,
    });
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
