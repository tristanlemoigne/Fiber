import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import { AccueilPage } from '../pages/accueil/accueil';
import { FiltresPage } from '../pages/filtres/filtres';
import { SupportPage } from '../pages/support/support';
import { ProfilePage } from '../pages/profile/profile';
import { TakePhotoPage } from '../pages/take-photo/take-photo';
import { EnvoiPhotoPage } from '../pages/envoi-photo/envoi-photo';
import { TabsPage } from '../pages/tabs/tabs';
import { ConnexionPage } from '../pages/connexion/connexion';
import { InscriptionPage } from '../pages/inscription/inscription';
import { DernieresNouvellesPage } from '../pages/dernieres-nouvelles/dernieres-nouvelles';
import { ConnexionInscriptionPage } from '../pages/connexion-inscription/connexion-inscription';
import { ComPredefiniPage } from '../pages/com-predefini/com-predefini';
import { SettingsService } from '../services/settings';
import { PostDataProvider } from '../providers/post-data/post-data';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { GetDataProvider } from '../providers/get-data/get-data';

@NgModule({
  declarations: [
    MyApp,
    AccueilPage,
    FiltresPage,
    TabsPage,
    InscriptionPage,
    SupportPage,
    ConnexionPage,
    ConnexionInscriptionPage,
    ProfilePage,
    ComPredefiniPage,
    TakePhotoPage,
    EnvoiPhotoPage,
    DernieresNouvellesPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AccueilPage,
    FiltresPage,
    TabsPage,
    SupportPage,
    ConnexionInscriptionPage,
    InscriptionPage,
    ConnexionPage,
    ProfilePage,
    ComPredefiniPage,
    TakePhotoPage,
    EnvoiPhotoPage,
    DernieresNouvellesPage

  ],
  providers: [
    StatusBar,
    SplashScreen, Camera,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SettingsService,
    PostDataProvider,
    GetDataProvider,
  ]
})
export class AppModule {}
