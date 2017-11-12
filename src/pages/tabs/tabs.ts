import {Component} from '@angular/core';
import {QRShowPage} from '../qr-show/qr-show';
import {ExplorePage} from '../explore/explore';
import {NavController} from "ionic-angular";
import {MySpacePage} from "../my-space/my-space";
import {SplashScreen} from "@ionic-native/splash-screen";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = QRShowPage;
  tab2Root = MySpacePage;
  tab3Root = ExplorePage;

  constructor(public navCtrl: NavController, private splashScreen: SplashScreen) {

  }

  ionViewDidLoad() {
    this.splashScreen.hide();
  }

}
