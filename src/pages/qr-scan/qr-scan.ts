import {Component} from '@angular/core';
import {App, NavController, ToastController} from 'ionic-angular';
import {BarcodeScanner} from "@ionic-native/barcode-scanner";
import {DataProvider} from "../../providers/data/data";
import {SelectFcPage} from "../select-fc/select-fc";
import {TabsPage} from "../tabs/tabs";
import {Page} from "../../Page";
import {SelectArticlePage} from "../select-article/select-article";

/**
 * Generated class for the QrScanPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-qr-scan',
  templateUrl: 'qr-scan.html',
})
export class QrScanPage extends Page {

  scannedCode = "";
  manualUid = "";

  constructor(public navCtrl: NavController, public barcodeScanner: BarcodeScanner, protected toast: ToastController,
              private dataProvider: DataProvider, protected app: App) {
    super(toast, app);
  }

  scanCode() {
    this.barcodeScanner.scan().then(barcodeData => {
      this.scannedCode = barcodeData.text;
      this.checkCode(barcodeData.text);
    }, (err) => {
      this.toast.create({message: err, duration: 3000}).present();
    });
  }

  checkCode(uid: string) {
    if(uid == null || uid.length < 3) return;
    this.dataProvider.getUserFromUID(uid).subscribe(user => {
      if (user != null) {
        const fcs = this.objectToList(this.dataProvider.managingBusiness.FCs);
        if (fcs.length > 1) {
          this.navCtrl.push(SelectFcPage, {user_id: uid});
        } else {
          this.navCtrl.push(SelectArticlePage, {user_id: uid, fc: fcs[0]});
        }
      } else {
        this.toast.create({message: "This user doesn't exist!", duration: 3000}).present();
      }
    }, error => this.toast.create({message: error, duration: 3000}).present());
  }

  openCustomer() {
    this.openPage(TabsPage);
  }

}
