import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
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
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'detalle-carrera', loadChildren: './detalle-carrera/detalle-carrera.module#DetalleCarreraPageModule' },
  { path: 'mapa', loadChildren: './comun/mapa/mapa.module#MapaPageModule' },
  { path: 'calendario', loadChildren: './comun/calendario/calendario.module#CalendarioPageModule' },
  { path: 'detalle-contrato', loadChildren: './detalle-contrato/detalle-contrato.module#DetalleContratoPageModule' },  { path: 'calendario-carrera', loadChildren: './calendario-carrera/calendario-carrera.module#CalendarioCarreraPageModule' },
  { path: 'detalle-carrera', loadChildren: './comun/detalle-carrera/detalle-carrera.module#DetalleCarreraPageModule' },
  { path: 'lista-contratos-solicitados', loadChildren: './lista-contratos-solicitados/lista-contratos-solicitados.module#ListaContratosSolicitadosPageModule' },
  { path: 'lista-contratos-vigentes', loadChildren: './lista-contratos-vigentes/lista-contratos-vigentes.module#ListaContratosVigentesPageModule' }




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
