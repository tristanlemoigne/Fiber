import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FileTransfer, FileUploadOptions, FileTransferObject  } from '@ionic-native/file-transfer';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public transfer:FileTransfer) {
    this.imageTaken = this.navParams.get('base64Image');
    this.imageGallery = this.navParams.get('imageSrc');
  }
  envoyer(){
    if(this.imageTaken){
      let fileTransfer: FileTransferObject = this.transfer.create();
      let options: FileUploadOptions = {
        fileKey: 'file',
        fileName:"test.jpg"
      }
      fileTransfer.upload(this.imageTaken, 'http://fiber-app.com/SERVER/postPhoto.php', options)
      .then((data)=>{
        alert("success");
      }, (err) => {
        alert("Erreur"+JSON.stringify(err));
      });
    }
    if(this.imageGallery){

    }
    let link = "http://fiber-app.com/SERVER/postPhoto.php";

  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad EnvoiPhotoPage');
  }

}
