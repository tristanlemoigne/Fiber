import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { HttpClient,HttpHeaders } from '@angular/common/http';
import { AccueilPage } from '../accueil/accueil';


import { GetDataProvider } from '../../providers/get-data/get-data';
import { Storage } from '@ionic/storage';


@IonicPage()
@Component({
  selector: 'page-support',
  templateUrl: 'support.html',
})
export class SupportPage {

  public userMail: string;
  public login: string;
  public object: string;
  public question: string;
  public token:string;




  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HttpClient, private getDataProvider:GetDataProvider, private storage:Storage) {
  }

  onSubmit(){
    this.storage.get("token").then((val) => {
        this.token = val;
        let headers = new HttpHeaders().set("Authorization","Bearer "+this.token);
        let link = "http://fiber-app.com/SERVER/profile.php";
        let req = this.getDataProvider.getData(link,{headers});
        req.subscribe(data=>{
          console.log(data);
          this.userMail = data[1]["mail"];
          this.login = data[1]["login"];
          console.log(this.login)
          console.log(this.userMail)

          let myData = JSON.stringify({
            userMail: this.userMail,
            object:this.object,
            question:"L'utilisateur " + this.login + " a une question : " + this.question});

          this.http.post("http://fiber-app.com/SERVER/support.php",myData).subscribe(data => {
            alert("Message envoyé");
            this.navCtrl.setRoot(AccueilPage);
          })
        })
    });




  }

  popView(){
    this.navCtrl.setRoot(AccueilPage);
  }


  // $http({
  //     method: 'POST',
  //     url: 'http://your.server.com/sendmail.php',
  //     data: { mailTo: 'contact@fiber-app.com', msg: 'hello!' }
  // }).then(function successCallback(response) {
  //     alert("msg sent!");
  // }, function errorCallback(response) {
  //     alert("error with sending a msg");
  // });
  //


}
