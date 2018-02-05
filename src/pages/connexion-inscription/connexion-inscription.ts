import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { InscriptionPage } from "../inscription/inscription";
import { ConnexionPage } from "../connexion/connexion";

/**
 * Generated class for the ConnexionInscriptionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-connexion-inscription',
  templateUrl: 'connexion-inscription.html',
})
export class ConnexionInscriptionPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  inscriptionPage = InscriptionPage;
  connexionPage = ConnexionPage;
  ionViewDidLoad() {
    console.log('ionViewDidLoad ConnexionInscriptionPage');
  }
  changePage(page:any){
    this.navCtrl.push(page);
  }

}
