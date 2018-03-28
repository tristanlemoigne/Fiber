import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController  } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { EnvoiPhotoPage } from '../envoi-photo/envoi-photo';
import { Crop } from '@ionic-native/crop';
import { Base64 } from '@ionic-native/base64';

import { FiltresPage } from '../filtres/filtres';
import { ProfilePage } from '../profile/profile';
import { AccueilPage } from '../accueil/accueil';


@IonicPage()
@Component({
  selector: 'page-take-photo',
  templateUrl: 'take-photo.html',
})

export class TakePhotoPage {
  public imageSrc: string;
  public imageCroped: any;
  public imagePath: string;
  public filtresPage = FiltresPage;
  public profilPage = ProfilePage;
  public takePhotoPage = TakePhotoPage;


  constructor(public navCtrl: NavController, public navParams: NavParams, private camera: Camera, private alertCtrl: AlertController, public crop: Crop, public base64: Base64) {
  }

  public photos: any;
  public base64Image: any;

  takePhoto(): Promise<any>{
    const options: any = {
      destinationType: this.camera.DestinationType.FILE_URI,
			mediaType: this.camera.MediaType.ALLMEDIA,
			encodingType: this.camera.EncodingType.JPEG,
      allowEdit: false,
			correctOrientation: true,
    }

	  return this.camera.getPicture(options).then((fileUri) => {
      // fileUri = 'file://' + fileUri;
      // fileUri = fileUri.reverse();
      return this.crop.crop('file://' + fileUri, {quality:100,  targetWidth: -1, targetHeight: -1});
    })
    .then((path) => {
      return this.navCtrl.setRoot(EnvoiPhotoPage, {
              base64Image: path,
            });
    });
  }

  // this.base64.encodeFile(path).then((base64File: string) => {
  //   this.navCtrl.push(EnvoiPhotoPage, {
  //     base64Image: base64File,
  //   });
  // }, (err) => {
  //   console.log(err);
  // });


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

    this.camera.getPicture(cameraOptions).then((file_uri) => {
      return this.crop.crop('file://' + file_uri, {quality:100,  targetWidth: -1, targetHeight: -1});

    })
    .then((path) => {
      return this.navCtrl.setRoot(EnvoiPhotoPage, {
              base64Image: path,
            });
    });
  }

  load(page: any){
      this.navCtrl.setRoot(page);
  }

  popView(){
    this.navCtrl.setRoot(AccueilPage)
  }



}
