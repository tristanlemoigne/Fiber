import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProfilePage } from '../profile/profile';


@IonicPage()
@Component({
  selector: 'page-modif-profil',
  templateUrl: 'modif-profil.html',
})
export class ModifProfilPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModifProfilPage');
  }

  popView(){
    this.navCtrl.setRoot(ProfilePage);
  }

}
