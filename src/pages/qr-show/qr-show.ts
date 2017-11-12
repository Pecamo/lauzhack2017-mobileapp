import {Component} from '@angular/core';
import {App, NavController} from 'ionic-angular';
import {DataProvider} from "../../providers/data/data";
import {Page} from "../../Page";
import {QrScanPage} from "../qr-scan/qr-scan";

@Component({
  selector: 'page-qr-show',
  templateUrl: 'qr-show.html'
})
export class QRShowPage extends Page {

  // see https://ionicacademy.com/ionic-qr-code-generator-reader/
  createdCode: string;

  constructor(public navCtrl: NavController, private dataProvider: DataProvider, protected app: App) {
    super(null, app);
    this.createdCode = this.dataProvider.user.uid;
  }

  openManager() {
    this.openPage(QrScanPage);
  }
}
