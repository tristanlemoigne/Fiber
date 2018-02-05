import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AccueilPage } from './accueil';

import { FiltresPage } from '../filtres/filtres';

@NgModule({
  declarations: [
    AccueilPage,
    FiltresPage,
  ],
  imports: [
    IonicPageModule.forChild(AccueilPage),
    FiltresPage,
  ],
})
export class AccueilPageModule {}
