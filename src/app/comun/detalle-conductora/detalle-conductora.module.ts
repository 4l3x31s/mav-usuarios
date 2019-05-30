import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DetalleConductoraPage } from './detalle-conductora.page';
import { ComponentesComunesModule } from 'src/app/componentes-comunes/componentes-comunes.module';
import { SubirImagenModule } from 'src/app/componentes/subir-imagen/subir-imagen.module';

const routes: Routes = [
  {
    path: '',
    component: DetalleConductoraPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentesComunesModule,
    ReactiveFormsModule,
    SubirImagenModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DetalleConductoraPage]
})
export class DetalleConductoraPageModule {}
