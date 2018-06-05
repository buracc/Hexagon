import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Http } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class DbService {
    url: String;
    http: any;
    nick: String;
    pts: number;

    constructor(
        http: Http,
        public api: ApiService
    ) {
        this.http = http;
        this.url = this.api.url;
    }

    getallplayers() {
        return this.http.get(this.url + 'user/get/all')
            .map(res => res.json());
    }

    getallteams() {
        return this.http.get(this.url + 'team/get/all')
            .map(res => res.json());
    }

    getallbets() {
        return this.http.get(this.url + 'bet/get/all')
            .map(res => res.json());
    }

    getallbetters() {
        return this.http.get(this.url + 'pred/get/all')
            .map(res => res.json());
    }

}