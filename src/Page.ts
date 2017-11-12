import {App, ToastController} from "ionic-angular";

export class Page {

  constructor(protected toaster: ToastController = null, protected app: App) {
  }

  objectToList(o: object): any[] {
    if (!o) return [];
    if (o instanceof Array) return o;
    return Object.keys(o).map(k => {
      let item = o[k];
      item._id = k;
      return item;
    });
  }

  randomColor(index: number, max: number = 10) {
    let color = this.HSVtoRGB(index / max % max, 0.25, 0.96);
    let r = ("00" + color['r'].toString(16)).substr(-2, 2);
    let g = ("00" + color['g'].toString(16)).substr(-2, 2);
    let b = ("00" + color['b'].toString(16)).substr(-2, 2);
    let finale = "#" + r + g + b;
    return {'background-color': finale};
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
      case 0:
        r = v, g = t, b = p;
        break;
      case 1:
        r = q, g = v, b = p;
        break;
      case 2:
        r = p, g = v, b = t;
        break;
      case 3:
        r = p, g = q, b = v;
        break;
      case 4:
        r = t, g = p, b = v;
        break;
      case 5:
        r = v, g = p, b = q;
        break;
    }
    return {
      r: Math.round(r * 255),
      g: Math.round(g * 255),
      b: Math.round(b * 255)
    };
  }

  showToast(message: string, duration = 3000) {
    if (this.toaster == null) return;
    this.toaster.create({
      message: message,
      duration: duration
    }).present();
  }

  openPage(page: any) {
    this.app.getRootNav().setRoot(page);
  }

  computeTransactionSum(transactions: any) {
    let ts = transactions;
    if (ts instanceof Object) {
      ts = this.objectToList(ts);
    }

    return ts.reduce((acc, t) => acc + t.value, 0);
  }
}
