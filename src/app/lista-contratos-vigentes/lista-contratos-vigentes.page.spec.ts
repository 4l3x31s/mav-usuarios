import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaContratosVigentesPage } from './lista-contratos-vigentes.page';

describe('ListaContratosVigentesPage', () => {
  let component: ListaContratosVigentesPage;
  let fixture: ComponentFixture<ListaContratosVigentesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaContratosVigentesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaContratosVigentesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
