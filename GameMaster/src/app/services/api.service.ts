import { Injectable } from '@angular/core';
import 'rxjs/Rx';

@Injectable()
export class ApiService {
    url: String;
    ip: String;
    apiport: number;

    constructor() {
        this.apiport = 8080;
        this.ip = "79.143.178.40"
        // this.ip = "145.28.155.219"

        this.url = "http://" + this.ip + ":" + this.apiport + "/GuessAPI/";
    }
}