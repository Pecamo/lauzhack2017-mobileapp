import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Page} from "../../Page";
import {FidelityCard, KeyValuePair, User} from "../../types";

/**
 * Generated class for the SelectArticlePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-select-article',
  templateUrl: 'select-article.html',
})
export class SelectArticlePage extends Page {

  fc: FidelityCard;
  articles: KeyValuePair[];
  user: User;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    super();
    this.fc = this.navParams.get('fc');
    this.user = this.navParams.get('user');
    this.articles = this.objectToList(this.fc.articles);
  }

  ionViewDidLoad() {

  }

}
