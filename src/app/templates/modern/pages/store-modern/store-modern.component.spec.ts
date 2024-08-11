import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreModernComponent } from './store-modern.component';

describe('StoreModernComponent', () => {
  let component: StoreModernComponent;
  let fixture: ComponentFixture<StoreModernComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StoreModernComponent]
    });
    fixture = TestBed.createComponent(StoreModernComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
