import {Component} from '@angular/core';
import {App, NavController, NavParams} from 'ionic-angular';
import {Page} from "../../Page";
import {FidelityCard, KeyValuePair, User} from "../../types";
import {DataProvider} from "../../providers/data/data";

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
    this.user = this.navParams.get('user');
    if (this.fc.articles) {
      this.articles = this.objectToList(this.fc.articles);
    }
  }

  ionViewDidLoad() {

  }

  itemTapped(article: KeyValuePair) {
    this.dataProvider.addTransaction(this.user, this.fc.name, article.value);

  }

}
