import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StartupsRoutingModule } from './startups-routing.module';
import { StartupsComponent } from './startups/startups.component';
import { StartupDetailsComponent } from './startup-details/startup-details.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatSelectModule } from '@angular/material/select';
import { CustomFormsModule } from 'ng2-validation';
import { CoreCompModule } from 'src/app/core/core-comp/core-comp.module';
import { AddStartupComponent } from './add-startup/add-startup.component';

@NgModule({
  declarations: [
    StartupsComponent,
    StartupDetailsComponent,
    AddStartupComponent,
  ],
  imports: [
    CommonModule,
    StartupsRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    SharedModule,
    MatPaginatorModule,
    CustomFormsModule,
    MatSortModule,
    MatIconModule,
    FormsModule,
    MatSelectModule,
    CoreCompModule,
    SharedModule,
    ReactiveFormsModule,
  ],
  exports: [],
})
export class StartupsModule {}
