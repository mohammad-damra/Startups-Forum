import { APP_INITIALIZER, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { BannerComponent } from './banner/banner.component';
import { FormsModule } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { take } from 'rxjs/operators';

@NgModule({
  declarations: [NavbarComponent, FooterComponent, BannerComponent],
  imports: [CommonModule, MatIconModule, RouterModule, FormsModule],
  providers: [
    {
      provide: APP_INITIALIZER,
      multi: true,
      useFactory: (auth: AuthService) => {
        return () => {
          auth.isUserAdmin();
          return auth.isAdmin$.pipe(take(1));
        };
      },
      deps: [AuthService], // to make the service avalible as useFactory argument
    },
  ],
  exports: [NavbarComponent, FooterComponent, BannerComponent],
})
export class CoreCompModule {}
