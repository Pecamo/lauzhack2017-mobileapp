import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Business} from "../../types";

@Component({
  selector: 'page-business-details',
  templateUrl: 'business-details.html',
})
export class BusinessDetailsPage {

  private business: Business;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    console.log("HEY");
    console.log(this.navParams.get('business'));
    this.business = this.navParams.get('business');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BusinessDetailsPage');
  }

  openGMaps(address: string) {
    window.open('https://www.google.ch/maps/search/' + address, '_system');
  }

}
