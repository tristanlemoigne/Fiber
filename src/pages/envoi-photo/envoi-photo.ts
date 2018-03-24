import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { FileTransfer, FileUploadOptions, FileTransferObject  } from '@ionic-native/file-transfer';
import { Storage } from '@ionic/storage';
import { Instagram } from '@ionic-native/instagram';
import { AccueilPage } from '../accueil/accueil';
import { TagPage } from '../tag/tag';
/**
 * Generated class for the EnvoiPhotoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-envoi-photo',
  templateUrl: 'envoi-photo.html',
})
export class EnvoiPhotoPage {
  public imageTaken:string;
  public imageGallery:string;
  public token:string;
  public tags:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public transfer:FileTransfer, public storage:Storage,
  public instagram:Instagram, public loading:LoadingController, public alert:AlertController) {
    this.imageTaken = this.navParams.get('base64Image');
    this.imageGallery = this.navParams.get('imageSrc');
  }
  
  envoyer(){
    if(this.imageTaken){
      let fileTransfer: FileTransferObject = this.transfer.create();
      this.storage.get("token").then((val) =>{
        this.token=val;
        let options: FileUploadOptions = {
          fileKey: 'file',
          fileName:"test.jpg",
          params:{},
          headers:{Authorization: "Bearer "+this.token}
        }
        var loading = this.loading.create({
          content: "Envoi des données"
        });
        loading.present();
        fileTransfer.upload(this.imageTaken, 'http://fiber-app.com/SERVER/postPhoto.php', options)
        .then((data)=>{
          loading.dismiss();
          let alert = this.alert.create({
             title: 'Partagée !',
             subTitle: 'Photo partagée',
             buttons: ["OK"]
           });
           alert.present();
           this.navCtrl.setRoot(AccueilPage);
        }, (err) => {
          alert("Erreur"+JSON.stringify(err));
        });
      });

    }
    if(this.imageGallery){

    }
  }


  tag(){
    this.navCtrl.push(TagPage);
  }

  partager(){
    if(this.instagram.isInstalled()){
      if(this.imageTaken){
        let legende = prompt("Veuillez rentrer une légende : ");
        this.instagram.share(this.imageTaken,legende)
        .then(()=>alert("shared"))
        .catch((error:any)=>alert("error"));
      }
      if(this.imageGallery){

      }
    } else{
      alert("Veuillez installer l'application instagram");
    }

  }


}
