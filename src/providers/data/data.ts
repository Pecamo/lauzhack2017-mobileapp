import {Injectable} from '@angular/core';

// see https://github.com/angular/angularfire2/blob/master/docs/version-4-upgrade.md#removing-angularfire-for-modularity
// Do not import from 'firebase' as you'd lose the tree shaking benefits
import * as firebase from 'firebase/app';
import {AngularFireAuth} from "angularfire2/auth";
import {Observable} from "rxjs/Observable";
import {Observer} from "rxjs/Observer";
import {Business, User} from "../../types";
import {Subscription} from "rxjs/Subscription";
import {ToastController} from "ionic-angular";

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


  public managingBusiness: Business;
  public fbUser: firebase.User;

  private messageWatcher: Subscription;

  constructor(private afauth: AngularFireAuth, private toaster: ToastController) {

  }

  init(): Observable<boolean> {
    return (this.initialized) ? Observable.of(this.fbUser != null) :
      new Observable((observer: Observer<boolean>) => {
        this.loginSub().subscribe(
          (user: firebase.User) => {
            this.fbUser = user;
            this.initialized = true;
            if (user != null) {
              this._init(observer);
              this._initMessageWatcher();
            } else {
              observer.next(false);
              if (this.messageWatcher != null) this.messageWatcher.unsubscribe();
            }
          },
          error => observer.error(error)
        );
      });
  }

  public loginSub(): Observable<firebase.User> {
    return this.afauth.authState;
  }

  _init(observer: Observer<boolean>) {
    this.refs.businesses = firebase.database().ref('businesses');
    this.refs.user = firebase.database().ref(`users/${this.fbUser.uid}`);
    firebase.database().ref(`managers/${this.fbUser.uid}`).once('value', m => {
      if (m.val() != null) {
        this.refs.businesses.child(m.val().business_id).once('value', b => {
          this.managingBusiness = <Business>b.val();
          observer.next(true);
        });
      } else {
        observer.next(true);
      }
    });
  }

  _initMessageWatcher() {
    let first = true;
    this.messageWatcher = this.messageSub(this.fbUser.uid).subscribe(msg => {
      // ignore first update
      if (first) {
        first = false;
        return;
      } else if (msg != null) {
        // show toast
        this.toaster.create({
          message: msg,
          duration: 3000
        }).present();
      }
    });
  }

  isLoggedIn(): boolean {
    return this.afauth.auth.currentUser != null;
  }

  isManager(): boolean {
    return this.managingBusiness != null;
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

  // userSub(): Observable<User> {
  //   return new Observable((observer: Observer<User>) => {
  //     this.refs.user.on('value',
  //       (s) => {
  //         let u = s.val();
  //         if(u != null) u._id = this.user.uid;
  //         observer.next(<User>u);
  //       }
  //     );
  //   });
  // }

  getUserFromUID(uid: string, once = true): Observable<User> {
    let ref = firebase.database().ref(`users/${uid}`);
    let mapping = (s) => {
      let u = s.val();
      if (u != null) u._id = uid;
      return u;
    };

    return new Observable((observer: Observer<User>) => {
      if (once) {
        ref.once('value', s => observer.next(mapping(s)), observer.error);
      } else {
        ref.on('value', s => observer.next(mapping(s)), observer.error);
      }
    });
  }

  messageSub(uid: string): Observable<string> {
    return new Observable((observer: Observer<string>) =>
      firebase.database().ref(`users/${uid}/message`)
        .on('value',
          (s) => observer.next(s.val()),
          error => observer.error(error)
        ));
  }

}
