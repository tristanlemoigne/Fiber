import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { HttpClient } from '@angular/common/http';
import { AccueilPage } from '../accueil/accueil';




/**
 * Generated class for the SupportPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-support',
  templateUrl: 'support.html',
})
export class SupportPage {

  public userMail: string;
  public object: string;
  public question: string;



  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HttpClient) {
  }

  onSubmit(){
    // let email = {
    //   to: 'contact@fiber-app.com',
    //   subject: this.object, //input
    //   body: this.question, ///input
    //   isHtml: true
    // };
    // this.emailComposer.open(email);
    //
    //
    let myData = JSON.stringify({
      userMail: this.userMail,
      object:this.object,
      question:this.question});

    this.http.post("http://fiber-app.com/SERVER/support.php",myData).subscribe(data => {
      alert("Message envoyé");
      this.navCtrl.setRoot(AccueilPage);
    })

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
