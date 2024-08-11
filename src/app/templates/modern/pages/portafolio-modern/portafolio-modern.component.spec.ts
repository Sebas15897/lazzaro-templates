import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortafolioModernComponent } from './portafolio-modern.component';

describe('PortafolioModernComponent', () => {
  let component: PortafolioModernComponent;
  let fixture: ComponentFixture<PortafolioModernComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PortafolioModernComponent]
    });
    fixture = TestBed.createComponent(PortafolioModernComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
