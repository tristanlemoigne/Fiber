import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController  } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { EnvoiPhotoPage } from '../envoi-photo/envoi-photo';

import { FiltresPage } from '../filtres/filtres';
import { ProfilePage } from '../profile/profile';
import { AccueilPage } from '../accueil/accueil';


@IonicPage()
@Component({
  selector: 'page-take-photo',
  templateUrl: 'take-photo.html',
})

export class TakePhotoPage {
  private imageSrc: string;
  public filtresPage = FiltresPage;
  public profilPage = ProfilePage;
  public takePhotoPage = TakePhotoPage;


  constructor(public navCtrl: NavController, public navParams: NavParams, private camera: Camera, private alertCtrl: AlertController) {
  }

  public photos: any;
  public base64Image: string;


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

       this.navCtrl.push(EnvoiPhotoPage, {
         base64Image: this.base64Image,
       });
       // this.photos.reverse();
      }, (err) => {
       // Handle error
      });
  }


  private openGallery (): void {
    let cameraOptions = {
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.FILE_URI,
      quality: 100,
      targetWidth: 1000,
      targetHeight: 1000,
      encodingType: this.camera.EncodingType.JPEG,
      correctOrientation: true,
    }

    this.camera.getPicture(cameraOptions).then(file_uri => {
      this.imageSrc = file_uri;

      this.navCtrl.push(EnvoiPhotoPage, {
        imageSrc: this.imageSrc,
      });

    }, (err) => {
      console.log(err);
    });
  }

  load(page: any){
      this.navCtrl.setRoot(page);
  }

  popView(){
    this.navCtrl.setRoot(AccueilPage)
  }



}
