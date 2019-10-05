import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DetalleCarreraPage } from './detalle-carrera.page';
import { IonicRatingModule } from 'ionic4-rating';
import { ComponentesComunesModule } from 'src/app/componentes-comunes/componentes-comunes.module';
import { SubirImagenModule } from 'src/app/componentes/subir-imagen/subir-imagen.module';

const routes: Routes = [
  {
    path: '',
    component: DetalleCarreraPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IonicRatingModule,
    ReactiveFormsModule,
    ComponentesComunesModule,
    SubirImagenModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DetalleCarreraPage]
})
export class DetalleCarreraPageModule {}
