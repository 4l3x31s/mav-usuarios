import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';


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
  { path: 'mapa', loadChildren: './comun/mapa/mapa.module#MapaPageModule' },
  { path: 'calendario', loadChildren: './comun/calendario/calendario.module#CalendarioPageModule' },
  { path: 'detalle-contrato', loadChildren: './detalle-contrato/detalle-contrato.module#DetalleContratoPageModule' },
  { path: 'calendario-carrera', loadChildren: './calendario-carrera/calendario-carrera.module#CalendarioCarreraPageModule' },
  { path: 'detalle-carrera', loadChildren: './comun/detalle-carrera/detalle-carrera.module#DetalleCarreraPageModule' },
  { path: 'lista-contratos-solicitados', loadChildren: './lista-contratos-solicitados/lista-contratos-solicitados.module#ListaContratosSolicitadosPageModule' },
  { path: 'lista-contratos-vigentes', loadChildren: './lista-contratos-vigentes/lista-contratos-vigentes.module#ListaContratosVigentesPageModule' },
  { path: 'map-carrera', loadChildren: './map-carrera/map-carrera.module#MapCarreraPageModule' },
  { path: 'carreras-aceptadas', loadChildren: './carreras-aceptadas/carreras-aceptadas.module#CarrerasAceptadasPageModule' },
  { path: 'detalle-conductora', loadChildren: './comun/detalle-conductora/detalle-conductora.module#DetalleConductoraPageModule' },
  { path: 'registro-carrera', loadChildren: './registro-carrera/registro-carrera.module#RegistroCarreraPageModule' },
  { path: 'calificar-carrera', loadChildren: './comun/calificar-carrera/calificar-carrera.module#CalificarCarreraPageModule' },
  { path: 'solicitar-contrato', loadChildren: './solicitar-contrato/solicitar-contrato.module#SolicitarContratoPageModule' },





];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[SocialSharing]
})
export class AppRoutingModule {}
