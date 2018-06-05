import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Http } from '@angular/http';
import { Platform } from 'ionic-angular';
import 'rxjs/Rx';

@Injectable()
export class BetService {

    url: String;
    http: any;
    nick: String;
    pts: number;
    
    constructor(
        http: Http,
        public api: ApiService,
        public platform: Platform
    ) {
        this.http = http;
        this.url = this.api.url + "bet/get/";
    }

    getbets() {
        return this.http.get(this.url + "all")
        .map(res => res.json());
    }

}