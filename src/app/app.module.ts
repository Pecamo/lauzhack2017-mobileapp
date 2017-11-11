import {NgModule, ErrorHandler} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {MyApp} from './app.component';

import {AboutPage} from '../pages/about/about';
import {ContactPage} from '../pages/contact/contact';
import {HomePage} from '../pages/home/home';
import {TabsPage} from '../pages/tabs/tabs';
import {LoginPage} from '../pages/login/login';

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {AngularFireModule} from "angularfire2";
import {AngularFireAuthModule} from "angularfire2/auth";
import {AngularFireDatabaseModule} from "angularfire2/database";
import {DataProvider} from '../providers/data/data';
import {ManagerPage} from "../pages/manager/manager";

// configuration copy-pasted from the fb console
// export const firebaseConfig = {
//   apiKey: "AIzaSyAZmg1qH9lSntOWl2EuM9b7GBRXOt6WDZ8",
//   authDomain: "fidelizy-b765c.firebaseapp.com",
//   databaseURL: "https://fidelizy-b765c.firebaseio.com",
//   projectId: "fidelizy-b765c",
//   storageBucket: "fidelizy-b765c.appspot.com",
//   messagingSenderId: "155242724045"
// };


// Initialize Firebase
export const firebaseConfig = {
  apiKey: "AIzaSyAZmg1qH9lSntOWl2EuM9b7GBRXOt6WDZ8",
  authDomain: "fidelizy-b765c.firebaseapp.com",
  databaseURL: "https://fidelizy-b765c.firebaseio.com",
  projectId: "fidelizy-b765c",
  storageBucket: "fidelizy-b765c.appspot.com",
  messagingSenderId: "155242724045"
};

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    ManagerPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    ManagerPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DataProvider
  ]
})
export class AppModule {
}
