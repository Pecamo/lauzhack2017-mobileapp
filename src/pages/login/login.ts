import {Component} from '@angular/core';
import {IonicPage, NavController, ToastController} from 'ionic-angular';

import {AngularFireAuth} from "angularfire2/auth";

// see https://github.com/angular/angularfire2/blob/master/docs/version-4-upgrade.md#removing-angularfire-for-modularity
// Do not import from 'firebase' as you'd lose the tree shaking benefits
import * as firebase from 'firebase/app';
import {TabsPage} from "../tabs/tabs";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  templateUrl: 'login.html'
})
export class LoginPage {

  constructor(public navCtrl: NavController, public afauth: AngularFireAuth, public toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
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
    this.afauth.auth.signInWithPopup(provider)
      .then(
        ok => {
          // TODO
          console.log(ok);
          this.navCtrl.push(TabsPage);
        },
        error => {
          this.toastCtrl.create({
            message: 'An error occurred ' + error,
            duration: 3000
          }).present();
        });
  }


  logout() {
    return this.afauth.auth.signOut();
  }

}
