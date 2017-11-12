import {Component} from '@angular/core';
import {App, Loading, LoadingController, NavController, Platform, ToastController} from 'ionic-angular';

import {AngularFireAuth} from "angularfire2/auth";
// see https://github.com/angular/angularfire2/blob/master/docs/version-4-upgrade.md#removing-angularfire-for-modularity
// Do not import from 'firebase' as you'd lose the tree shaking benefits
import * as firebase from 'firebase/app';
import {TabsPage} from "../tabs/tabs";
import {Page} from "../../Page";
import {SplashScreen} from "@ionic-native/splash-screen";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage extends Page {

  loading: Loading = null;

  constructor(public navCtrl: NavController, public afauth: AngularFireAuth, public toastCtrl: ToastController, private platform: Platform, protected app: App,
              public loadingCtrl: LoadingController, private splashScreen: SplashScreen) {
    super(toastCtrl, app);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    this.splashScreen.hide();
  }

  loginWithGoogle() {
    this._login(new firebase.auth.GoogleAuthProvider());
  }

  loginWithFacebook() {
    this._login(new firebase.auth.FacebookAuthProvider());
  }

  loginWithTwitter() {
    this._login(new firebase.auth.TwitterAuthProvider());
  }

  loginWithEmail() {
    this._login(new firebase.auth.EmailAuthProvider());
  }


  private _login(provider: firebase.auth.AuthProvider) {

    this.loading = this.loadingCtrl.create({
      content: "Logging in. Please wait...",
      duration: 3000
    });
    this.loading.present();

    if (this.platform.is('cordova')) {
      this.afauth.auth.signInWithRedirect(provider)
        .then(result => this._onLoginSuccess(result), error => this._onLoginFailure(error));
    } else {
      this.afauth.auth.signInWithPopup(provider)
        .then(result => this._onLoginSuccess(result), error => this._onLoginFailure(error));
    }
  }

  private _onLoginSuccess(result) {
    this.openPage(TabsPage);
    this.loading.dismissAll();
  }

  private _onLoginFailure(error) {
    this.showToast(error);
    this.loading.dismissAll();
  }

}
