import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleConductoraPage } from './detalle-conductora.page';

describe('DetalleConductoraPage', () => {
  let component: DetalleConductoraPage;
  let fixture: ComponentFixture<DetalleConductoraPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleConductoraPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleConductoraPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
