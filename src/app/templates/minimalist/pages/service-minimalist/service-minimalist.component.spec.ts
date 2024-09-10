import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceMinimalistComponent } from './service-minimalist.component';

describe('ServiceMinimalistComponent', () => {
  let component: ServiceMinimalistComponent;
  let fixture: ComponentFixture<ServiceMinimalistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ServiceMinimalistComponent]
    });
    fixture = TestBed.createComponent(ServiceMinimalistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
