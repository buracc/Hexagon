import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';
import { DbService } from './services/db.service';
import { ApiService } from './services/api.service';
import { HttpModule } from '@angular/http';
import { ToastService } from './services/toast.service';

// var ip = "79.143.178.40:";
var ip = "145.28.164.121:";
// var ip = "localhost:";
var port = 3001;

let config: SocketIoConfig = {
  url: ip + port,
  options: {}
}

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    SocketIoModule.forRoot(config)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    DbService,
    ApiService,
    ToastService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
