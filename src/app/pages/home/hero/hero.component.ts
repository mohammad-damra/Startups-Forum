import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersDataService } from 'src/app/initializer/users-data.service';
import { ModalService } from 'src/app/services/modal.service';
import SwiperCore, { Autoplay, EffectFade } from 'swiper';
SwiperCore.use([Autoplay, EffectFade]);

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss'],
})
export class HeroComponent implements OnInit {
  isUserLogged: boolean = false;
  constructor(
    public _modal: ModalService,
    public _userData: UsersDataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isLogged();
  }

  openModal($event: Event, id: string) {
    $event.preventDefault();
    this._modal.toggleModal(id);
  }

  isLogged() {
    this._userData.isAuthenticated$.subscribe((data) => {
      this.isUserLogged = data;
    });
  }

  checkUser($event: Event) {
    $event.stopPropagation();
    if (this.isUserLogged) {
      this.router.navigate(['/startups/add-startup']);
    } else {
      $event.preventDefault();
      this._modal.toggleModal('RegisterForm');
    }
  }
}
