/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { StoreModernComponent } from './store-modern.component';


describe('StoreComponent', () => {
  let component: StoreModernComponent;
  let fixture: ComponentFixture<StoreModernComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreModernComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreModernComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
