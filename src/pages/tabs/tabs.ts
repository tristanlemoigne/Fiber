import { Component } from '@angular/core';
import { AccueilPage } from '../accueil/accueil';
import { ProfilePage } from '../profile/profile';
import { TakePhotoPage } from '../take-photo/take-photo';

import { NavController, AlertController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';

@Component({
  selector: 'page-tabs',
  template: `
     <ion-tabs no-border color="light" class="tabs-icon-top tabs-positive">
       <ion-tab [root]="accueilPage" tabIcon="profile"></ion-tab>
       <ion-tab [root]="takePhotoPage" tabIcon="photo" ></ion-tab>
     </ion-tabs>
  `
})

export class TabsPage {
  accueilPage = AccueilPage;
  profilePage = ProfilePage;
  takePhotoPage = TakePhotoPage;

  constructor(public navCtrl: NavController) {
  }


}
