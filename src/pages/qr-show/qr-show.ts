import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {DataProvider} from "../../providers/data/data";
import {ManagerPage} from "../manager/manager";
import {QrScanPage} from "../qr-scan/qr-scan";

@Component({
  selector: 'page-qr-show',
  templateUrl: 'qr-show.html'
})
export class QRShowPage {

  // see https://ionicacademy.com/ionic-qr-code-generator-reader/
  createdCode: string;

  constructor(public navCtrl: NavController, private dataProvider: DataProvider) {
    this.createdCode = this.dataProvider.user.uid;
  }

  openManager() {
    this.navCtrl.push(QrScanPage);
  }

}
