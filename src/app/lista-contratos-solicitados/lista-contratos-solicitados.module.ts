import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ListaContratosSolicitadosPage } from './lista-contratos-solicitados.page';
import { ComponentesComunesModule } from '../componentes-comunes/componentes-comunes.module';

const routes: Routes = [
  {
    path: '',
    component: ListaContratosSolicitadosPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ComponentesComunesModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ListaContratosSolicitadosPage]
})
export class ListaContratosSolicitadosPageModule {}
