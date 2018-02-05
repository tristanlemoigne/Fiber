import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PostDataProvider } from '../../providers/post-data/post-data';
import { Storage } from '@ionic/storage';
import { MyApp } from '../../app/app.component';
/**
 * Generated class for the ConnexionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-connexion',
  templateUrl: 'connexion.html',
})
export class ConnexionPage {
  public login:string="";
  public mdp:string="";
  public response:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private postDataProvider:PostDataProvider, private storage:Storage) {
  }

  connexion(){
    let myData = JSON.stringify({login:this.login,
                                 mdp:this.mdp});
    let link = "http://fiber-app.com/SERVER/connexion.php";
    this.postDataProvider.postData(link,myData).subscribe(data=>{
      //GERER LES ERREURS EN PHP POUR EVITER DE PUSH QUAND MEME LA PAGE LORSQUE DATA VAUT UNE ERREUR, UTILISER DES CODES MAYBE
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

  popView(){
     this.navCtrl.pop();
   }
}
