import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PostDataProvider } from '../../providers/post-data/post-data';
import { Storage } from '@ionic/storage';
import { TabsPage } from '../tabs/tabs';
import { MyApp } from '../../app/app.component';

/**
 * Generated class for the InscriptionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-inscription',
  templateUrl: 'inscription.html',
})
export class InscriptionPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public postDataProvider:PostDataProvider, private storage:Storage) {
  }
  public mdp:string = "";
  public mail:string = "";
  public login:string = "";
  public response:any;
  tabsPage = TabsPage
  inscription(){
    let mydata = JSON.stringify({login: this.login,
                                 mail: this.mail,
                                 mdp: this.mdp});
    let link = "http://fiber-app.com/SERVER/inscription_verif.php";
    this.postDataProvider.postData(link,mydata).subscribe(data => {
      //PAREIL GERER ERREURS EN PHP VIA CODE POUR EVITER QUE LE TOKEN VAILLE AUTRE CHOSE QUE NULL MEME SI Y A UNE ERREUR
      this.response=data;
      this.storage.set("token",data);
      this.storage.get("token").then((val) => {
          console.log('Your token is', val);
        });
     },
     (err) => {
	      console.log("Oooops!");
	   },
     () => {
       if(this.response != ""){
         this.navCtrl.push(MyApp);
       } else{
         this.navCtrl.push(MyApp);
       }
     });
  }
}
