import {Component} from '@angular/core';
import {App, NavController} from 'ionic-angular';
import {DataProvider} from "../../providers/data/data";
import {Business, User} from "../../types";
import {Page} from "../../Page";

@Component({
  selector: 'page-explore',
  templateUrl: 'explore.html'
})
export class ExplorePage extends Page {

  businesses: Business[];

  constructor(public navCtrl: NavController, private dataProvider: DataProvider, protected app: App) {
    super(null, app);
    this.dataProvider.businessSub().subscribe(b => {
      this.businesses = this.objectToList(b);
      console.log(this.businesses);
    });
  }
}
