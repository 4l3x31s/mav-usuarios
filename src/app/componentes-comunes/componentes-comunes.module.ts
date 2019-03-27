import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrintErrorComponent } from './print-error/print-error.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [PrintErrorComponent],
  imports: [
    CommonModule, IonicModule
  ],
  exports: [PrintErrorComponent]
})
export class ComponentesComunesModule { }
