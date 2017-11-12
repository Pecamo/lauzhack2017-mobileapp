import {Component} from '@angular/core';
import {App, NavController, NavParams} from 'ionic-angular';
import {Page} from "../../Page";
import {DataProvider} from "../../providers/data/data";
import {FidelityCard, KeyValuePair, User} from "../../types";

/**
 * Generated class for the SelectPromoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-select-promo',
  templateUrl: 'select-promo.html',
})
export class SelectPromoPage extends Page {

  fc: FidelityCard;
  promos: KeyValuePair[] = [];
  user: User;
  userPts: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, protected app: App,
              private dataProvider: DataProvider) {
    super(null, app);
    this.fc = this.navParams.get('fc');
    this.user = this.navParams.get('user');
    this.userPts = this.computeTransactionSum(this.user.FCs[this.fc._id].transactions);
    if (this.fc.promos) {
      this.promos = this.objectToList(this.fc.promos);
    }
  }

  itemTapped(promos: KeyValuePair) {
    this.dataProvider.addTransaction(this.user, this.fc, -promos.value);
  }

}
