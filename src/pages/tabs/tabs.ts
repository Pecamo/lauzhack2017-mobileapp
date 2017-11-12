import {Component} from '@angular/core';
import {QRShowPage} from '../qr-show/qr-show';
import {ExplorePage} from '../explore/explore';
import {DataProvider} from "../../providers/data/data";
import {NavController} from "ionic-angular";
import {LoginPage} from "../login/login";
import {MySpacePage} from "../my-space/my-space";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = QRShowPage;
  tab2Root = MySpacePage;
  tab3Root = ExplorePage;

  constructor(public navCtrl: NavController) {

  }

}
