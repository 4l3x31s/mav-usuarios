import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule'
  },
  {
    path: 'list',
    loadChildren: './list/list.module#ListPageModule'
  },
  { path: 'detalle-cliente', loadChildren: './detalle-cliente/detalle-cliente.module#DetalleClientePageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },  { path: 'detalle-carrera', loadChildren: './detalle-carrera/detalle-carrera.module#DetalleCarreraPageModule' },
  { path: 'mapa', loadChildren: './comun/mapa/mapa.module#MapaPageModule' },
  { path: 'mapa', loadChildren: './comun/mapa/mapa.module#MapaPageModule' },
  { path: 'calendario', loadChildren: './comun/calendario/calendario.module#CalendarioPageModule' }



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
