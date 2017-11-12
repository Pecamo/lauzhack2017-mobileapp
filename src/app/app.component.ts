import {Component} from '@angular/core';
import {App, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {LoadingPage} from "../pages/loading/loading";
import {DataProvider} from "../providers/data/data";
import {LoginPage} from "../pages/login/login";
import {TabsPage} from "../pages/tabs/tabs";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = LoadingPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private dataProvider: DataProvider, private app: App) {
    platform.ready().then(() => {
      dataProvider.init().subscribe(isLoggedIn => {
        this.app.getRootNav().setRoot(isLoggedIn ? TabsPage : LoginPage);
        console.log("logged", isLoggedIn);
        statusBar.styleDefault();
        splashScreen.hide();
      });
    });
  }
}
