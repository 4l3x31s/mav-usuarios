import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintErrorPage } from './print-error.page';

describe('PrintErrorPage', () => {
  let component: PrintErrorPage;
  let fixture: ComponentFixture<PrintErrorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrintErrorPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintErrorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
