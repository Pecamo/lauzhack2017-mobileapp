import {Component} from '@angular/core';
import {App, NavController, ToastController} from 'ionic-angular';
import {BarcodeScanner} from "@ionic-native/barcode-scanner";
import {DataProvider} from "../../providers/data/data";
import {SelectFcPage} from "../select-fc/select-fc";
import {TabsPage} from "../tabs/tabs";
import {Page} from "../../Page";

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

  scannedCode =  "";
  manualUid = "";

  constructor(public navCtrl: NavController, public barcodeScanner: BarcodeScanner, protected toast: ToastController,
              private dataProvider: DataProvider, protected app: App) {
    super(toast, app);
  }

  ionViewDidLoad() {
    this.scanCode();
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
    this.dataProvider.getUserFromUID(uid).subscribe(user => {
      if(user != null){
        this.navCtrl.push(SelectFcPage, {user: user});
      }else{
        this.toast.create({message: "This user doesn't exist!", duration: 3000}).present();
      }
    }, error => this.toast.create({message: error, duration: 3000}).present());
  }

  openCustomer() {
    this.openPage(TabsPage);
  }

}
