/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PortafolioMinimalistComponent } from './portafolio-minimalist.component';

describe('PortafolioMinimalistComponent', () => {
  let component: PortafolioMinimalistComponent;
  let fixture: ComponentFixture<PortafolioMinimalistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PortafolioMinimalistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortafolioMinimalistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
