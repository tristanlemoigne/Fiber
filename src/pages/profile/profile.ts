import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GetDataProvider } from '../../providers/get-data/get-data';
import { Storage } from '@ionic/storage';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RequestOptions } from '@angular/http';
import { TabsPage } from '../tabs/tabs';

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
  public token:string;
  public photos:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private getDataProvider:GetDataProvider, private storage:Storage) {
    this.user = this.navParams.get('user');
  }

  ngOnInit(){
    //si c'est l'utilisateur actuel
    if(this.user == undefined){
      this.user="";
      console.log("aaa");
      this.storage.get("token").then((val) => {
          this.token = val;
          let headers = new HttpHeaders().set("Authorization","Bearer "+this.token);
          let link = "http://fiber-app.com/SERVER/profile.php";
          let req = this.getDataProvider.getData(link,{headers});
          req.subscribe(data=>{
            console.log(data);
            this.photos=data[0];
            this.user = data[1]["login"];

            //data[1] = le token
          })
      });
    } else{
      console.log("ooo");
      this.storage.get("token").then((val) => {
          this.token = val;
          let headers = new HttpHeaders().set("Authorization","Bearer "+this.token);

          let link = "http://fiber-app.com/SERVER/profile.php"+"?username="+this.user;
          let req = this.getDataProvider.getData(link,{headers});
          req.subscribe(data=>{
            console.log(data);
            this.photos=data[0];
            //data[1] = le token
          })
      });
    }



  }

  popView(){
    this.navCtrl.setRoot(TabsPage);
   }


}
