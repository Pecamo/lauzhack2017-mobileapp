import {Component} from '@angular/core';
import {App, NavController, NavParams} from 'ionic-angular';
import {DataProvider} from "../../providers/data/data";
import {Page} from "../../Page";
import {Business, FcEntry, User} from "../../types";
import {Observable} from "rxjs/Observable";
import {Observer} from "rxjs/Observer";

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

  fcs: FcEntry[];
  businesses: Business[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private dataProvider: DataProvider, protected app: App) {
    super(null, app);

    this.dataProvider.getUserFromUID(this.dataProvider.fbUser.uid, false).subscribe(
      u => this.fcs = this.objectToList(u.FCs), error => this.showToast(error)
    );
    this.dataProvider.businessSub().subscribe(
      bs => {
        this.businesses = bs;
        console.log(bs);
      }, error => this.showToast(error)
    );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MySpacePage');
  }

}
