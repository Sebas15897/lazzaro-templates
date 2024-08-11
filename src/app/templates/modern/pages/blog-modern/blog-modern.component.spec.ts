import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogModernComponent } from './blog-modern.component';

describe('BlogModernComponent', () => {
  let component: BlogModernComponent;
  let fixture: ComponentFixture<BlogModernComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BlogModernComponent]
    });
    fixture = TestBed.createComponent(BlogModernComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
