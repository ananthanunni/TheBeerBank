import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrollSurfaceComponent } from './scroll-surface.component';

describe('ScrollSurfaceComponent', () => {
  let component: ScrollSurfaceComponent;
  let fixture: ComponentFixture<ScrollSurfaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScrollSurfaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScrollSurfaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
