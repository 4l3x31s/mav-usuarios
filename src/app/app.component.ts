import { Component } from '@angular/core';

import { Platform, Events, NavController, AlertController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SesionService } from './services/sesion.service';
import { ClienteService } from './services/db/cliente.service';
import { MdlCliente } from './modelo/mdlCliente';
import { NavParamService } from './services/nav-param.service';
import { AlertService } from './services/util/alert.service';
import { LoadingService } from './services/util/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

  cliente: MdlCliente;

  public appPages = [
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
      title: 'Lista de Contratos Solicitados',
      url: '/lista-contratos-solicitados',
      icon: 'clipboard'
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
    public clienteService: ClienteService,
    public alertService: AlertService,
    public alertController: AlertController,
    public loadingService: LoadingService
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

  async irCerrarSesion(){
    const alert = await this.alertController.create({
      header: 'Confirmar',
      message: '¿Esta segur@ de cerrar su sesión?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            //console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Si',
          cssClass: 'primary',
          handler: () => {
            this.loadingService.present()
              .then(() => {
                this.sesionService.cerrarSesion()
                  .then(()=>{
                    this.events.publish('user:logout');
                    this.loadingService.dismiss();
                    this.navController.navigateRoot('/login');
                  })
                  .catch(e=>{
                    console.log(e);
                    this.alertService.present('Error','Error al cerrar la sesion');
                    this.loadingService.dismiss();
                  })
              });
          }
        }
      ]
    });

    await alert.present();
  }

  irDetalleCliente(){
    this.navParam.set({cliente:this.cliente})
    this.navController.navigateRoot('/detalle-cliente');
  }
}
