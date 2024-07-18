import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutClasicComponent } from './layout-clasic.component';

describe('LayoutClasicComponent', () => {
  let component: LayoutClasicComponent;
  let fixture: ComponentFixture<LayoutClasicComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LayoutClasicComponent]
    });
    fixture = TestBed.createComponent(LayoutClasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
