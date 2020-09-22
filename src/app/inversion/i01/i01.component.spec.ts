import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { I01Component } from './i01.component';

describe('I01Component', () => {
  let component: I01Component;
  let fixture: ComponentFixture<I01Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ I01Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(I01Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
/*
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  */
});
