import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModifProfilPage } from './modif-profil';

@NgModule({
  declarations: [
    ModifProfilPage,
  ],
  imports: [
    IonicPageModule.forChild(ModifProfilPage),
  ],
})
export class ModifProfilPageModule {}
