import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Gg1Page } from './gg1.page';

describe('Gg1Page', () => {
  let component: Gg1Page;
  let fixture: ComponentFixture<Gg1Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Gg1Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Gg1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
