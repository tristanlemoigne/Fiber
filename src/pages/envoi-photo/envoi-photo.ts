import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FileTransfer, FileUploadOptions, FileTransferObject  } from '@ionic-native/file-transfer';
import { Storage } from '@ionic/storage';
import { Instagram } from '@ionic-native/instagram';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public transfer:FileTransfer, public storage:Storage,
  public instagram:Instagram) {
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
          headers:{Authorization: "Bearer "+this.token}
        }
        fileTransfer.upload(this.imageTaken, 'http://fiber-app.com/SERVER/postPhoto.php', options)
        .then((data)=>{
          let out = ' ';
          for (var i in data) {
            out += i + ": " + data[i] + "\n";
          }

          alert(out);
          alert("success");
        }, (err) => {
          alert("Erreur"+JSON.stringify(err));
        });
      });

    }
    if(this.imageGallery){

    }
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
  ionViewDidLoad() {
    console.log('ionViewDidLoad EnvoiPhotoPage');
  }

}
