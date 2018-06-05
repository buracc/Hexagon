import { Injectable } from '@angular/core';
import 'rxjs/Rx';

@Injectable()
export class ApiService {
    url: String;

    constructor() {
        this.url = "http://145.28.223.96:8080/GuessAPI/";
    }
}