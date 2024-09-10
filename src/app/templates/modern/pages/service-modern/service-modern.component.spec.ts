import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceModernComponent } from './service-modern.component';

describe('ServiceModernComponent', () => {
  let component: ServiceModernComponent;
  let fixture: ComponentFixture<ServiceModernComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ServiceModernComponent]
    });
    fixture = TestBed.createComponent(ServiceModernComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
