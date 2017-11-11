import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {DataProvider} from "../../providers/data/data";

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  createdCode: string;

  constructor(public navCtrl: NavController, private dataProvider: DataProvider) {
    this.createdCode = this.dataProvider.getUser().uid;
  }

}
