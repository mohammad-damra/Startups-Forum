import { APP_INITIALIZER, NgModule } from '@angular/core';
import { UsersDataService } from './users-data.service';
import { take } from 'rxjs/operators';

export function initializeApp1(UsersDataService: UsersDataService) {
  return (): Promise<any> => {
    return UsersDataService.Init();
  };
}

@NgModule({
  providers: [
    {
      provide: APP_INITIALIZER,
      multi: true,
      useFactory: initializeApp1,
      deps: [UsersDataService], // to make it avalible as an argument for factory function
    },
    {
      provide: APP_INITIALIZER,
      multi: true,
      useFactory: (data: UsersDataService) => {
        return () => {
          data.isAuthenticated$.pipe(take(1));
        };
      },
      deps: [UsersDataService], // to make it avalible as an argument for factory function
    },
  ],
})
export class InitializerModule {}
