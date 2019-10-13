import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroRemissePage } from './registro-remisse.page';

describe('RegistroRemissePage', () => {
  let component: RegistroRemissePage;
  let fixture: ComponentFixture<RegistroRemissePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistroRemissePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroRemissePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
