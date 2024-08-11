import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductModernComponent } from './product-modern.component';

describe('ProductModernComponent', () => {
  let component: ProductModernComponent;
  let fixture: ComponentFixture<ProductModernComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductModernComponent]
    });
    fixture = TestBed.createComponent(ProductModernComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
