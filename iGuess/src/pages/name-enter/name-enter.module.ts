import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NameEnterPage } from './name-enter';

@NgModule({
  declarations: [
    NameEnterPage,
  ],
  imports: [
    IonicPageModule.forChild(NameEnterPage),
  ],
})
export class NameEnterPageModule {}
