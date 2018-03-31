import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';


import { ProfilePage } from '../profile/profile';



@IonicPage()
@Component({
  selector: 'page-selected-photo',
  templateUrl: 'selected-photo.html',
})
export class SelectedPhotoPage {
  public imageSelectionne:string;


  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController) {
    this.imageSelectionne = this.navParams.get('imageSelectionne');
  }

  popView(){
    this.navCtrl.setRoot(ProfilePage);
  }

  supprimerPhoto(){
    let alert = this.alertCtrl.create({
      title: 'Confirmer la suppression',
      message: 'Supprimer cette photo ?',
      buttons: [
        {
          text: 'Ne pas supprimer',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Supprimer',
          handler: () => {
            console.log("suppression de la photo")    // SUPPRIMER LA PHOTO DE LA BDD
            this.popView()
          }
        }
      ]
    });
    alert.present();
  }





}
