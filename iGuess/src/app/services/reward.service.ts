import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Http } from '@angular/http';
import { Platform } from 'ionic-angular';
import 'rxjs/Rx';

@Injectable()
export class RewardService {

    url: String;
    http: any;
    
    constructor(
        http: Http,
        public api: ApiService,
        public platform: Platform
    ) {
        this.http = http;
        this.url = this.api.url + "reward/get/";
    }

    getrewards() {
        return this.http.get(this.url + "all")
        .map(res => res.json());
    }

    getrewards_by_id(id) {
        var url = this.api.url + "userpurchases/get/";
        return this.http.get(url + id)
        .map(res => res.json());
    }
}