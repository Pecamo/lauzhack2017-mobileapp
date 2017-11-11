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

  private initialized = false;

  public user: firebase.User;

  constructor(private afauth: AngularFireAuth, private af: AngularFireDatabase) {
  }


  init(): Observable<any> {
    return (this.initialized) ? Observable.of(true) :
      this.afauth.authState.map(
        user => {
          console.log(user);
          this.user = user;
          return true;
        },
        error => false
      );
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
