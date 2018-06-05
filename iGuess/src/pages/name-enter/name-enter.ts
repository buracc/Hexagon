import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { PredPage } from '../pred/pred';
import { ToastService } from '../../app/services/toast.service';
import { UserService } from '../../app/services/user.service';
import { RequestOptions, Http, Headers } from '@angular/http';
import { ApiService } from '../../app/services/api.service';

/**
 * Generated class for the NameEnterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-name-enter',
  templateUrl: 'name-enter.html',
})

export class NameEnterPage {

  nick: String;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public toastservice: ToastService, public loaderctrl: LoadingController,
    public userservice: UserService, public api: ApiService, public http: Http) {

  }

  //the button onclick method
  checknick() {
    if (this.nick == null) {
      this.toastservice.presenttoast("Please enter your name.");
    } else {
      let loader = this.loaderctrl.create({
        content: "Logging in..",
      });

      loader.present().then(() => {

        this.userservice.getbyname(this.nick).subscribe(response => {
          var user = response.user[0];
          if (typeof response.user[0] != 'undefined') {
            this.userservice.pts = user.pts;
            this.userservice.nick = user.name;
            this.gohome();
            this.toastservice.presenttoast("Welcome back " + this.userservice.nick + ".");
            this.userservice.storeUser(user);

          } else {
            var headers = new Headers();
            headers.append('Content-Type', 'application/json');
            let options = new RequestOptions({ headers: headers });

            let postParams = {
              "name": this.nick,
              "pts": 100
            }

            this.http.post(this.api.url + "user/new", postParams, options).subscribe(data => {
              this.toastservice.presenttoast("Successfully registered as " + this.nick + "!")
              
              this.userservice.pts = 100;
              this.userservice.nick = this.nick;
              this.userservice.getbyname(this.userservice.nick).subscribe(response => {
                this.userservice.storeUser(response.user[0]);
                this.gohome();
              })
            })
          }
          
          loader.dismiss();
        }, (err) => {
          this.toastservice.presenttoast("Connection error. Try again later.");
          loader.dismiss();
        })
      })
    }
  }


  gohome() {
    this.navCtrl.push(PredPage);
  }




}
