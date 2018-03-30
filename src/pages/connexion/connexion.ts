import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, LoadingController } from 'ionic-angular';
import { PostDataProvider } from '../../providers/post-data/post-data';
import { Storage } from '@ionic/storage';
import { MyApp } from '../../app/app.component';


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
      content: "Connexion"
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
      if(typeof this.response == "string"){
        this.navCtrl.push(MyApp);
      } else{
        switch (this.response){
          case 1:
            let alert = this.alert.create({
               title: 'Erreur',
               subTitle: 'Tous les champs doivent être remplis',
               buttons: ['OK']
             });
             alert.present();
             break;
          case 2:
             alert = this.alert.create({
               title: 'Erreur',
               subTitle: 'Login ou mail inexistant',
               buttons: ['OK']
             });
             alert.present();
             break;
           case 3:
             alert = this.alert.create({
               title: 'Erreur',
               subTitle: 'Le mot de passe est incorrect',
               buttons: ['OK']
             });
             alert.present();
             break;
        }
      }
    });
  }

  popView(){
     this.navCtrl.pop();
   }

  togglePassword(){
     let passwordInput = document.getElementById("show-password");

     if(passwordInput.getAttribute("type") == "password"){
       passwordInput.removeAttribute("type");

     } else {
       passwordInput.setAttribute("type", "password");
     }
   }
}
