import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GetDataProvider } from '../../providers/get-data/get-data';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage implements OnInit {
  public user:string;
  constructor(public navCtrl: NavController, public navParams: NavParams, private getDataProvider:GetDataProvider) {
    this.user = this.navParams.get('user');
  }

  ngOnInit(){
    console.log(this.user);
  }


}
