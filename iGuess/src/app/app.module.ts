import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { NameEnterPage } from '../pages/name-enter/name-enter';
import { PredPage } from '../pages/pred/pred';
import { ToastService } from './services/toast.service';
import { ApiService } from './services/api.service';
import { UserService } from './services/user.service';
import { HttpModule } from '@angular/http';
import { BetService } from './services/bet.service';
import { IonicStorageModule } from '@ionic/storage';
import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';

let config: SocketIoConfig = {
  url: "http://145.28.144.51:3001/",
  options: {}
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    NameEnterPage,
    PredPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    SocketIoModule.forRoot(config)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    NameEnterPage,
    PredPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ToastService,
    ApiService,
    UserService,
    BetService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
