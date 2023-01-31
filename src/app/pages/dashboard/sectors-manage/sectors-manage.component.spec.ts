import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectorsManageComponent } from './sectors-manage.component';

describe('SectorsManageComponent', () => {
  let component: SectorsManageComponent;
  let fixture: ComponentFixture<SectorsManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SectorsManageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SectorsManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
