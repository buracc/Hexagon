import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { UserService } from '../../app/services/user.service';
import { BetService } from '../../app/services/bet.service';
import { Http, RequestOptions, Headers } from '@angular/http';
import { ApiService } from '../../app/services/api.service';
import { ToastService } from '../../app/services/toast.service';
import { Socket } from 'ng-socket-io';
import { PredService } from '../../app/services/pred.service';
import { RewardService } from '../../app/services/reward.service';

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
  pts: number,
  team: String
}

interface userpred {
  name: String,
  amount: number,
  potential: number
}

interface reward {
  name: String,
  price: number
}

interface purchase {
  name: String,
  date: String
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
  rewards: reward[];
  purchases: purchase[];
  disabled: boolean = true;

  constructor(public navCtrl: NavController, public navParams: NavParams, public userservice: UserService,
    public betservice: BetService, public loaderctrl: LoadingController, public alertctrl: AlertController,
    public http: Http, public api: ApiService, public predservice: PredService,
    public toastservice: ToastService, public socket: Socket, public rewardservice: RewardService) {


    this.userservice.getUser().then(user => {
      this.session = user;
      this.updatePage();
      socket.emit('connected', {user: this.session.name});

      socket.on("msg", data => {
        if (data.msg == "won") {
          this.predservice.get_per_user(this.session.id).subscribe(mypreds => {
            if (typeof mypreds.pred[0] != 'undefined'
              && typeof data.btrs != 'undefined') {
              for (let i in mypreds.pred) {
                for (let j in data.btrs) {
                  if (mypreds.pred[i].user_id == data.btrs[j].user_id
                    && mypreds.pred[i].Bet_id == data.btrs[j].Bet_id
                    && mypreds.pred[i].Bet_id == data.betid) {
                    this.won(data.betid);
                    this.updatePage();
                  }
                }
              }
            }
          })
        }

        else if (data.msg == "lost") {
          this.predservice.get_per_user(this.session.id).subscribe(mypreds => {
            if (typeof mypreds.pred[0] != 'undefined'
              && typeof data.btrs != 'undefined') {
              for (let i in mypreds.pred) {
                for (let j in data.btrs) {
                  if (mypreds.pred[i].user_id == data.btrs[j].user_id
                    && mypreds.pred[i].Bet_id == data.btrs[j].Bet_id
                    && mypreds.pred[i].Bet_id == data.betid) {
                    this.lost(data.betid);
                    this.updatePage();
                  }
                }
              }
            }
          })
        }

        else if (data.msg == "refresh") {
          this.updatePage();
        }

        else if (data.msg == "lock") {
          this.disabled = true;
        }

        else if (data.msg == "unlock") {
          this.disabled = false;
        }

        else if (data.msg == "loadbets") {
          this.load_bets();
          this.updatePage();
        }
      })
    });
  }

  display_eom() {
    var catscard = document.getElementById("catscard");
    var eomcard = document.getElementById("eomcard");

    catscard.style.display = "none";
    eomcard.style.display = "block";

    this.load_bets();
    this.updatePage();
  }

  display_rounds() {
    var catscard = document.getElementById("catscard");
    var roundscard = document.getElementById("roundscard");

    catscard.style.display = "none";
    roundscard.style.display = "block";

    this.load_bets();
    this.updatePage();
  }

  won(betid) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });

    let postParams = {
      "Bet_id": betid,
      "id": 1
    }

    this.http.post(this.api.url + "pred/result", postParams, options).subscribe(data => {

    }, (err) => {

    })

    this.updatePage();
    this.toastservice.presenttoast("Your bet won!");
  }

  lost(betid) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });

    let postParams = {
      "Bet_id": betid,
      "id": 0
    }

    this.http.post(this.api.url + "pred/result", postParams, options).subscribe(data => {

    }, (err) => {

    })

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
        this.predservice.get_per_user(this.session.id).subscribe(response => {
          for (let i in response.pred) {
            this.predservice.storePreds(response.pred[i]);
          }
        })
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
    this.updatePage();
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
    this.updatePage();
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
    this.updatePage();
  }

  not_enough() {
    let alert = this.alertctrl.create({
      title: "Not enough points!",
      message: "Not enough points to buy/wager.",
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
    this.updatePage();
  }

  buy(r, session) {

    let alert = this.alertctrl.create({
      title: name,
      message: "Sure to buy this item?",
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {

          }
        },
        {
          text: 'Yes!',
          handler: data => {
            if (session.pts >= r.price) {
              let loader = this.loaderctrl.create({
                content: "Buying item..",
              });

              loader.present().then(() => {

                var headers = new Headers();
                headers.append('Content-Type', 'application/json');
                let options = new RequestOptions({ headers: headers });

                let postParams = {
                  "reward_id": r.id,
                  "user_id": session.id
                }

                this.http.post(this.api.url + "userpurchases/buy", postParams, options).subscribe((data) => {
                  this.toastservice.presenttoast("Reward bought!")
                  this.updatePage();
                  loader.dismiss();
                }, (err) => {
                  this.toastservice.presenttoast("Failed to buy - connection error.")
                  loader.dismiss();
                });
              });
            } else {
              this.not_enough();
            }
          }
        }
      ]
    });
    alert.present();
    this.updatePage();

  }

  go_ranking() {
    this.userservice.getallplayers().subscribe(response => {
      this.players = response.user;
    });

    var rankcard = document.getElementById("rankcard");
    this.hide_all_cards();
    rankcard.style.display = "block";
    this.updatePage();
  }

  go_play() {
    var catscard = document.getElementById("catscard");
    this.updatePage();
    this.hide_all_cards();
    catscard.style.display = "block";
    this.updatePage();
  }

  go_profile(id) {
    var profcard = document.getElementById("profcard");
    this.hide_all_cards();
    profcard.style.display = "block";
    this.userservice.get_userpreds(id).subscribe(response => {
      this.userpreds = response.userpred;
    });
    this.predservice.get_preds().then(mypreds => {

    });


    this.rewardservice.getrewards_by_id(id).subscribe(response => {
      this.purchases = response.userpurchase;
    });
    this.updatePage();
  }

  go_rewards() {
    var rewardcard = document.getElementById("rewardcard");
    this.hide_all_cards();
    rewardcard.style.display = "block";

    this.rewardservice.getrewards().subscribe(response => {
      this.rewards = response.reward;
    });
    this.updatePage();
  }

  hide_all_cards() {
    var catscard = document.getElementById("catscard");
    var eomcard = document.getElementById("eomcard");
    var roundscard = document.getElementById("roundscard");
    var rankcard = document.getElementById("rankcard");
    var profcard = document.getElementById("profcard");
    var rewardcard = document.getElementById("rewardcard");

    eomcard.style.display = "none"
    catscard.style.display = "none";
    roundscard.style.display = "none";
    rankcard.style.display = "none";
    profcard.style.display = "none";
    rewardcard.style.display = "none";
  }

  logout() {
    this.userservice.getUser().then(activeuser => {
      this.socket.emit('disconnected', {user: activeuser.name});
    });
    
    this.userservice.clear_storage();
    this.navCtrl.pop();
  }

}
