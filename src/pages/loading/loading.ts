import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {DataProvider} from "../../providers/data/data";
import {TabsPage} from "../tabs/tabs";
import {LoginPage} from "../login/login";

/**
 * Generated class for the LoadingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  templateUrl: 'loading.html',
})
export class LoadingPage {

  constructor(public navCtrl: NavController, private dataProvider: DataProvider) {
    dataProvider.init().subscribe(isLoggedIn => {
      this.navCtrl.setRoot(isLoggedIn ? TabsPage : LoginPage);
    });
  }
}
