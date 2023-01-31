import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutRoutingModule } from './about-routing.module';
import { AboutComponent } from './about/about.component';
import { CoreCompModule } from 'src/app/core/core-comp/core-comp.module';
import { AboutAreaComponent } from './about-area/about-area.component';
import { ContanctInfoComponent } from './contanct-info/contanct-info.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
@NgModule({
  declarations: [AboutComponent, AboutAreaComponent, ContanctInfoComponent],
  imports: [
    CoreCompModule,
    CommonModule,
    AboutRoutingModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
  ],
})
export class AboutModule {}
