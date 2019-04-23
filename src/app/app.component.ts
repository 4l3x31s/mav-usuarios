import { Component } from '@angular/core';

import { Platform, Events, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SesionService } from './services/sesion.service';
import { ClienteService } from './services/db/cliente.service';
import { MdlCliente } from './modelo/mdlCliente';
import { NavParamService } from './services/nav-param.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

  cliente: MdlCliente;

  public appPages = [
    {
      title: 'Perfil',
      url: '/detalle-cliente',
      icon: 'person'
    },
    {
      title: 'Carrera',
      url: '/home',
      icon: 'car'
    },
    {
      title: 'Calendario Carreras',
      url: '/calendario-carrera',
      icon: 'md-calendar'
    },
    {
      title: 'Contrato',
      url: '/detalle-contrato',
      icon: 'clipboard'
    },    
    {
      title: 'Salir',
      url: '/login',
      icon: 'exit'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public events: Events,
    public sesionService: SesionService,
    public navController: NavController,
    public navParam: NavParamService,
    public clienteService: ClienteService
  ) {
    this.initializeApp();
    events.subscribe('user:login', () => {
      this.loggedIn();
    });
    events.subscribe('user:logout', () => {
      this.loggedOut();
    });
  }

  public loggedIn() {
    console.log("logged in");
    this.sesionService.getSesion()
      .then(cliente=>{
        this.clienteService.getCliente(cliente.id)
          .subscribe( cliente => {
            this.cliente = cliente;
          });
      });
  }
  public loggedOut() {
    console.log("logged out");
    this.cliente = undefined;
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleLightContent();
      this.statusBar.backgroundColorByHexString('#c2185b');
      this.splashScreen.hide();
      this.sesionService.getSesion()
        .then(cliente => {
          if (cliente) {
            this.clienteService.getCliente(cliente.id)
            .subscribe( cliente => {
              this.cliente = cliente;
            });
          }
      });
    });
  }

  irPagina(pagina:any){
    this.navParam.set({cliente:this.cliente})
    this.navController.navigateRoot(pagina.url);
  }
}
