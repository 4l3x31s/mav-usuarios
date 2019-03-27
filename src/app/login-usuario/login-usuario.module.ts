import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { LoginUsuarioPage } from './login-usuario.page';
import { ComponentesComunesModule } from '../componentes-comunes/componentes-comunes.module';

const routes: Routes = [
  {
    path: '',
    component: LoginUsuarioPage
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
  declarations: [LoginUsuarioPage]
})
export class LoginUsuarioPageModule {}
