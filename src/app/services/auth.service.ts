import { Injectable } from '@angular/core';
import { UserCredential } from '@firebase/auth-types';
import { BehaviorSubject, from, Observable, of } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import IUser from '../models/user.modal';
import { map, delay, switchMap } from 'rxjs/operators';
import { GoogleAuthProvider, User } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public isLoggedIn$ = new BehaviorSubject<boolean>(
    !!localStorage.getItem('userID')
  );
  private isAdmin = new BehaviorSubject<boolean | null>(null);
  readonly isAdmin$ = this.isAdmin.asObservable();

  user$: Observable<any>;
  private redirect = false;

  constructor(
    private _authFire: AngularFireAuth,
    private db: AngularFireDatabase
  ) {
    this.user$ = _authFire.authState;
    this.authStateSub();
  }

  get isLogged() {
    return this.isLoggedIn$;
  }

  public createUsers(userData: IUser): Observable<UserCredential> {
    const userCred = from(
      this._authFire.createUserWithEmailAndPassword(
        userData.email as string,
        userData.password as string
      )
    ).pipe(delay(1000));
    return userCred;
  }

  public createUsersData(userId: any, userData: IUser) {
    this.db.list('/users').update(userId, {
      fname: userData.fname,
      lname: userData.lname,
      email: userData.email,
      age: userData.age,
      profession: userData.profession,
      phoneNumber: userData.phoneNumber,
      userId: userId,
      isAdmin: false,
    });
  }

  public login(email: string, password: string): Observable<any> {
    const userLog = from(
      this._authFire.signInWithEmailAndPassword(email, password)
    ).pipe(delay(1000));

    return userLog;
  }

  public LoginWithGoogle() {
    this._authFire.signInWithRedirect(new GoogleAuthProvider());
  }

  logout(): Observable<any> {
    return from(this._authFire.signOut());
  }

  saveGoogleUsers(user: User) {
    this.db.object('/users/' + user.uid).update({
      name: user.displayName,
      email: user.email,
    });
  }

  getCurrentUser() {
    return this._authFire.authState;
  }

  getAllUsers() {
    return this.db.list('/users/').valueChanges();
  }

  getUsersById(uid: any) {
    return this.db.object('/users/' + uid);
  }

  getCurrentUserDb(): Observable<any> {
    return this._authFire.authState.pipe(
      switchMap((user) => {
        return this.getUsersById(user?.uid)
          .valueChanges()
          .pipe(
            map((user) => {
              return user;
            })
          );
      })
    );
  }

  authStateSub() {
    this._authFire.authState.subscribe((user) => {
      if (user) {
        localStorage.setItem('userID', user.uid);
        this.isLoggedIn$.next(true);
      } else {
        localStorage.removeItem('userID');
        this.isLoggedIn$.next(false);
      }
    });
  }

  isUserAdmin() {
    this.getCurrentUser()
      .pipe(
        switchMap((user) => {
          if (!user) return 'NoUser';
          return this.getCurrentUserDb().pipe(
            map((user) => {
              return user;
            })
          );
        })
      )
      .subscribe({
        next: (user) => {
          if (user.isAdmin) {
            this.isAdmin.next(true);
          } else {
            this.isAdmin.next(false);
          }
        },
      });
  }
}
