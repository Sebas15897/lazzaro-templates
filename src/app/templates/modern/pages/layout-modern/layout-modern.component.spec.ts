import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutModernComponent } from './layout-modern.component';

describe('LayoutModernComponent', () => {
  let component: LayoutModernComponent;
  let fixture: ComponentFixture<LayoutModernComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LayoutModernComponent]
    });
    fixture = TestBed.createComponent(LayoutModernComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
