import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Http } from '@angular/http';
import { Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import 'rxjs/Rx';

@Injectable()
export class UserService {
    url: String;
    http: any;
    nick: String;
    pts: number;

    constructor(
        http: Http,
        public api: ApiService,
        public platform: Platform,
        public storage: Storage,
    ) {
        this.http = http;
        this.url = this.api.url + "user/get/";
    }

    getbyname(name) {
        return this.http.get(this.url + 'name/' + name)
            .map(res => res.json());
    }

    getallplayers() {
        return this.http.get(this.url + 'all')
            .map(res => res.json());
    }

    getUser(): Promise<any> {
        var promise = this.storage.get('user');
        return promise;
    }

    clear_storage() {
        this.storage.clear();
    }

    get_userpreds(id) {
        return this.http.get(this.api.url + 'userpreds/get/' + id)
            .map(res => res.json());
    }

    storeUser(user) {
        this.storage.set('user', {
            id: user.id,
            name: user.name,
            pts: user.pts,
            Team_id: user.Team_id,
        });
    }

}