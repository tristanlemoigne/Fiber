import { Component } from '@angular/core';
import { AccueilPage } from '../accueil/accueil';
import { ProfilePage } from '../profile/profile';

import { NavController, AlertController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FiltresPage } from '../filtres/filtres';

@Component({
  selector: 'page-tabs',
  template: `
     <ion-tabs class="tabs-icon-top tabs-positive">

       <ion-tab [root]="accueilPage" tabIcon="profile"></ion-tab>
       <ion-tab (ionSelect)="takePhoto()" tabIcon="photo" ></ion-tab>
     </ion-tabs>
  `
})

export class TabsPage {
  accueilPage = AccueilPage;
  filtresPage = FiltresPage;
  profilePage = ProfilePage;
  public photos: any;
  public base64Image: string;

  constructor(public navCtrl: NavController, private camera: Camera, private alertCtrl: AlertController) {
  }


  takePhoto(){
     const options: CameraOptions = {
        quality: 50,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE
      }

      this.camera.getPicture(options).then((imageData) => {
       // imageData is either a base64 encoded string or a file URI
       // If it's base64:
       this.base64Image = 'data:image/jpeg;base64,' + imageData;
       this.photos.push(this.base64Image);
       this.photos.reverse();
      }, (err) => {
       // Handle error
      });
  }
}
