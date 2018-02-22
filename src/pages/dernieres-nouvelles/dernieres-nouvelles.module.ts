import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DernieresNouvellesPage } from './dernieres-nouvelles';

@NgModule({
  declarations: [
    DernieresNouvellesPage,
  ],
  imports: [
    IonicPageModule.forChild(DernieresNouvellesPage),
  ],
})
export class DernieresNouvellesPageModule {}
