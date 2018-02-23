import { Component, ViewChild, OnInit } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
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
  tabsPage = TabsPage;
  filtrespage = FiltresPage;
  connexionInscriptionPage = ConnexionInscriptionPage;
  supportPage = SupportPage;
  dernieresNouvellesPage = DernieresNouvellesPage;

  afficheConnexion:boolean = false;
  afficheHome:boolean = false;

  // tokenValue:any;
  @ViewChild('nav') nav: NavController;
  public rootPage:any = ConnexionInscriptionPage;

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
      // this.tokenValue = val;
      console.log(tokenValue);
      if(tokenValue != null){
        this.afficheConnexion=false;
        this.afficheHome=true;
        console.log("token true");
      }
      else{
        this.afficheHome=false;
        this.afficheConnexion=true;
        console.log("token false");
      }
    });

    // REturn ou let boolean
  }

  onLoad(page: any){
      if(page === ConnexionInscriptionPage){
        this.storage.clear();
        this.menuCtrl.close();
        this.nav.setRoot(page);
      } else {
        this.nav.setRoot(page);
        this.menuCtrl.close();
      }
  }
}
