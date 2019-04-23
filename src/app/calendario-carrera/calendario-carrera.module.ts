import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CalendarioCarreraPage } from './calendario-carrera.page';
import { ComponentesComunesModule } from '../componentes-comunes/componentes-comunes.module';
import { FullCalendarModule } from '@fullcalendar/angular';

const routes: Routes = [
  {
    path: '',
    component: CalendarioCarreraPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentesComunesModule,
    FullCalendarModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CalendarioCarreraPage]
})
export class CalendarioCarreraPageModule {}
