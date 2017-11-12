import {Component} from '@angular/core';
import {App, NavController, NavParams} from 'ionic-angular';
import {Page} from "../../Page";
import {FidelityCard, KeyValuePair, User} from "../../types";
import {DataProvider} from "../../providers/data/data";
import {SelectPromoPage} from "../select-promo/select-promo";
import {QrScanPage} from "../qr-scan/qr-scan";

@Component({
  selector: 'page-select-article',
  templateUrl: 'select-article.html',
})
export class SelectArticlePage extends Page {

  fc: FidelityCard;
  articles: KeyValuePair[] = [];
  user: User;

  constructor(public navCtrl: NavController, public navParams: NavParams, protected app: App,
              private dataProvider: DataProvider) {
    super(null, app);
    this.fc = this.navParams.get('fc');
    this.dataProvider.getUserFromUID(this.navParams.get('user_id'), false).subscribe(
      u => this.user = u, error => this.showToast(error)
    );
    if (this.fc.articles) {
      this.articles = this.objectToList(this.fc.articles);
    }
  }

  isPromoPossible(): boolean {
    if (!this.user || !this.fc.promos || this.fc.promos.length == 0) return false;
    const pts = this.computeTransactionSum(this.user.FCs[this.fc._id].transactions);
    return Object.keys(this.fc.promos).map(p => this.fc.promos[p].value <= pts).length > 0;
  }

  goToPromo() {
    this.navCtrl.push(SelectPromoPage, {fc: this.fc, user_id: this.user._id});
  }

  finish() {
    this.openPage(QrScanPage);
  }

  itemTapped(article: KeyValuePair) {
    this.dataProvider.addTransaction(this.user, this.fc, article.value);
  }

  customValue(value: number) {
    this.dataProvider.addTransaction(this.user, this.fc, value);
  }

}
