import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AccueilPage } from '../accueil/accueil';
import { TabsPage } from '../tabs/tabs';


/**
 * Generated class for the FiltresPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-filtres',
  templateUrl: 'filtres.html',
})
export class FiltresPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FiltresPage');
  }

  popView(){
    this.navCtrl.setRoot(TabsPage);
   }

}
