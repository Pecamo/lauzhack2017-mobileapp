import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import {QRShowPage} from "../qr-show/qr-show";


/**
 * Generated class for the ManagerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-manager',
  templateUrl: 'manager.html',
})
export class ManagerPage {

  private articles: {name: string, points: number}[];

  constructor(public navCtrl: NavController, private toastCtrl: ToastController) {
    let example = {
      "Sandwich aux fraises": 1,
      "Sorbet aux ongles": 2,
      "Pizza aux narines": 10,
      "Test à la vanille": 20
    };
    this.articles = this.toList(example);
    window['articles'] = this.articles;
  }

  private toList(input) {
    return Object.keys(input).map((key) => {return {'name': key, 'points': input[key]};});
  }

  openCustomer() {
    this.navCtrl.setRoot(QRShowPage);
  }

  private itemTapped(article: {name: string, points: number}) {
    let toast = this.toastCtrl.create({
      message: 'Successfully registered ' + article.name,
      duration: 3000,
      position: 'bottom'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ManagerPage');
  }

  randomColor(index: number, max: number = 10) {
    let color = this.HSVtoRGB(index/max % max, 0.25, 0.96);
    let r = ("00" + color['r'].toString(16)).substr(-2,2);
    let g = ("00" + color['g'].toString(16)).substr(-2,2);
    let b = ("00" + color['b'].toString(16)).substr(-2,2);
    let finale = "#" + r + g + b;
    console.log(finale);
    return { 'background-color': finale };
  }

  HSVtoRGB(h, s, v) {
    let r, g, b, i, f, p, q, t;
    if (arguments.length === 1) {
      s = h.s, v = h.v, h = h.h;
    }
    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);
    switch (i % 6) {
      case 0: r = v, g = t, b = p; break;
      case 1: r = q, g = v, b = p; break;
      case 2: r = p, g = v, b = t; break;
      case 3: r = p, g = q, b = v; break;
      case 4: r = t, g = p, b = v; break;
      case 5: r = v, g = p, b = q; break;
    }
    return {
      r: Math.round(r * 255),
      g: Math.round(g * 255),
      b: Math.round(b * 255)
    };
  }
}
