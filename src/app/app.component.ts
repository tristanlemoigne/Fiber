import { Component, ViewChild, OnInit } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { NavController} from 'ionic-angular';
import { MenuController} from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { FiltresPage } from '../pages/filtres/filtres';
import { ConnexionInscriptionPage } from '../pages/connexion-inscription/connexion-inscription';
import { AccueilPage } from '../pages/accueil/accueil';

import { DernieresNouvellesPage } from '../pages/dernieres-nouvelles/dernieres-nouvelles';
import { SupportPage } from '../pages/support/support';


@Component({
  templateUrl: 'app.html'
})

export class MyApp implements OnInit {
  public afficheConnexion:boolean = false;
  public afficheAccueil:boolean = false;

  @ViewChild('content') nav: NavController
  public accueilPage = AccueilPage;
  public connexionInscriptionPage = ConnexionInscriptionPage;
  public supportPage = SupportPage;
  public dernieresNouvellesPage = DernieresNouvellesPage;

  constructor(platform: Platform, private menuCtrl: MenuController, statusBar: StatusBar, splashScreen: SplashScreen, private storage:Storage) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  ngOnInit(){
    //USE THIS LINE TO GET RID OF TOKEN FOR TEST ================ this.storage.remove("token");
    this.storage.get('token').then((tokenValue) => {
      console.log(tokenValue);
      if(tokenValue != null){
        this.afficheConnexion=false;
        this.afficheAccueil=true;
        console.log("token true");
      }
      else{
        this.afficheAccueil=false;
        this.afficheConnexion=true;
        console.log("token false");
      }
    });
  }

  onLoad(page: any){
      if(page === ConnexionInscriptionPage){
        console.log("coucou");
        this.storage.clear();
        this.menuCtrl.close();
        console.log(page);
        this.nav.setRoot(page);
        // this.nav.setRoot(page);
      } else {
        this.nav.setRoot(page);
        this.menuCtrl.close();
      }
  }
}
