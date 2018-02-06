import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, LoadingController } from 'ionic-angular';
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
  constructor(public navCtrl: NavController,  public alert:AlertController , private postDataProvider:PostDataProvider, private storage:Storage,
  public loading:LoadingController) {
  }

  connexion(){
    let myData = JSON.stringify({login:this.login,
                                 mdp:this.mdp});
    let link = "http://fiber-app.com/SERVER/connexion.php";
    let req = this.postDataProvider.postData(link,myData);
    var loading = this.loading.create({
      content: "Envoi des données"
    });
    loading.present();
    req.subscribe(data=>{
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
      console.log(this.response);
      if(this.response == 1){

        let alert = this.alert.create({
           title: 'Erreur',
           subTitle: 'Login ou mail inexsitant!',
           buttons: ['OK']
         });
         alert.present();
      } else{
        let alert = this.alert.create({
           title: 'Erreur',
           subTitle: 'Mot de passe incorrect',
           buttons: ['OK']
         });
         alert.present();
      }
    });
  }

  popView(){
     this.navCtrl.pop();
   }
}
