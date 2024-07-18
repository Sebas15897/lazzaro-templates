import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutMinimalistComponent } from './layout-minimalist.component';

describe('LayoutMinimalistComponent', () => {
  let component: LayoutMinimalistComponent;
  let fixture: ComponentFixture<LayoutMinimalistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LayoutMinimalistComponent]
    });
    fixture = TestBed.createComponent(LayoutMinimalistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
