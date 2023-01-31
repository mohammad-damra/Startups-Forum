import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectorsExploreComponent } from './sectors-explore.component';

describe('SectorsExploreComponent', () => {
  let component: SectorsExploreComponent;
  let fixture: ComponentFixture<SectorsExploreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SectorsExploreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SectorsExploreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
