import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AccueilPage } from '../accueil/accueil';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GetDataProvider } from '../../providers/get-data/get-data';
import { Geolocation } from '@ionic-native/geolocation';
import { ProfilePage } from '../profile/profile';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the FiltresPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-filtres',
  templateUrl: 'filtres.html',
})
export class FiltresPage implements OnInit{

  public vetement:any;
  public motif:any;
  public couleur:any;
  public prix:number;
  public magasin:string;
  public key:string='AIzaSyDIXgIkeXIofkhvFOblJZ0DnwDKQjXtc4Y';
  public lat:any;
  public long:any;
  public propositions:any;
  public getUserName:string;
  public userList:any;
  public token:string;
  public styles:any;
  public occasions:any;
  public saisons:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public getDataProvider:GetDataProvider, private location:Geolocation,
  private storage:Storage) {
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
    if(this.magasin!=""){
      //let headers = new HttpHeaders().set("Access-Control-Allow-Origin","*");
      let url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location="+this.lat+","+this.long+
      "&radius=5000&type=clothing_store&keyword="+this.magasin+"&key="+this.key;
      //headers makes 2 requests wtf ?
      let promise = this.getDataProvider.getData(url);
      promise.subscribe(data=>{
        //console.log(data["results"]);
        if(data["status"]=="ZERO_RESULTS"){
          this.propositions[0] = "Pas de résultats";
        } else{
          for(let i =0; i<data["results"].length;i++){
            this.propositions[i] = data["results"][i].name+ " " +data["results"][i].vicinity;
          }
        }
      })
    }
  }
  selectMagasin(prop){
    this.magasin = prop;
    this.propositions = [];
  }
  getUser(){
    if(this.getUserName == ""){
      this.userList = [];
    } else{
      let url = "http://fiber-app.com/SERVER/getUserList.php?username="+this.getUserName;
      let promise = this.getDataProvider.getData(url);
      promise.subscribe(data=>{
        this.userList=data;
      });
    }
  }

  selectUser(user){
    this.navCtrl.setRoot(ProfilePage,{
      user:user[0],
      userID:user[1]
    });
  }
  filtrer(){
    this.storage.get("token").then((val) => {
      this.token = val;
      let headers = new HttpHeaders().set("Authorization","Bearer "+this.token);
      let link =
      "http://fiber-app.com/SERVER/getPhotoFiltrees.php?style="+this.styles+"&occasion="+this.occasions+"&saison="+this.saisons+
      "&couleur="+this.couleur+"&motif="+this.motif+"&vetement="+this.vetement+"&prix="+this.prix;
      let req = this.getDataProvider.getData(link,{headers});
      req.subscribe(data=>{
        console.log(data);
      });
    });
  }
  popView(){
    this.navCtrl.setRoot(AccueilPage)
  }
}
