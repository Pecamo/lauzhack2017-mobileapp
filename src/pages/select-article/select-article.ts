import {Component} from '@angular/core';
import {App, NavController, NavParams} from 'ionic-angular';
import {Page} from "../../Page";
import {FidelityCard, KeyValuePair, User} from "../../types";

@Component({
  selector: 'page-select-article',
  templateUrl: 'select-article.html',
})
export class SelectArticlePage extends Page {

  fc: FidelityCard;
  articles: KeyValuePair[];
  user: User;

  constructor(public navCtrl: NavController, public navParams: NavParams, protected app: App) {
    super(null, app);
    this.fc = this.navParams.get('fc');
    this.user = this.navParams.get('user');
    this.articles = this.objectToList(this.fc.articles);
  }

  ionViewDidLoad() {

  }

}
