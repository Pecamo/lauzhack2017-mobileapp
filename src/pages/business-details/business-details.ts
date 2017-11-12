import {Component} from '@angular/core';
import {App, NavController, NavParams} from 'ionic-angular';
import {Business, KeyValuePair} from "../../types";
import {Page} from "../../Page";

@Component({
  selector: 'page-business-details',
  templateUrl: 'business-details.html',
})
export class BusinessDetailsPage extends Page {

  private business: Business;

  constructor(public navCtrl: NavController, public navParams: NavParams, protected app: App) {
    super(null, app);
    this.business = this.navParams.get('business');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BusinessDetailsPage');
  }

  openGMaps(address: string) {
    window.open('https://www.google.ch/maps/search/' + address, '_system');
  }

  getPromos(b: Business): KeyValuePair[] {
    if (!b.FCs) return [];
    let lala =  [].concat.apply([], this.objectToList(b.FCs).map(fc => this.objectToList(fc.promos)));
    console.log(lala);
    return lala;
  }

}
