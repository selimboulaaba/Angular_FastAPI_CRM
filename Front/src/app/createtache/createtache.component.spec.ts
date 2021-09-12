import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatetacheComponent } from './createtache.component';

describe('CreatetacheComponent', () => {
  let component: CreatetacheComponent;
  let fixture: ComponentFixture<CreatetacheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatetacheComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatetacheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
