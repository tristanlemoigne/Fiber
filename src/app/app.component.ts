import { Component, ViewChild, OnInit } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { FiltresPage } from '../pages/filtres/filtres';
import { SupportPage } from '../pages/support/support';
import { DernieresNouvellesPage } from '../pages/dernieres-nouvelles/dernieres-nouvelles';

import { ConnexionInscriptionPage } from '../pages/connexion-inscription/connexion-inscription';
import { NavController} from 'ionic-angular';
import { MenuController} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AccueilPage } from '../pages/accueil/accueil';

@Component({
  templateUrl: 'app.html'
})

export class MyApp implements OnInit {
  public filtrespage = FiltresPage;
  public supportPage = SupportPage;
  public dernieresNouvellesPage = DernieresNouvellesPage;

  public afficheConnexion:boolean = false;
  public afficheAccueil:boolean = false;

  @ViewChild('content') nav: NavController
  public accueilPage = AccueilPage;
  public connexionInscriptionPage = ConnexionInscriptionPage;

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
        this.nav.setRoot(AccueilPage);
        this.menuCtrl.close();
      }
  }
}
