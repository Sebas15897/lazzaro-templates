import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeClasicComponent } from './home-clasic.component';

describe('HomeClasicComponent', () => {
  let component: HomeClasicComponent;
  let fixture: ComponentFixture<HomeClasicComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeClasicComponent]
    });
    fixture = TestBed.createComponent(HomeClasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
