import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeMinimalistComponent } from './home-minimalist.component';

describe('HomeMinimalistComponent', () => {
  let component: HomeMinimalistComponent;
  let fixture: ComponentFixture<HomeMinimalistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeMinimalistComponent]
    });
    fixture = TestBed.createComponent(HomeMinimalistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
