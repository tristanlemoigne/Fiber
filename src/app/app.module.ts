import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { IonicStorageModule } from '@ionic/storage';
import { Crop } from '@ionic-native/crop';
import { Base64 } from '@ionic-native/base64';
import { FileTransfer, FileUploadOptions, FileTransferObject  } from '@ionic-native/file-transfer';
import { Instagram } from '@ionic-native/instagram';
import { Geolocation } from '@ionic-native/geolocation';
import { MyApp } from './app.component';
import { AccueilPage } from '../pages/accueil/accueil';
import { FiltresPage } from '../pages/filtres/filtres';
import { SupportPage } from '../pages/support/support';
import { ProfilePage } from '../pages/profile/profile';
import { ModifProfilPage } from '../pages/modif-profil/modif-profil';
import { TakePhotoPage } from '../pages/take-photo/take-photo';
import { EnvoiPhotoPage } from '../pages/envoi-photo/envoi-photo';
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
    InscriptionPage,
    SupportPage,
    ConnexionPage,
    ConnexionInscriptionPage,
    ProfilePage,
    ComPredefiniPage,
    TakePhotoPage,
    EnvoiPhotoPage,
    DernieresNouvellesPage,
    ModifProfilPage,
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
    SupportPage,
    ConnexionInscriptionPage,
    InscriptionPage,
    ConnexionPage,
    ProfilePage,
    ComPredefiniPage,
    TakePhotoPage,
    EnvoiPhotoPage,
    DernieresNouvellesPage,
    ModifProfilPage,

  ],
  providers: [
    StatusBar,
    SplashScreen, Camera,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SettingsService,
    PostDataProvider,
    GetDataProvider,
    FileTransfer,
    Instagram,
    Geolocation,
    Crop,
    Base64,
  ]
})
export class AppModule {}
