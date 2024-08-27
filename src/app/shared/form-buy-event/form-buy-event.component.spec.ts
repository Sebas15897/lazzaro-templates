import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBuyComponent } from './form-buy-event.component';

describe('FormBuyComponent', () => {
  let component: FormBuyComponent;
  let fixture: ComponentFixture<FormBuyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormBuyComponent]
    });
    fixture = TestBed.createComponent(FormBuyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
