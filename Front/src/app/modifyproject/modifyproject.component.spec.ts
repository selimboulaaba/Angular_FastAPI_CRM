import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyprojectComponent } from './modifyproject.component';

describe('ModifyprojectComponent', () => {
  let component: ModifyprojectComponent;
  let fixture: ComponentFixture<ModifyprojectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyprojectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyprojectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
