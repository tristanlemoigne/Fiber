import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { ProfilePage } from '../profile/profile';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FileTransfer, FileUploadOptions, FileTransferObject  } from '@ionic-native/file-transfer';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { Crop } from '@ionic-native/crop';
import { PostDataProvider } from '../../providers/post-data/post-data';
import { GetDataProvider } from '../../providers/get-data/get-data';



@IonicPage()
@Component({
  selector: 'page-modif-profil',
  templateUrl: 'modif-profil.html',
})
export class ModifProfilPage implements OnInit{
  public userPhoto:boolean = false;
  public token:string;
  public idPhoto:any;
  public newLogin:any;
  public newMail:any;
  public newSex:any;
  public newSite:any;
  public newBio:any;
  public oldLogin:any;
  public oldMail:any;
  public oldSex:any;
  public oldSite:any;
  public oldBio:any;
  public placeholderSite:any;
  public placeholderBio:any;
  public test:any;
  public oldPhoto:any;
  public newPhoto:any;
  public response:any;


  constructor(public navCtrl: NavController, public navParams: NavParams,
              private camera: Camera, public crop: Crop, public transfer:FileTransfer,
              public storage:Storage, public loading:LoadingController, public postData:PostDataProvider,
              public alert:AlertController, private getData:GetDataProvider) {
  }

  popView(){
    this.navCtrl.setRoot(ProfilePage);
  }
  ngOnInit(){
    this.storage.get("token").then((val) => {
        this.token = val;
        let headers = new HttpHeaders().set("Authorization","Bearer "+this.token);
        let link = "http://fiber-app.com/SERVER/getInfo.php";
        let req = this.getData.getData(link,{headers});
        req.subscribe(data=>{
          this.newLogin = data["login_user"];
          this.newBio = data["bio_user"];
          this.newMail = data["mail_user"];
          this.newSex = data["sex_user"];
          this.newSite = data["website_user"];
          this.newPhoto = data["photo_user"];
          this.oldLogin = this.newLogin;
          this.oldBio = this.newBio;
          this.oldMail = this.newMail;
          this.oldSex = this.newSex;
          this.oldSite = this.newSite;
          this.oldPhoto = this.newPhoto;
          if(this.newSite ==""){
            this.placeholderSite = "Adresse de votre site web";
          }
          if(this.newSex == "0"){
            this.newSex = "Sexe";
          } else{
            switch(this.newSex){
              case 1:
                this.newSex = "Femme"
                break;
              case 2:
                this.newSex = "Homme";
                break;
              case 3:
                this.newSex = "Autre";
                break;
            }
          }
          if(this.newBio == ""){
            this.placeholderBio = "Votre biographie";
          }
          if(this.newPhoto != ""){
            this.userPhoto = true;
          }
        });

    });
  }


  modifier(){
    this.storage.get("token").then((val) => {
        this.token = val;
        let headers = new HttpHeaders().set("Authorization","Bearer "+this.token);
        let mydata = JSON.stringify({newLogin: this.newLogin,
                                     newMail: this.newMail,
                                     newSex: this.newSex,
                                     newBio: this.newBio,
                                     newSite: this.newSite,
                                     newPhoto: this.newPhoto,
                                     oldLogin: this.oldLogin,
                                     oldBio: this.oldBio,
                                     oldMail: this.oldMail,
                                     oldSex: this.oldSex,
                                     oldPhoto : this.oldPhoto,
                                     oldSite: this.oldSite});
        let link = "http://fiber-app.com/SERVER/updateInfo.php";
        let req = this.postData.postData(link,mydata,{headers});
        var loading = this.loading.create({
          content: "Enregistrement des informations"
        });
        loading.present();
        req.subscribe(data => {
          loading.dismiss();
          let failTab = [];
          let fail = false;
          this.test = data;
          for(let i=0;i<this.test.length;i++){
            if(!data[i]){
              fail = true;
              failTab.push(i);
            }
          }
          if(fail){
            let message = "";
            for(let i=0;i<failTab.length;i++){
              switch(failTab[i]){
                case 0:
                  message = message+"Login ";
                  this.newLogin = this.oldLogin;
                  break;
                case 1:
                  message = message+"Mail ";
                  this.newMail = this.oldMail;
                  break;
                case 2:
                  message = message+"Bio ";
                  this.newBio = this.oldBio;
                  break;
                case 3:
                  message = message+"Sexe ";
                  this.newSex = this.oldSex;
                  break;
                case 4:
                  message = message+"Site ";
                  this.newSite = this.oldSite;
                  break;
              }
            }
            let alert = this.alert.create({
             title: 'Informations non modifées :',
             subTitle: message,
             buttons: ["OK"]});
             alert.present();
          }
          else{
            let alert = this.alert.create({
             title: 'Informations modifiées !',
             buttons: ["OK"]});
             alert.present();
          }

        });
    });

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
      this.newPhoto = path;
      this.userPhoto = true;
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
          content: "Enregistrement de la photo"
        });
        loading.present();

        fileTransfer.upload(path,
          'http://fiber-app.com/SERVER/updatePhoto.php', options)
        .then((data)=>{
           loading.dismiss();
           this.response = data.response;
           if(this.response == 1){
             let alertPanel = this.alert.create({
                title: 'Enregistrée !',
                subTitle: 'Photo de profil enregistrée',
                buttons: ["OK"]});

              alertPanel.present();
           } else{
             let alertPanel = this.alert.create({
                title: 'Erreur',
                subTitle: 'Une erreur est survenue',
                buttons: ["OK"]});

              alertPanel.present();
           }
            this.navCtrl.setRoot(ProfilePage);

        }, (err) => {
          alert("Erreur"+JSON.stringify(err));
        });

      });
    });
  }

}
