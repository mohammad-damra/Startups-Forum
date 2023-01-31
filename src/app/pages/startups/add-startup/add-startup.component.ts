import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import IStartup from 'src/app/models/startup.modal';
import { AlertsService } from 'src/app/services/alerts.service';
import { FirestorgeService } from 'src/app/services/firestorge.service';
import { SectorsService } from 'src/app/services/sectors.service';
import { StartupsService } from 'src/app/services/startups.service';

@Component({
  selector: 'app-add-startup',
  templateUrl: './add-startup.component.html',
  styleUrls: ['./add-startup.component.scss'],
})
export class AddStartupComponent implements OnInit {
  private readonly destroy$ = new Subject<void>();
  addStartup!: FormGroup;
  isDragover = false;
  nextStep = false;
  logoUrl: any = '';
  file: File | null = null;
  showAlert = false;
  sectors: any;
  isAdmin!: any;
  id = '';
  startupLogoURL!: string;
  startupbyID!: IStartup;
  inSubmission = false;
  uploadTask?: any;

  startup: IStartup = {
    startupName: '',
    startupCity: '',
    sectorName: [],
    founderName: '',
    numberOfEmployee: null,
    yearOfEstablishment: null,
    websiteURL: '',
    emailAddress: '',
    startupLogo: '',
    isApproved: false,
    description: '',
    coverImg: '',
  };

  constructor(
    private fb: FormBuilder,
    private firestorage: FirestorgeService,
    private _router: Router,
    private _startupsApi: StartupsService,
    private _sectorsApi: SectorsService,
    private _route: ActivatedRoute,
    private _alerts: AlertsService
  ) {}

  ngOnInit(): void {
    this.getSectors();
    this.getStartupById();
    this.addStartupForm(this.startupbyID);
  }

  getStartupById() {
    this._route.params
      .pipe(takeUntil(this.destroy$))
      .subscribe((params: Params) => {
        if (params.id) {
          this.id = params.id;
          this._startupsApi
            .getStartupById(this.id)
            .pipe(takeUntil(this.destroy$))
            .subscribe((startup: any) => {
              if (startup) {
                this.startup = startup;
                this.addStartupForm(this.startup);
              }
            });
        }
      });
  }

  addStartupForm(startupbyID: any) {
    this.addStartup = this.fb.group({
      startupName: [
        startupbyID ? startupbyID.startupName : '',
        [Validators.required, Validators.minLength(2)],
      ],
      startupCity: [
        startupbyID ? startupbyID.startupCity : '',
        [Validators.required, Validators.minLength(2)],
      ],
      sectorName: [
        startupbyID ? startupbyID.sectorName : null,
        [Validators.required],
      ],
      founderName: [
        startupbyID ? startupbyID.founderName : '',
        [Validators.required, Validators.minLength(2)],
      ],
      numberOfEmployee: [
        startupbyID ? startupbyID.numberOfEmployee : null,
        [Validators.required, Validators.min(0)],
      ],
      yearOfEstablishment: [
        startupbyID ? startupbyID.yearOfEstablishment : null,
        [Validators.required, Validators.min(1900), Validators.max(2030)],
      ],
      websiteURL: [
        startupbyID ? startupbyID.websiteURL : '',
        [Validators.required],
      ],
      emailAddress: [
        startupbyID ? startupbyID.emailAddress : '',
        [Validators.required, Validators.email],
      ],
      description: [
        startupbyID ? startupbyID.description : '',
        [Validators.required],
      ],
      startupLogo: [
        startupbyID ? this.editLogo(startupbyID.startupLogo) : '',
        [Validators.required],
      ],
      coverImg: [startupbyID ? startupbyID.coverImg : ''],
    });
  }

  editLogo(url: string) {
    this.logoUrl = url;
  }

  get startupName() {
    return this.addStartup.get('startupName') as FormControl;
  }
  get startupCity() {
    return this.addStartup.get('startupCity') as FormControl;
  }
  get sectorName() {
    return this.addStartup.get('sectorName') as FormControl;
  }
  get founderName() {
    return this.addStartup.get('founderName') as FormControl;
  }
  get numberOfEmployee() {
    return this.addStartup.get('numberOfEmployee') as FormControl;
  }
  get yearOfEstablishment() {
    return this.addStartup.get('yearOfEstablishment') as FormControl;
  }
  get websiteURL() {
    return this.addStartup.get('websiteURL') as FormControl;
  }
  get emailAddress() {
    return this.addStartup.get('emailAddress') as FormControl;
  }
  get description() {
    return this.addStartup.get('description') as FormControl;
  }
  get coverImg() {
    return this.addStartup.get('coverImg') as FormControl;
  }

  getSectors() {
    this._sectorsApi
      .getAllSectores()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (sectors) => {
          this.sectors = sectors;
        },
      });
  }

  uploadLogo($event: any) {
    this.isDragover = false;
    this.nextStep = true;
    this.file = ($event as DragEvent).dataTransfer
      ? ($event as DragEvent).dataTransfer?.files.item(0) ?? null
      : $event.target.files[0] ?? null;
    if (!this.file) {
      return;
    }
    this.nextStep = true;
    const reader = new FileReader();
    reader.onload = (e) => (this.logoUrl = reader.result);
    reader.readAsDataURL(this.file);
  }

  returnToDashboard() {
    this._router.navigateByUrl('/dashboard/startups-manage');
  }

  update() {
    this._startupsApi.update(this.id, this.startup).finally(() => {
      this.addStartup.reset();
      this.returnToDashboard();
    });
  }
  getURL() {
    this.firestorage
      .getDropFileURL()
      .pipe(takeUntil(this.destroy$))
      .subscribe((url: any) => {
        this.startupLogoURL = url;
        this.startup.startupLogo = url;
        if (this.id) {
          this.update();
        } else {
          this.startup = {
            startupName: this.startupName.value,
            startupCity: this.startupCity.value,
            sectorName: this.sectorName.value,
            founderName: this.founderName.value,
            numberOfEmployee: this.numberOfEmployee.value,
            yearOfEstablishment: this.yearOfEstablishment.value,
            websiteURL: this.websiteURL.value,
            emailAddress: this.emailAddress.value,
            startupLogo: this.startupLogoURL,
            isApproved: false,
            description: this.description.value,
            coverImg: this.coverImg.value,
          };
          this.add(this.startup);
        }
      });
  }

  addStartupSubmit() {
    this.inSubmission = true;
    this.addStartup.disable();
    if (this.id) {
      if (this.file) {
        this.uploadTask = this.firestorage.uploadDrag(this.file);

        this.uploadTask.pipe(takeUntil(this.destroy$)).subscribe({
          error: (error: any) => {
            this._alerts.failUploadLogo();
          },
          complete: () => {
            this.getURL();
          },
        });
      } else {
        this.update();
      }
    } else {
      if (this.file) {
        this.uploadTask = this.firestorage.uploadDrag(this.file);
        this.uploadTask.pipe(takeUntil(this.destroy$)).subscribe({
          error: (error: any) => {
            this._alerts.failUploadLogo();
          },
          complete: () => {
            this.getURL();
          },
        });
      } else {
        this._alerts.generalFailAlert();
      }
    }
  }

  add(startupData: IStartup) {
    this._startupsApi.AddStartup(startupData).subscribe({
      next: () => {
        this._alerts.SuccessAlert();
      },
      error: () => {
        this._alerts.generalFailAlert();
        this.addStartup.enable();
      },
      complete: () => {
        this._router.navigateByUrl('/home');
      },
    });
  }

  removeLogo() {
    this.file = null;
    this.nextStep = false;
    this.logoUrl = null;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
