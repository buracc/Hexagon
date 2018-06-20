import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Http } from '@angular/http';
import { Platform } from 'ionic-angular';
import 'rxjs/Rx';

@Injectable()
export class TeamService {

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
        this.url = this.api.url + "team/get/";
    }

    getteamswithpoints() {
        return this.http.get(this.url + "pts")
        .map(res => res.json());
    }

    getpointsperteam(id) {
        return this.http.get(this.url + "pts/" + id)
        .map(res => res.json());
    }

}