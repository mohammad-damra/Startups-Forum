import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartupsManageComponent } from './startups-manage.component';

describe('StartupsManageComponent', () => {
  let component: StartupsManageComponent;
  let fixture: ComponentFixture<StartupsManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StartupsManageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StartupsManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
