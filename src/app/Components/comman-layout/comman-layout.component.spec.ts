import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommanLayoutComponent } from './comman-layout.component';

describe('CommanLayoutComponent', () => {
  let component: CommanLayoutComponent;
  let fixture: ComponentFixture<CommanLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommanLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommanLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
