import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { Socket } from 'ng-socket-io';
import { DbService } from '../../app/services/db.service';
import { ToastService } from '../../app/services/toast.service';

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

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  players: player[];
  teams: team[];
  bets: bet[];

  constructor(public navCtrl: NavController, public toastservice: ToastService,
    public socket: Socket, public dbservice: DbService, public alertctrl: AlertController) {

    this.update();
  }

  add_team(player, team) {

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

          }
        }
      ]
    });
    alert.present();
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
  }
}
