import {ErrorHandler, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {MyApp} from './app.component';

import {AboutPage} from '../pages/about/about';
import {QRShowPage} from '../pages/qr-show/qr-show';
import {ExplorePage} from '../pages/explore/explore';
import {TabsPage} from '../pages/tabs/tabs';
import {LoginPage} from '../pages/login/login';

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {AngularFireModule} from "angularfire2";
import {AngularFireAuthModule} from "angularfire2/auth";
import {AngularFireDatabaseModule} from "angularfire2/database";
import {DataProvider} from '../providers/data/data';
import {NgxQRCodeModule} from "ngx-qrcode2";
import {LoadingPage} from "../pages/loading/loading";
import {MySpacePage} from "../pages/my-space/my-space";
import {BarcodeScanner} from "@ionic-native/barcode-scanner";
import {QrScanPage} from "../pages/qr-scan/qr-scan";
import {SelectFcPage} from "../pages/select-fc/select-fc";
import {SelectArticlePage} from "../pages/select-article/select-article";
import {BusinessDetailsPage} from "../pages/business-details/business-details";

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
    QRShowPage,
    ExplorePage,
    TabsPage,
    LoginPage,
    LoadingPage,
    MySpacePage,
    QrScanPage,
    SelectFcPage,
    SelectArticlePage,
    BusinessDetailsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NgxQRCodeModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    QRShowPage,
    ExplorePage,
    TabsPage,
    LoginPage,
    LoadingPage,
    MySpacePage,
    QrScanPage,
    SelectFcPage,
    SelectArticlePage,
    BusinessDetailsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DataProvider,
    BarcodeScanner
  ]
})
export class AppModule {
}
