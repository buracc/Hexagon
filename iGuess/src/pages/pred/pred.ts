import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { UserService } from '../../app/services/user.service';
import { BetService } from '../../app/services/bet.service';
import { Http, RequestOptions, Headers } from '@angular/http';
import { ApiService } from '../../app/services/api.service';
import { ToastService } from '../../app/services/toast.service';
import { Socket } from 'ng-socket-io';

/**
 * Generated class for the PredPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

interface roundbet {
  id: number,
  name: String,
  multiplier: number
}

interface eombet {
  id: number,
  name: String,
  multiplier: number
}

interface player {
  name: String,
  pts: number
}

interface userpred {
  name: String,
  amount: number,
  potential: number
}

@IonicPage()
@Component({
  selector: 'page-pred',
  templateUrl: 'pred.html',
})

export class PredPage {

  session: any;

  roundbets: roundbet[];
  eombets: eombet[];
  players: player[];
  userpreds: userpred[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public userservice: UserService,
    public betservice: BetService, public loaderctrl: LoadingController, public alertctrl: AlertController,
    public http: Http, public api: ApiService, public toastservice: ToastService, public socket: Socket) {

      socket.on("Message", data => {
        if (data.message == "won") {
          this.won();
        } else if (data.message == "lost") {
          this.lost();
        }
      })

      this.userservice.getUser().then(user => {
        this.session = user;
        this.updatePage();
      });
  }

  display_eom() {
    var catscard = document.getElementById("catscard");
    var eomcard = document.getElementById("eomcard");

    catscard.style.display = "none";
    eomcard.style.display = "block";

    this.load_bets();
  }

  display_rounds() {
    var catscard = document.getElementById("catscard");
    var roundscard = document.getElementById("roundscard");

    catscard.style.display = "none";
    roundscard.style.display = "block";

    this.load_bets();
  }

  won() {
    this.updatePage();
    this.toastservice.presenttoast("Your bet won!");
  }

  lost() {
    this.updatePage();
    this.toastservice.presenttoast("Your bet lost..");
  }

  updatePage() {
    // let loader = this.loaderctrl.create({
    //   content: "Loading..",
    // });

    // loader.present().then(() => {

    this.userservice.getUser().then(user => {
      this.userservice.getbyname(user.name).subscribe(response => {
        this.userservice.storeUser(response.user[0]);
        this.session = response.user[0];
        // loader.dismiss();
      }, (err) => {
        this.toastservice.presenttoast("Connection error.");
        // loader.dismiss();
      })
    }, (err) => {
      this.toastservice.presenttoast("Error retrieving user info from DB. Try refreshing this page.")
    })
    // })
  }

  load_bets() {

    let loader = this.loaderctrl.create({
      content: "Fetching odds..",
    });

    loader.present().then(() => {


      this.betservice.getbets().subscribe(response => {
        var betz = response.bet;
        var roundarray = [];
        var eomarray = [];

        for (let i in betz) {
          if (betz[i].id < 5) {
            eomarray.push(betz[i]);
          } else {
            roundarray.push(betz[i]);
          }
        }
        this.roundbets = roundarray;
        this.eombets = eomarray;
        loader.dismiss();
      },
        (err) => {
          this.toastservice.presenttoast("Connection error.");
          loader.dismiss();
        })
    })
  }

  back_to_cats() {
    this.roundbets = [];
    this.eombets = [];

    var catscard = document.getElementById("catscard");
    var eomcard = document.getElementById("eomcard");
    var roundscard = document.getElementById("roundscard");

    if (catscard.style.display == "none") {
      if (eomcard.style.display == "block") {
        catscard.style.display = "block";
        eomcard.style.display = "none";
      }

      if (roundscard.style.display == "block") {
        catscard.style.display = "block";
        roundscard.style.display = "none";
      }
    }
    this.updatePage();
  }

  doRefresh(refresher) {
    this.updatePage();

    setTimeout(() => {
      refresher.complete();
    }, 500);
  }

  new_bet(id, name, multiplier) {
    let alert = this.alertctrl.create({
      title: name,
      message: "How many points would you like to wager? (Win " + multiplier + " times the amount you wager!)",
      inputs: [
        {
          name: 'amount',
          placeholder: 'Amount'
        }],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {

          }
        },
        {
          text: 'Go!',
          handler: data => {
            if (this.session.pts >= data.amount) {
              this.bet(data.amount, id);
            } else {
              this.not_enough();
            }
          }
        }
      ]
    });
    alert.present();
  }

  bet(amount, bet_id) {

    let loader = this.loaderctrl.create({
      content: "Placing bet..",
    });

    loader.present().then(() => {
      this.userservice.getUser().then((user) => {

        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });

        let postParams = {
          "amount": amount,
          "Bet_id": bet_id,
          "User_id": user.id
        }

        this.http.post(this.api.url + "pred/new", postParams, options).subscribe((data) => {
          this.toastservice.presenttoast("Wager successful! Good luck!")
          this.updatePage();
          loader.dismiss();
        }, (err) => {
          this.toastservice.presenttoast("Failed to wager - connection error.")
          loader.dismiss();
        });
      });
    });
  }

  not_enough() {
    let alert = this.alertctrl.create({
      title: "Not enough points!",
      message: "Not enough points to wager.",
      buttons: [
        {
          text: 'Ok!',
          role: 'cancel',
          handler: () => {

          }
        }
      ]
    });
    alert.present();
  }

  go_ranking() {
    this.userservice.getallplayers().subscribe(response => {
      this.players = response.user;
    });

    var rankcard = document.getElementById("rankcard");
    this.hide_all_cards();
    rankcard.style.display = "block";
  }

  go_play() {
    var catscard = document.getElementById("catscard");
    this.updatePage();
    this.hide_all_cards();
    catscard.style.display = "block";
  }

  go_profile(id) {
    var profcard = document.getElementById("profcard");
    this.hide_all_cards();
    profcard.style.display = "block";
    this.userservice.get_userpreds(id).subscribe(response => {
      this.userpreds = response.userpred;
    })
  }

  hide_all_cards() {
    var catscard = document.getElementById("catscard");
    var eomcard = document.getElementById("eomcard");
    var roundscard = document.getElementById("roundscard");
    var rankcard = document.getElementById("rankcard");
    var profcard = document.getElementById("profcard");

    eomcard.style.display = "none"
    catscard.style.display = "none";
    roundscard.style.display = "none";
    rankcard.style.display = "none";
    profcard.style.display = "none";
  }

  logout() {
    this.userservice.clear_storage();
    this.navCtrl.pop();
  }

}
