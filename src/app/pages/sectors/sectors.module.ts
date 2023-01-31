import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { SectorsRoutingModule } from './sectors-routing.module';
import { SectorsComponent } from './sectors/sectors.component';
import { SectorDetailsComponent } from './sector-details/sector-details.component';
import { MatButtonModule } from '@angular/material/button';
import { CoreCompModule } from 'src/app/core/core-comp/core-comp.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [SectorsComponent, SectorDetailsComponent],
  imports: [
    CommonModule,
    SectorsRoutingModule,
    MatCardModule,
    MatButtonModule,
    SharedModule,
    CoreCompModule,
  ],
})
export class SectorsModule {}
