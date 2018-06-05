import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import { ToastController } from 'ionic-angular';

@Injectable()
export class ToastService {

    constructor(public toastCtrl: ToastController) {

    }

    presenttoast(message) {
        let toast = this.toastCtrl.create({
            message: message,
            duration: 3000,
            position: 'top'
        });
        toast.present();
    }
}
