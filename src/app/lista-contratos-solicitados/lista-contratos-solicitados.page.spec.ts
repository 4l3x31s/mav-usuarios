import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaContratosSolicitadosPage } from './lista-contratos-solicitados.page';

describe('ListaContratosSolicitadosPage', () => {
  let component: ListaContratosSolicitadosPage;
  let fixture: ComponentFixture<ListaContratosSolicitadosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaContratosSolicitadosPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaContratosSolicitadosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
