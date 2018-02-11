import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, LoadingController } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public alert:AlertController, public postDataProvider:PostDataProvider, private storage:Storage,
  public loading:LoadingController) {
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
    let req = this.postDataProvider.postData(link,mydata);
    var loading = this.loading.create({
      content: "Envoi des données"
    });
    loading.present();
    req.subscribe(data => {

      //PAREIL GERER ERREURS EN PHP VIA CODE POUR EVITER QUE LE TOKEN VAILLE AUTRE CHOSE QUE NULL MEME SI Y A UNE ERREUR
      this.response=data;
      if(typeof this.response == "string"){
        this.storage.set("token",data);
        this.storage.get("token").then((val) => {
            console.log('Your token is', val);
          });
      }
     },
     (err) => {
       let alert = this.alert.create({
          title: 'Erreur',
          subTitle: 'Erreur de connexion',
          buttons: ['OK']
        });
        alert.present();
	   },
     () => {
       loading.dismiss();
       if(typeof this.response == "string"){
         this.navCtrl.push(MyApp);
       } else{
         if(this.response == 1){
           let alert = this.alert.create({
              title: 'Erreur',
              subTitle: 'Login ou mail déjà enregistré!',
              buttons: ['OK']
            });
            alert.present();

         } else{
           let alert = this.alert.create({
              title: 'Erreur',
              subTitle: 'Erreur de connexion',
              buttons: ['OK']
            });
            alert.present();
         }
       }
     });
  }

  popView(){
    this.navCtrl.pop();
  }

}
