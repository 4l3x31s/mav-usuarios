import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CalificarCarreraPage } from './calificar-carrera.page';
import { IonicRatingModule } from 'ionic4-rating';
import { ComponentesComunesModule } from 'src/app/componentes-comunes/componentes-comunes.module';

const routes: Routes = [
  {
    path: '',
    component: CalificarCarreraPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    IonicRatingModule,
    ComponentesComunesModule,
    RouterModule.forChild(routes),
  ],
  declarations: [CalificarCarreraPage]
})
export class CalificarCarreraPageModule {}
