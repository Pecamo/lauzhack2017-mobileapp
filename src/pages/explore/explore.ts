import {Component} from '@angular/core';
import {App, NavController} from 'ionic-angular';
import {DataProvider} from "../../providers/data/data";
import {Business, User} from "../../types";
import {Page} from "../../Page";
import {BusinessDetailsPage} from "../business-details/business-details";

@Component({
  selector: 'page-explore',
  templateUrl: 'explore.html'
})
export class ExplorePage extends Page {

  businesses: Business[];
  user: User;

  constructor(public navCtrl: NavController, private dataProvider: DataProvider, protected app: App) {
    super(null, app);
    dataProvider.init().subscribe(b => this._init());
  }

  _init() {
    // this.dataProvider.refs.businesses.on('value',
    //   (s) => {
    //     this.businesses = s.val();
    //     console.log(JSON.stringify(this.businesses))
    //   }
    // );

    this.dataProvider.businessSub().subscribe(b => {
      this.businesses = b;
      console.log(b);
    });

    this.dataProvider.getUserFromUID(this.dataProvider.fbUser.uid).subscribe(u => this.user = u);
  }

  update(idx: number) {
    // const upd = this.businesses[idx];
    // upd.infos.name = "Holy Cow";
    // this.dataProvider.refs.businesses.child(upd._id).update(upd);
  }

  openDetails(event: any, business: Business) {
    this.navCtrl.push(BusinessDetailsPage, {"business": business});
  }

}
