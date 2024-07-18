import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeModernComponent } from './home-modern.component';

describe('HomeModernComponent', () => {
  let component: HomeModernComponent;
  let fixture: ComponentFixture<HomeModernComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeModernComponent]
    });
    fixture = TestBed.createComponent(HomeModernComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
