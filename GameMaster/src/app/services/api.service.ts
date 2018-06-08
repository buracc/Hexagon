import { Injectable } from '@angular/core';
import 'rxjs/Rx';

@Injectable()
export class ApiService {
    url: String;

    constructor() {
        this.url = "http://localhost:8084/GuessAPI/";
    }
}