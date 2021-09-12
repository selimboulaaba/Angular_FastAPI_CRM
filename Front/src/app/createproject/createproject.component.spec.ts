import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateprojectComponent } from './createproject.component';

describe('CreateprojectComponent', () => {
  let component: CreateprojectComponent;
  let fixture: ComponentFixture<CreateprojectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateprojectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateprojectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
