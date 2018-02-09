import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AccueilPage } from './accueil';

import { FiltresPage } from '../filtres/filtres';
import { ProfilePage } from '../profile/profile';

@NgModule({
  declarations: [
    AccueilPage,
    FiltresPage,
    ProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(AccueilPage),
    FiltresPage,
    ProfilePage
  ],
})
export class AccueilPageModule {}
