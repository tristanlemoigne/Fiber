import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EnvoiPhotoPage } from './envoi-photo';

@NgModule({
  declarations: [
    EnvoiPhotoPage,
  ],
  imports: [
    IonicPageModule.forChild(EnvoiPhotoPage),
  ],
})
export class EnvoiPhotoPageModule {}
