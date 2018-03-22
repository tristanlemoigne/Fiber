import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AccueilPage } from '../accueil/accueil';


/**
 * Generated class for the DernieresNouvellesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dernieres-nouvelles',
  templateUrl: 'dernieres-nouvelles.html',
})
export class DernieresNouvellesPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DernieresNouvellesPage');
  }

}
