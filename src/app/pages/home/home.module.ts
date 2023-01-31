import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { HeroComponent } from './hero/hero.component';
import { CoreCompModule } from 'src/app/core/core-comp/core-comp.module';
import { SectorsExploreComponent } from './sectors-explore/sectors-explore.component';
import { StartupsListComponent } from './startups-list/startups-list.component';
import { MatTabsModule } from '@angular/material/tabs';
import { WelcomeComponent } from './welcome/welcome.component';
import { RequestComponent } from './request/request.component';
import { SwiperModule } from 'swiper/angular';
import { SharedModule } from 'src/app/shared/shared.module';
import { BeginComponent } from './begin/begin.component';

@NgModule({
  declarations: [
    HomeComponent,
    HeroComponent,
    SectorsExploreComponent,
    StartupsListComponent,
    WelcomeComponent,
    RequestComponent,
    BeginComponent,
  ],
  imports: [
    CoreCompModule,
    SwiperModule,
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'home',
        component: HomeComponent,
      },
    ]),
    MatTabsModule,
    CommonModule,
  ],
  exports: [],
})
export class HomeModule {}
