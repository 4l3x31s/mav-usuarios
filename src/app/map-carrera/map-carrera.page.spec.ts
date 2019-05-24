import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapCarreraPage } from './map-carrera.page';

describe('MapCarreraPage', () => {
  let component: MapCarreraPage;
  let fixture: ComponentFixture<MapCarreraPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapCarreraPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapCarreraPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
