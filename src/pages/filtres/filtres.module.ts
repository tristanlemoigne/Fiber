import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FiltresPage } from './filtres';

@NgModule({
  declarations: [
    FiltresPage,
  ],
  imports: [
    IonicPageModule.forChild(FiltresPage),
  ],
})
export class FiltresPageModule {}
