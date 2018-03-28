import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { ProfilePage } from '../profile/profile';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FileTransfer, FileUploadOptions, FileTransferObject  } from '@ionic-native/file-transfer';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { Crop } from '@ionic-native/crop';
import { PostDataProvider } from '../../providers/post-data/post-data';



@IonicPage()
@Component({
  selector: 'page-modif-profil',
  templateUrl: 'modif-profil.html',
})
export class ModifProfilPage {
  public userPhoto:boolean = false;
  public token:string;
  public idPhoto:any;


  constructor(public navCtrl: NavController, public navParams: NavParams,
              private camera: Camera, public crop: Crop, public transfer:FileTransfer,
              public storage:Storage, public loading:LoadingController, public postData:PostDataProvider,
              public alert:AlertController) {
  }

  popView(){
    this.navCtrl.setRoot(ProfilePage);
  }


  private changePhoto (): void {
    let cameraOptions = {
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.FILE_URI,
      quality: 100,
      targetWidth: 1000,
      targetHeight: 1000,
      encodingType: this.camera.EncodingType.JPEG,
      correctOrientation: true,
    }

    this.camera.getPicture(cameraOptions).then((file_uri) => {
      return this.crop.crop('file://' + file_uri, {quality:100,  targetWidth: -1, targetHeight: -1});

    })
    // PATH = PHOTO PRISE APRES CROP
    .then((path) => {
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
        fileTransfer.upload(path,
          'http://fiber-app.com/SERVER/postPhoto.php?occasion=')  //ATTENTION ICI ?
        .then((data)=>{
           loading.dismiss();
           this.idPhoto = data.response;
           let headers = new HttpHeaders().set("Authorization","Bearer "+this.token);
           let mydata = JSON.stringify({idPhoto:this.idPhoto});
           let link = "http://fiber-app.com/SERVER/postVetement.php"; // ICI AUSSI ?
           let req = this.postData.postData(link,mydata,{headers});
           req.subscribe(data => {
           },
           (err)=>{
             alert(err.message);
           },()=>{
             let alert = this.alert.create({
                title: 'Enregistrée !',
                subTitle: 'Photo de profil enregistrée',
                buttons: ["OK"]});

              alert.present();
              this.navCtrl.setRoot(ProfilePage);
           });

        }, (err) => {
          alert("Erreur"+JSON.stringify(err));
        });

      });
    });
  }

}
