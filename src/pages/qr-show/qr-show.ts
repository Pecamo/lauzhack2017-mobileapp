import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {DataProvider} from "../../providers/data/data";
import {ManagerPage} from "../manager/manager";

@Component({
  selector: 'page-qr-show',
  templateUrl: 'qr-show.html'
})
export class QRShowPage {

  createdCode: string;

  constructor(public navCtrl: NavController, private dataProvider: DataProvider) {
    this.createdCode = this.dataProvider.getUser().uid;
  }

  openManager() {
    this.navCtrl.push(ManagerPage);
  }

}
