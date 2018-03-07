import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the TagPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tag',
  templateUrl: 'tag.html',
})
export class TagPage {

  public vetement:string;
  public motif:string;
  public couleur:string;
  public prix:number;
  public magasin:string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  envoiTag(){
    alert("hey");
  }

}
