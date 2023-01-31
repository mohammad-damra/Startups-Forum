import { BreakpointObserver } from '@angular/cdk/layout';
import {
  Component,
  OnInit,
  OnDestroy,
  Output,
  EventEmitter,
} from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
})
export class SideNavComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<void>();

  @Output() toggle = new EventEmitter<boolean>();

  showSidebar: boolean = false;
  ShowToggle: boolean = true;
  closingSideBar!: boolean;

  constructor(private breakpoint: BreakpointObserver) {}

  ngOnInit(): void {
    this.breakpointObs();
  }

  breakpointObs() {
    this.breakpoint
      .observe('(max-width:985px)')
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        this.ShowToggle = true;
        if (res.matches) {
          this.ShowToggle = false;
          this.closingSideBar = true;
        } else {
          this.closingSideBar = false;
        }
      });
  }

  handleSidebar() {
    this.showSidebar = !this.showSidebar;
    this.toggle.emit(!this.showSidebar);
  }

  closeSideBar() {
    this.closingSideBar = !this.closingSideBar;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
