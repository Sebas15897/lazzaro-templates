import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactModernComponent } from './contact-modern.component';

describe('ContactModernComponent', () => {
  let component: ContactModernComponent;
  let fixture: ComponentFixture<ContactModernComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContactModernComponent]
    });
    fixture = TestBed.createComponent(ContactModernComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
