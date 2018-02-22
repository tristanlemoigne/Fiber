import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TakePhotoPage } from './take-photo';

@NgModule({
  declarations: [
    TakePhotoPage,
  ],
  imports: [
    IonicPageModule.forChild(TakePhotoPage),
  ],
})
export class TakePhotoPageModule {}
