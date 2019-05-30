import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { SubirImagenComponent } from './subir-imagen/subir-imagen.component';

@NgModule({
  declarations: [SubirImagenComponent],
  imports: [
    CommonModule, IonicModule
  ],
  exports: [SubirImagenComponent]
})
export class SubirImagenModule { }
