import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import ISector from 'src/app/models/sectors.modal';
import { FirestorgeService } from 'src/app/services/firestorge.service';
import { SectorsService } from 'src/app/services/sectors.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-add-sector',
  templateUrl: './add-sector.component.html',
  styleUrls: ['./add-sector.component.scss'],
})
export class AddSectorComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<void>();
  logoUrl: any = '';
  sector: ISector = {
    designColor: '',
    parentCategoryName: '',
    sectorLogo: '',
    sectorName: '',
  };
  path!: any;

  constructor(
    private _fireStorge: FirestorgeService,
    private _sectorsApi: SectorsService,
    public dialogRef: MatDialogRef<AddSectorComponent>,
    @Inject(MAT_DIALOG_DATA) public idSector: ISector
  ) {}

  ngOnInit(): void {
    this.getSectorById();
  }
  getSectorById() {
    this._sectorsApi
      .getSectorById(this.idSector?.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((sector: any) => {
        if (sector) {
          this.sector = sector;
        }
      });
  }
  uploadLogo($event: any) {
    this.path = $event.target.files[0];

    if (!this.path) {
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => (this.logoUrl = reader.result);
    reader.readAsDataURL(this.path);
  }
  submitSector(form: any) {
    if (this.idSector) {
      // Linking logo upload to storage then to database
      if (this.path) {
        this._fireStorge
          .upload(this.path)
          .pipe(takeUntil(this.destroy$))
          .subscribe({
            complete: () => {
              this.getFileUrl();
            },
          });
      } else {
        this.update();
      }
    } else {
      if (this.path) {
        this._fireStorge.upload(this.path).subscribe({
          complete: () => {
            this.getFileUrl();
          },
        });
      } else {
        this.add();
      }
    }
  }
  getFileUrl() {
    this._fireStorge
      .getFileUrl()
      .pipe(takeUntil(this.destroy$))
      .subscribe((url: any) => {
        this.sector.sectorLogo = url;
        if (this.idSector) {
          this.update();
        } else {
          this.add();
        }
      });
  }
  onClose() {
    this.dialogRef.close();
  }
  update() {
    this._sectorsApi.update(this.idSector.id, this.sector).finally(() => {
      this.onClose();
    });
  }
  add() {
    this._sectorsApi.AddSector(this.sector).then(() => {
      this.onClose();
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
