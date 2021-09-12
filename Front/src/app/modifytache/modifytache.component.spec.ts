import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifytacheComponent } from './modifytache.component';

describe('ModifytacheComponent', () => {
  let component: ModifytacheComponent;
  let fixture: ComponentFixture<ModifytacheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifytacheComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifytacheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
