import {Component} from '@angular/core';
import {App, NavController} from 'ionic-angular';
import {DataProvider} from "../../providers/data/data";
import {Page} from "../../Page";

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage extends Page {

  constructor(public navCtrl: NavController, private dataProvider: DataProvider, protected app: App) {
    super(null, app);
  }

}
