import {Component} from '@angular/core';
import {NavController, NavParams, ToastController} from 'ionic-angular';
import {FidelityCard, User} from "../../types";
import {DataProvider} from "../../providers/data/data";
import {Page} from "../../Page";
import {SelectArticlePage} from "../select-article/select-article";

/**
 * Generated class for the SelectFcPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-select-fc',
  templateUrl: 'select-fc.html',
})
export class SelectFcPage extends Page {

  user: User;
  fcs: FidelityCard[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public dataProvider: DataProvider,
              protected toaster: ToastController) {
    super(toaster);
    this.fcs = this.objectToList(this.dataProvider.managingBusiness.FCs);
    this.user = this.navParams.get('user');
  }

  ionViewDidLoad() {

  }


  itemTapped(fc: FidelityCard) {
    this.navCtrl.push(SelectArticlePage, {fc: fc, user: this.user});
  }
}
