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
              this._createUserIfNotExists();
            } else {
              observer.next(false);
            }
          },
          error => observer.error(error)
        );
      });
  }

  public loginSub(): Observable<firebase.User> {
    return this.afauth.authState;
  }

  _createUserIfNotExists() {
    this.refs.user.once('value', u => {
      if (u.val() == null) {
        u.ref.update({'_id': this.fbUser.uid});
        console.log("created user in firebase");
      }
    });
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
    this.messageSub(this.fbUser.uid).subscribe(msg => {
      if (msg != null) {
        // show toast
        this.toaster.create({
          message: msg,
          duration: 3000
        }).present();
      }
    }, error => console.log(error));
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
    let first = true;
    return new Observable((observer: Observer<string>) =>
      firebase.database().ref(`users/${uid}/message`)
        .on('value',
          (s) => {
            if (s == null) {
              // if we don't check for null, it breaks, (dunny why)
            } else if (first) {
              first = false;
            } else if (s.val() && s.val().message) {
              observer.next(s.val().message);
            }
          },
          error => observer.error(error)
        ));
  }

  addTransaction(user: User, fcName: string, pts: number, message = null) {
    const key = `${this.managingBusiness.infos.name}_${fcName}`;
    const time = new Date().getTime();
    const rootRef = firebase.database().ref(`users/${user._id}`);

    const messageObject = {
      date: time,
      message: message != null ? message : `Got ${pts} from ${this.managingBusiness.infos.name} (${fcName})`
    };

    rootRef.child(`FCs/${key}/${time}`).set({date: time, pts: pts});
    rootRef.child('message').set(messageObject);
  }

  _createMessage(message): object {
    return {
      date: new Date().getTime(),
      message: message
    }
  }

}
