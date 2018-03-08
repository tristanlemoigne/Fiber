import { Component, OnInit} from '@angular/core';
import { IonicPage, NavController, NavParams  } from 'ionic-angular';
import { GetDataProvider } from '../../providers/get-data/get-data';
import { Geolocation } from '@ionic-native/geolocation';
import { HttpClient, HttpHeaders } from '@angular/common/http';


/**
 * Generated class for the TagPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tag',
  templateUrl: 'tag.html',
})
export class TagPage implements OnInit {

  public vetement:string;
  public motif:string;
  public couleur:string;
  public prix:number;
  public magasin:string;
  public key:string='AIzaSyDIXgIkeXIofkhvFOblJZ0DnwDKQjXtc4Y';
  public lat:any;
  public long:any;
  public propositions:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public getDataProvider:GetDataProvider, private location:Geolocation) {
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
    "&radius=2000&type=clothing_store&keyword="+this.magasin+"&key="+this.key;
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
  envoiTag(){
    alert("hey");
  }

}
