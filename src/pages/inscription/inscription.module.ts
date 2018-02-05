import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InscriptionPage } from './inscription';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    InscriptionPage,
  ],
  imports: [
    IonicPageModule.forChild(InscriptionPage),
    FormsModule
  ],
})
export class InscriptionPageModule {}
