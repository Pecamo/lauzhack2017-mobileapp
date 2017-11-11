import {Component} from '@angular/core';

import {AboutPage} from '../about/about';
import {QRShowPage} from '../qr-show/qr-show';
import {ExplorePage} from '../explore/explore';
import {DataProvider} from "../../providers/data/data";
import {NavController} from "ionic-angular";
import {LoginPage} from "../login/login";
import {ManagerPage} from "../manager/manager";
import {MySpacePage} from "../my-space/my-space";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = QRShowPage;
  tab2Root = MySpacePage;
  tab3Root = ExplorePage;

  constructor(public navCtrl: NavController, private dataProvider: DataProvider) {
    console.log("constructor");
    dataProvider.init().subscribe(() => {
      console.log(this.dataProvider.isLoggedIn());
      if (!this.dataProvider.isLoggedIn()) {
        this.navCtrl.setRoot(LoginPage);
        console.log("init done", this.dataProvider.user);
      }
    }, error => console.log(error));
  }

}
