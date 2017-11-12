import { Component } from '@angular/core';
import {App, NavController, NavParams} from 'ionic-angular';
import {DataProvider} from "../../providers/data/data";
import {Page} from "../../Page";

/**
 * Generated class for the MySpacePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-my-space',
  templateUrl: 'my-space.html',
})
export class MySpacePage extends Page {

  constructor(public navCtrl: NavController, public navParams: NavParams, private dataProvider: DataProvider, protected app: App) {
    super(null, app);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MySpacePage');
  }

}
