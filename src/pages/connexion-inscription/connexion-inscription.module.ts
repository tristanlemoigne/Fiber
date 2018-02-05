import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConnexionInscriptionPage } from './connexion-inscription';
import { InscriptionPage } from "../inscription/inscription";
import { ConnexionPage } from "../connexion/connexion";

@NgModule({
  declarations: [
    ConnexionInscriptionPage,
  ],
  imports: [
    IonicPageModule.forChild(ConnexionInscriptionPage),
  ],
})
export class ConnexionInscriptionPageModule {}
