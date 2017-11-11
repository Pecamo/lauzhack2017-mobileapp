import {Injectable} from '@angular/core';

// see https://github.com/angular/angularfire2/blob/master/docs/version-4-upgrade.md#removing-angularfire-for-modularity
// Do not import from 'firebase' as you'd lose the tree shaking benefits
import * as firebase from 'firebase/app';
import {AngularFireAuth} from "angularfire2/auth";
import {AngularFireDatabase} from "angularfire2/database";
import {Observable} from "rxjs/Observable";

/*
  Generated class for the DataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataProvider {

  user: Observable<firebase.User>;

  constructor(private afauth: AngularFireAuth, private af: AngularFireDatabase) {
    console.log('Hello DataProvider Provider');
    this.user = afauth.authState;
  }

  isLoggedIn(): boolean {
    return this.afauth.auth.currentUser != null;
  }

  getUser(): firebase.User {
    return this.afauth.auth.currentUser;
  }

  logout() {
    this.afauth.auth.signOut();
  }

}
