import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { BehaviorSubject, delay, map, Observable, switchMap } from 'rxjs';
import IUser from '../models/user.modal';
import { LoaderService } from '../services/loader.service';

@Injectable({
  providedIn: 'root',
})
export class UsersDataService {
  public isAuthenticated$: Observable<boolean>;
  public isAuthenticatedDelayed$: Observable<boolean>;
  private usersData = new BehaviorSubject<IUser | null>(null); // store the data
  public isLoggedIn$ = new BehaviorSubject<boolean>(
    !!localStorage.getItem('userID')
  );

  readonly userData$ = this.usersData.asObservable(); //making observable convert the behaviorSubject

  constructor(
    private fireAuth: AngularFireAuth,
    private db: AngularFireDatabase,
    private _lodaer: LoaderService
  ) {
    this.isAuthenticated$ = fireAuth.user.pipe(map((user) => !!user));
    this.isAuthenticatedDelayed$ = this.isAuthenticated$.pipe(delay(2000));
  }

  get IsLogged() {
    return this.isLoggedIn$.getValue();
  }

  getUserByID(uid: any) {
    return this.db.object('/users/' + uid);
  }

  Init() {
    return new Promise<boolean>((resolve, reject) => {
      this._lodaer.setLoading(true);
      this.fireAuth.authState
        .pipe(
          switchMap((user) => {
            return this.getUserByID(user?.uid)
              .valueChanges()
              .pipe(map((user) => user));
          })
        )
        .subscribe({
          next: (data: any) => {
            if (data) {
              this.usersData.next(data);
            } else {
              this.usersData.next(null);
            }
          },
        });
      resolve(true);
      setInterval(() => {
        this._lodaer.setLoading(false);
      }, 2000);
    });
  }
}
