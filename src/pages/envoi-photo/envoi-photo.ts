import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { FileTransfer, FileUploadOptions, FileTransferObject  } from '@ionic-native/file-transfer';
import { GetDataProvider } from '../../providers/get-data/get-data';
import { Geolocation } from '@ionic-native/geolocation';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { Instagram } from '@ionic-native/instagram';
import { AccueilPage } from '../accueil/accueil';

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
  public vetement:string;
  public motif:string;
  public couleur:string;
  public prix:number;
  public magasin:string;
  public key:string='AIzaSyDIXgIkeXIofkhvFOblJZ0DnwDKQjXtc4Y';
  public lat:any;
  public long:any;
  public propositions:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public transfer:FileTransfer, public storage:Storage,
  public instagram:Instagram, public loading:LoadingController, public alert:AlertController, public getDataProvider:GetDataProvider,
  private location:Geolocation) {
    this.imageTaken = this.navParams.get('base64Image');
    this.imageGallery = this.navParams.get('imageSrc');
  }

  ngOnInit(){
    this.location.getCurrentPosition().then((resp) => {
      this.lat = resp.coords.latitude
      this.long = resp.coords.longitude
    }).catch((error) => {
      alert('Error getting location'+error);
    });
  }


  callMaps(){
    this.propositions=[];
    let headers = new HttpHeaders().set("Access-Control-Allow-Origin","*");
    let url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location="+this.lat+","+this.long+
    "&radius=10000&type=clothing_store&keyword="+this.magasin+"&key="+this.key;
    let promise = this.getDataProvider.getData(url,{headers});
    promise.subscribe(data=>{
      //console.log(data["results"]);
      for(let i =0; i<data["results"].length;i++){
        this.propositions[i] = data["results"][i].name+ " " +data["results"][i].vicinity;
      }

      /*for(let i=0;i<data.results.length;i++){

      }
      data.results*/
    })
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

  popView(){
    this.navCtrl.setRoot(AccueilPage)
  }
}
