import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConnexionPage } from './connexion';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ConnexionPage,
  ],
  imports: [
    IonicPageModule.forChild(ConnexionPage),
    FormsModule
  ],
})
export class ConnexionPageModule {}
