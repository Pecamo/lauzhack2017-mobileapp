import {Component} from '@angular/core';
import {App, NavController} from 'ionic-angular';
import {Page} from "../../Page";

/**
 * Generated class for the LoadingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  templateUrl: 'loading.html',
})
export class LoadingPage extends Page {

  constructor(public navCtrl: NavController, protected app: App) {
    super(null, app);

  }
}
