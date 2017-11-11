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


  private managingBusiness: Business;
  private user: firebase.User;

  constructor(private afauth: AngularFireAuth) {

  }


  init(): Observable<boolean> {
    return (this.initialized) ? Observable.of(this.user != null) :
      new Observable((observer: Observer<any>) => {
        this.afauth.authState.subscribe(
          user => {
            this.user = user;
            this.initialized = true;
            if (user != null) this._init(observer);
            else observer.next(false);
          },
          error => observer.error(error)
        );
      });
  }

  _init(observer: Observer<boolean>) {
    this.refs.businesses = firebase.database().ref('businesses');
    this.refs.user = firebase.database().ref(`users/${this.user.uid}`);
    firebase.database().ref(`managers/${this.user.uid}`).once('value', m => {
      if (m.val() != null) {
        this.refs.businesses.child(m.val().business_id).once('value', b => {
          this.managingBusiness = <Business>b;
          observer.next(true);
        });
      } else {
        observer.next(true);
      }
    });
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

  isManager(): boolean {
    return this.managingBusiness != null;
  }

  getUser(): firebase.User {
    return this.user;
  }

  getManagingBusiness(): Business {
    return this.managingBusiness;
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
