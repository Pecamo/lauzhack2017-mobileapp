import {Component} from '@angular/core';
import {App, NavController, NavParams} from 'ionic-angular';
import {DataProvider} from "../../providers/data/data";
import {Page} from "../../Page";
import {Business, User} from "../../types";

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

  user: User;
  businesses: Business[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private dataProvider: DataProvider, protected app: App) {
    super(null, app);
    this.dataProvider.getUserFromUID(this.dataProvider.fbUser.uid, false).subscribe(
      u => this.user = u, error => this.showToast(error)
    );
    this.dataProvider.businessSub().subscribe(
      bs => this.businesses = bs, error => this.showToast(error)
    );
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad MySpacePage');
  }

}
