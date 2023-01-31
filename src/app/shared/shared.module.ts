import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal/modal.component';
import { InputComponent } from './input/input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { AlertComponent } from './alert/alert.component';
import { JoinPipe } from './pipes/join.pipe';
import { SpinnerComponent } from './spinner/spinner.component';
import { EventBlockerDirective } from './directive/event-blocker.directive';

@NgModule({
  declarations: [
    ModalComponent,
    InputComponent,
    AlertComponent,
    AlertComponent,
    JoinPipe,
    SpinnerComponent,
    EventBlockerDirective,
  ],
  imports: [CommonModule, ReactiveFormsModule, NgxMaskModule.forRoot()],
  exports: [
    ModalComponent,
    InputComponent,
    AlertComponent,
    JoinPipe,
    SpinnerComponent,
    EventBlockerDirective,
  ],
})
export class SharedModule {}
