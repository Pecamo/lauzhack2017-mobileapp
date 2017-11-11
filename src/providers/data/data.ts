import {Injectable} from '@angular/core';

// see https://github.com/angular/angularfire2/blob/master/docs/version-4-upgrade.md#removing-angularfire-for-modularity
// Do not import from 'firebase' as you'd lose the tree shaking benefits
import * as firebase from 'firebase/app';
import {AngularFireAuth} from "angularfire2/auth";
import {Observable} from "rxjs/Observable";
import {Observer} from "rxjs/Observer";
import {Business, BusinessInfo, User} from "../../types";

/*
  Generated class for the DataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataProvider {

  private initialized = false;

  public refs = {
    'businesses': null,
    'user': null,
    'managers': null
  };

  public user: firebase.User;

  constructor(private afauth: AngularFireAuth) {

  }


  init(): Observable<any> {
    return (this.initialized) ? Observable.of(true) :
      this.afauth.authState.map(
        user => {
          this.user = user;
          this._init();
          return true;
        },
        error => false
      );
  }

  _init() {
    this.refs.businesses = firebase.database().ref('businesses');
    this.refs.user = firebase.database().ref(`users/${this.user.uid}`);
    // create user if not exist
    /*this.refs.user.once('value', u => {
      if (u.val() == null) {
        u.ref.update({'_id': this.user.uid});
        console.log("created user in firebase");
      }
    });*/
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

  businessSub(): Observable<Business[]> {
    return new Observable((observer: Observer<Business[]>) => {
      this.refs.businesses.on('value',
        (s) => {
          let bs = s.val();
          observer.next(Object.keys(bs).map(k => {
            let obj = bs[k];
            obj._id = k;
            return <Business>obj;
          }));
        }
      );
    });
  }

  userSub(): Observable<User> {
    return new Observable((observer: Observer<User>) => {
      this.refs.user.on('value',
        (s) => {
          let u = s.val();
          observer.next(<User>u);
        }
      );
    });
  }


}
