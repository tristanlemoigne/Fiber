import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the EnvoiPhotoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-envoi-photo',
  templateUrl: 'envoi-photo.html',
})
export class EnvoiPhotoPage {
  public imageTaken:string;
  public imageGallery:string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.imageTaken = this.navParams.get('base64Image');
    this.imageGallery = this.navParams.get('imageSrc');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EnvoiPhotoPage');
  }

}
