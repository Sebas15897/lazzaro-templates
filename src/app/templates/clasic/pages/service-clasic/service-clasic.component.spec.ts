import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceClasicComponent } from './service-clasic.component';

describe('ServiceClasicComponent', () => {
  let component: ServiceClasicComponent;
  let fixture: ComponentFixture<ServiceClasicComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ServiceClasicComponent]
    });
    fixture = TestBed.createComponent(ServiceClasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
