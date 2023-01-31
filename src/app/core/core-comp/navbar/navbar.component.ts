import {
  Component,
  HostListener,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ModalService } from 'src/app/services/modal.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { UsersDataService } from 'src/app/initializer/users-data.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<void>();
  showDashDropdown: boolean = false;
  enterdSearchValue: string = '';
  sticky: boolean = false;
  userName!: string;
  showSidebar: boolean = false;
  isAdmin!: boolean | null;
  isHome: boolean = true;

  constructor(
    public _modal: ModalService,
    public _auth: AuthService,
    public _authFire: AngularFireAuth,
    private router: Router,
    public _userData: UsersDataService
  ) {}

  ngOnInit(): void {
    this.currentPath();
    this.isUserAdmin();
    this.currentUserData();
  }

  isUserAdmin() {
    this._userData.userData$.subscribe((user) => {
      if (user) {
        this.isAdmin = user?.isAdmin;
      } else {
        this.isAdmin = false;
      }
    });
  }

  currentPath() {
    if (this.router.url === '/home') {
      this.isHome = true;
    } else {
      this.isHome = false;
    }
    console.log(this.isHome);
  }

  currentUserData() {
    this._userData.userData$.subscribe((user) => {
      if (user) {
        this.userName = user.fname;
      }
    });
  }

  openModal($event: Event, id: string) {
    $event.preventDefault();
    $event.stopPropagation();
    this._modal.toggleModal(id);
  }
  //stick nav
  @HostListener('window:scroll', ['$event']) onscroll() {
    if (window.scrollY > 100) {
      this.sticky = true;
    } else {
      this.sticky = false;
    }
  }

  //sidebar
  handleSidebar() {
    this.showSidebar = true;
  }
  handleSidebarClose() {
    this.showSidebar = false;
  }

  logout() {
    this._auth
      .logout()
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.router.navigateByUrl('/home'));
  }

  dashDropdown() {
    this.showDashDropdown = !this.showDashDropdown;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
