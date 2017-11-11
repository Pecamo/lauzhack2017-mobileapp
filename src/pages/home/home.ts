import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {DataProvider} from "../../providers/data/data";
import {Business, User} from "../../types";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  businesses: Business[];
  user: User;

  constructor(public navCtrl: NavController, public dataProvider: DataProvider) {
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

    this.dataProvider.userSub().subscribe(u => this.user = u);
  }

  update(idx: number) {
    // const upd = this.businesses[idx];
    // upd.infos.name = "Holy Cow";
    // this.dataProvider.refs.businesses.child(upd._id).update(upd);
  }

}
