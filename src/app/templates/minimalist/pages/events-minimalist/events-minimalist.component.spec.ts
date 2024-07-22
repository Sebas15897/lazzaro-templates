/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EventsMinimalistComponent } from './events-minimalist.component';

describe('EventsMinimalistComponent', () => {
  let component: EventsMinimalistComponent;
  let fixture: ComponentFixture<EventsMinimalistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventsMinimalistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventsMinimalistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
