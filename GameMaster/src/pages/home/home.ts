import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController } from 'ionic-angular';
import { Socket } from 'ng-socket-io';
import { DbService } from '../../app/services/db.service';
import { ToastService } from '../../app/services/toast.service';
import { RequestOptions, Http, Headers } from '@angular/http';
import { ApiService } from '../../app/services/api.service';

interface player {
  id: number,
  name: String,
  pts: number,
  Team_id: number
}

interface team {
  id: number,
  name: String
}

interface bet {
  id: number,
  name: String,
  multiplier: number
}

interface better {
  User_id: number
}

interface userpurchase {
  id: number,
  date: String,
  username: String,
  name: String,
  user_id: number,
  reward_id: number
}

interface userpred {

}

interface question {

}

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  players: player[];
  teams: team[];
  bets: bet[];
  betters: better[];
  userpurchases: userpurchase[];
  userpreds: userpred[];
  questions: question[];
  onlineusers: any[];

  constructor(public navCtrl: NavController, public toastservice: ToastService,
    public socket: Socket, public dbservice: DbService, public alertctrl: AlertController,
    public http: Http, public api: ApiService, public loaderctrl: LoadingController) {

      socket.on('admin', data => {
        this.onlineusers = data;

        if (data.msg == "refresh") {
          this.update();
        }
      })

      this.update();
  }

  print(data) {
    console.log(data);
  }

  send_message(message) {
    this.socket.emit('msg', {msg: "notification", notify: message});
  }

  trivia(question) {
    let loader = this.loaderctrl.create({
      content: "Loading..",
    });

    loader.present().then(() => {
      this.socket.emit("msg", {msg: "trivia", q: question});
      loader.dismiss();
    })
  }

  add_team(team, player) {

    let loader = this.loaderctrl.create({
      content: "Loading..",
    });

    loader.present().then(() => {

      var headers = new Headers();
      headers.append('Content-Type', 'application/json');
      let options = new RequestOptions({ headers: headers });

      let postParams = {
        "team_name": team,
        "name": player
      }

      this.http.post(this.api.url + "user/team", postParams, options).subscribe(data => {
        this.socket.emit("msg", { msg: "refresh" });
        loader.dismiss();
        this.toastservice.presenttoast("Moved " + player + " to team " + team);
      }, (err) => {
        loader.dismiss();
        this.toastservice.presenttoast("DB error");
      })
    })
  }

  bet_win(id, name) {
    let alert = this.alertctrl.create({
      title: "Confirm bet won",
      message: "Bet: <br>'" + name + "' <br>won?",

      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {

          }
        },
        {
          text: 'Yes',
          handler: data => {

            let loader = this.loaderctrl.create({
              content: "Loading..",
            });

            loader.present().then(() => {

              this.dbservice.getallbetters().subscribe(response => {
                this.socket.emit("msg", { msg: "won", btrs: response.pred, betid: id });

                loader.dismiss();
                this.toastservice.presenttoast("Bet result sent.");
              })
            })
          }
        }
      ]
    });
    alert.present();
  }

  bet_lose(id, name) {
    let alert = this.alertctrl.create({
      title: "Confirm bet lost",
      message: "Bet: <br>'" + name + "' <br>lost?",

      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {

          }
        },
        {
          text: 'Yes',
          handler: data => {
            let loader = this.loaderctrl.create({
              content: "Loading..",
            });

            loader.present().then(() => {

              this.dbservice.getallbetters().subscribe(response => {
                this.socket.emit("msg", { msg: "lost", btrs: response.pred, betid: id });

                loader.dismiss();
                this.toastservice.presenttoast("Bet result sent.");
              })
            })
          }
        }
      ]
    });
    alert.present();
  }

  odds_change(id, name, multiplier) {
    let alert = this.alertctrl.create({
      title: "Confirm multiplier change",
      message: "Bet: <br>'" + name + "'",
      inputs: [
        {
          name: 'amount',
          placeholder: 'Current odds: ' + multiplier
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
          }
        },
        {
          text: 'Submit',
          handler: data => {

            let loader = this.loaderctrl.create({
              content: "Loading..",
            });

            loader.present().then(() => {

              var headers = new Headers();
              headers.append('Content-Type', 'application/json');
              let options = new RequestOptions({ headers: headers });

              let postParams = {
                "id": id,
                "multiplier": data.amount
              }

              this.http.post(this.api.url + "bet/change", postParams, options).subscribe(data => {
                this.socket.emit("msg", { msg: "loadbets" });
                loader.dismiss();
                this.update();
                this.toastservice.presenttoast("Odds successfully changed.");
              }, (err) => {
                loader.dismiss();
                this.toastservice.presenttoast("DB error");
              })
            })
          }
        }
      ]
    });
    alert.present();
  }

  lock() {
    this.socket.emit("msg", { msg: "lock" });
  }

  unlock() {
    this.socket.emit("msg", { msg: "unlock" });
  }

  doRefresh(refresher) {
    this.update();

    setTimeout(() => {
      refresher.complete();
    }, 500);
  }

  update() {
    this.dbservice.getallplayers().subscribe(response => {
      this.players = response.user;
    })

    this.dbservice.getallteams().subscribe(response => {
      this.teams = response.team;
    })

    this.dbservice.getallbets().subscribe(response => {
      this.bets = response.bet;
    })

    this.dbservice.getalluserpurchases().subscribe(response => {
      this.userpurchases = response.userpurchase;
    })

    this.dbservice.getalluserpreds().subscribe(response => {
      this.userpreds = response.userpred;
    })

    this.dbservice.getallquestions().subscribe(response => {
      this.questions = response.question;
    })
  }
}
