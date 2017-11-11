import {Component} from '@angular/core';

import {AboutPage} from '../about/about';
import {ContactPage} from '../contact/contact';
import {HomePage} from '../home/home';
import {DataProvider} from "../../providers/data/data";
import {NavController} from "ionic-angular";
import {LoginPage} from "../login/login";
import {ManagerPage} from "../manager/manager";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = ManagerPage;

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
