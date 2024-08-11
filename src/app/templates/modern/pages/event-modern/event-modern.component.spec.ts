import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventModernComponent } from './event-modern.component';

describe('EventModernComponent', () => {
  let component: EventModernComponent;
  let fixture: ComponentFixture<EventModernComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EventModernComponent]
    });
    fixture = TestBed.createComponent(EventModernComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
