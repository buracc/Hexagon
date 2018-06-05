import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NameEnterPage } from '../name-enter/name-enter';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {
    
  }

  goNext() {
    this.navCtrl.push(NameEnterPage);
  }

}
