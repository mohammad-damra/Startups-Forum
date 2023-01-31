import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContanctInfoComponent } from './contanct-info.component';

describe('ContanctInfoComponent', () => {
  let component: ContanctInfoComponent;
  let fixture: ComponentFixture<ContanctInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContanctInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContanctInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
