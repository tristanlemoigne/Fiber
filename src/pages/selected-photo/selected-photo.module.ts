import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SelectedPhotoPage } from './selected-photo';

@NgModule({
  declarations: [
    SelectedPhotoPage,
  ],
  imports: [
    IonicPageModule.forChild(SelectedPhotoPage),
  ],
})
export class SelectedPhotoPageModule {}
