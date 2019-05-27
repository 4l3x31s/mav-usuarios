import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CarrerasAceptadasPage } from './carreras-aceptadas.page';

const routes: Routes = [
  {
    path: '',
    component: CarrerasAceptadasPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CarrerasAceptadasPage]
})
export class CarrerasAceptadasPageModule {}
