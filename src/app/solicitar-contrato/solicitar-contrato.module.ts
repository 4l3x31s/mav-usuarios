import { ComponentesComunesModule } from './../componentes-comunes/componentes-comunes.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SolicitarContratoPage } from './solicitar-contrato.page';

const routes: Routes = [
  {
    path: '',
    component: SolicitarContratoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentesComunesModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SolicitarContratoPage]
})
export class SolicitarContratoPageModule {}
