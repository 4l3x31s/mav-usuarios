import { TokenNotifService } from './../services/token-notif.service';
import { ClienteService } from './../services/db/cliente.service';
import { AuthService } from './../services/firebase/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SesionService } from '../services/sesion.service';
import { LoadingService } from '../services/util/loading.service';
import { NavController, Events, AlertController, ToastController } from '@ionic/angular';
import { AlertService } from '../services/util/alert.service';
import { environment } from '../../environments/environment';
import { MdlCliente } from '../modelo/mdlCliente';
declare var google;


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public user: string;
  public pass: string;
  public ciudad: string;
  public pais: string;
  public celular: number;
  public cliente: MdlCliente = new MdlCliente(null,null,null,null,null,null,null,null,null,null,null,null,null);
  constructor(
    public sesionService: SesionService,
    public loadingService: LoadingService,
    public navController: NavController,
    public alertService: AlertService,
    public events: Events,
    public authService: AuthService,
    public alertController: AlertController,
    public toastController: ToastController,
    public clienteService: ClienteService,
    public tokenService: TokenNotifService
  ) {
    navigator.geolocation.getCurrentPosition((resp) => {
      let myLatlng = { lat: resp.coords.latitude, lng: resp.coords.longitude};
      let geocoder = new google.maps.Geocoder();
      geocoder.geocode({'location': myLatlng}, (results, status) => {
          if (status === 'OK') {

            this.processLocation(results);
          }
        });
    }, (error) => {
    
    }, { enableHighAccuracy: true });
  }
  processLocation(location) {    
    if (location[1]) {
      for (var i = 0; i < location.length; i++) {
        if (location[i].types[0] === "locality") {
          this.ciudad = location[i].address_components[0].short_name;
          this.pais = location[i].address_components[3].long_name;  
        }
      }
    }   
  }
  ionViewDidEnter() {
    this.celAlert();
  }
  async celAlert() {
    const alert = await this.alertController.create({
      header: 'Ingrese su numero de celular!',
      inputs: [
        {
          name: 'txtCelular',
          type: 'number',
          placeholder: '63322333',
          label: 'Ingresa tu numero de celular'
        }
      ],
      buttons: [
        {
          text: 'Aceptar',
          handler: (data) => {
            
            console.log('Confirm Ok');
            if(data.txtCelular.length > 0) {
              
              this.celular = data.txtCelular;
              this.clienteService.getClientePorCel(this.celular)
              .subscribe(data => {
                console.log('datos obtenidos celular')
                console.log(data);
                if (data.length > 0) {
                  this.presentToast('El celular ' + this.celular + ' ya se encuentra registrado.');
                  this.celAlert();
                } else {
                  this.ingresar();
                }
              });
            } else {
              this.presentToast('Debe ingresar un numero de celular correcto');
              this.celAlert();
            }
          }
        }
      ]
    });

    await alert.present();
  }
  ngOnInit() {
    if(environment.isSesionPrueba) {
      //datos prueba
      this.user = '';
      this.pass = '';
    }
    this.loadingService.present()
      .then(()=>{
        this.sesionService.crearSesionBase()
        .then(() => {
          this.sesionService.getSesion()
            .subscribe((conductora)=>{
              if(conductora){
                this.navController.navigateRoot('/home');
              }
              this.loadingService.dismiss();
            },e => {
            
              this.loadingService.dismiss();
              this.alertService.present('Error', 'Error al obtener la sesion.');
            });
        })
        .catch(e=>{
          this.loadingService.dismiss();
          this.alertService.present('Error','Error al crear la BD de sesion')
        });
      });
    
  }

  ingresar() {
    this.loadingService.present()
      .then(() => {
        this.authService.doGoogleLogin()
          .then( res => {
            console.log(res);
            let email = res.user.email;
            let nombre = res.user.displayName;
            this.user = email;
            console.log('------------------------');
            this.sesionService.login(this.user)
            .subscribe((cliente) => {
              /*if (cliente.estado) {*/
                console.log('***********************');
                console.log(cliente);
                if(cliente){
                  this.events.publish('user:login');
                  this.navController.navigateRoot('/home');
                } else {
                  let mdlCliente: MdlCliente =
                    new MdlCliente(
                        null, nombre, null, null,
                        this.user, null, null, this.celular,
                        this.user, this.tokenService.get() ? this.tokenService.get() : null,
                        true, this.pais, this.ciudad);
                  this.clienteService.crearCliente(mdlCliente)
                  .then( (cliente) => {
                    this.cliente = cliente;
                    //this.loadingService.dismiss();
                    this.alertService.present('Info', 'Tus datos se registraron correctamente.');  // edita cliente
                    this.navController.navigateRoot('/home');
                  });
                }
              /*} else {
                this.alertService.present('Error',
                'Hubo un error al ingresar, el usuario no está activo, porfavor comuníquese con la administración de Mujeres al Volante.');
              }*/
              this.loadingService.dismiss();
            }, error => {
              console.log(error);
              if (error.message) {
                this.alertService.present('Información', error.message);
              } else {
                this.alertService.present('Error', 'Hubo un error al ingresar.');
              }
              this.loadingService.dismiss();
            });
            this.navController.navigateRoot('/home');
          }).catch(err => {
            console.log(err);
          })
        /*this.authService.doLogin(this.user, this.pass)
        .then( res => {
          this.sesionService.login(this.user)
          .subscribe((cliente) => {
            /*if (cliente.estado) {*/
              //this.events.publish('user:login');
              //this.navController.navigateRoot('/home');
            /*} else {
              this.alertService.present('Error',
              'Hubo un error al ingresar, el usuario no está activo, porfavor comuníquese con la administración de Mujeres al Volante.');
            }
            this.loadingService.dismiss();
          }, error => {
            if (error.message) {
              this.alertService.present('Información', error.message);
            } else {
              this.alertService.present('Error', 'Hubo un error al ingresar.');
            }
            this.loadingService.dismiss();
          });
        }, err => {
          if (err.message) {
            this.alertService.present('Información', 'Usuario o Contraseña inválidos.');
          } else {
            this.alertService.present('Error', 'Hubo un error al ingresar.');
          }
          this.loadingService.dismiss();
        });*/
      })

  }
  registrar() {
    this.navController.navigateRoot('/detalle-cliente');
  }
  async presentToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000
    });
    toast.present();
  }
  async presentAlertPrompt() {
    const alert = await this.alertController.create({
      header: 'Recuperación Contraseña',
      message: 'Ingrese su correo electrónico.',
      inputs: [
        {
          name: 'txtEmailPop',
          type: 'text',
          placeholder: 'ejemplo@ejemplo.com',
          label: 'Email'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
          }
        }, {
          text: 'Enviar',
          handler: (data) => {
            if (data.txtEmailPop.length > 0) {
              this.authService.resetPassword(data.txtEmailPop)
              .then( () => {
                this.presentToast('Se ha enviado el correo.');
              }, err => {
                this.presentToast('Hubo un error al enviar el correo.');
              })
            } else {
              this.presentToast('Debe ingresar un correo válido.');
            }
          }
        }
      ]
    });

    await alert.present();
  }
  enviarCorreo() {
    this.presentAlertPrompt();
  }
}
