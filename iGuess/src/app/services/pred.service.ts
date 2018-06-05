import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Http } from '@angular/http';
import { Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import 'rxjs/Rx';

@Injectable()
export class PredService {

    url: String;
    http: any;
    
    constructor(
        http: Http,
        public api: ApiService,
        public platform: Platform,
        public storage: Storage
    ) {
        this.http = http;
        this.url = this.api.url + "pred/get/";
    }

    getpreds() {
        return this.http.get(this.url + "all")
        .map(res => res.json());
    }

    storePreds(pred) {
        this.storage.set('pred', {
            id: pred.id,
            amount: pred.amount,
            Bet_id: pred.Bet_id,
            User_id: pred.User_id
        });
    }

    getPreds(): Promise<any> {
        var promise = this.storage.get('pred');
        return promise;
    }

}