import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrintErrorComponent } from './print-error/print-error.component';
import { IonicModule } from '@ionic/angular';
import { CabeceraComponent } from './cabecera/cabecera.component';
import { CabeceraBackComponent } from './cabecera-back/cabecera-back.component';

@NgModule({
  declarations: [
    PrintErrorComponent,
    CabeceraComponent,
    CabeceraBackComponent
  ],
  imports: [
    CommonModule, IonicModule
  ],
  exports: [
    PrintErrorComponent,
    CabeceraComponent,
    CabeceraBackComponent
  ]
})
export class ComponentesComunesModule { }
