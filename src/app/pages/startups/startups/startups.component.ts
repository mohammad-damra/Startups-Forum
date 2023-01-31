import { Component, OnInit, OnDestroy } from '@angular/core';
import IStartup from 'src/app/models/startup.modal';
import { ModalService } from 'src/app/services/modal.service';
import { StartupsService } from 'src/app/services/startups.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-startups',
  templateUrl: './startups.component.html',
  styleUrls: ['./startups.component.scss'],
})
export class StartupsComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<void>();

  startups: IStartup[] = [];
  showSpinner: boolean = true;

  constructor(
    private _startups: StartupsService,
    public _modal: ModalService
  ) {}

  ngOnInit(): void {
    this._startups
      .getAllStartups()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (startups: any) => {
          this.showSpinner = false;
          this.startups = startups;
        },
        error: (err) => console.log('error occured in getting sectors'),
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
