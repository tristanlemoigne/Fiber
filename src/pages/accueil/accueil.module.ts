import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AccueilPage } from './accueil';

import { FiltresPage } from '../filtres/filtres';
import { ProfilePage } from '../profile/profile';
import { ComPredefiniPage } from '../com-predefini/com-predefini';

@NgModule({
  declarations: [
    AccueilPage,
    FiltresPage,
    ProfilePage,
    ComPredefiniPage
  ],
  imports: [
    IonicPageModule.forChild(AccueilPage),
    FiltresPage,
    ProfilePage,
    ComPredefiniPage
  ],
})
export class AccueilPageModule {}
