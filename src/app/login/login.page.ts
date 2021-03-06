import { ClienteService } from 'src/app/services/db/cliente.service';
import { AuthService } from './../services/firebase/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SesionService } from '../services/sesion.service';
import { LoadingService } from '../services/util/loading.service';
import { NavController, Events, AlertController, ToastController } from '@ionic/angular';
import { AlertService } from '../services/util/alert.service';
import { environment } from '../../environments/environment';
import { UbicacionService } from '../services/ubicacion.service';
import { TokenNotifService } from '../services/token-notif.service';
import { Platform } from '@ionic/angular';
declare var google;
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  form: FormGroup;
  public user: string;
  public pass: string;
  public ciudad: string;
  public pais: string;
  constructor(
    public fb: FormBuilder,
    public sesionService: SesionService,
    public loadingService: LoadingService,
    public navController: NavController,
    public alertService: AlertService,
    public events: Events,
    public authService: AuthService,
    public alertController: AlertController,
    public toastController: ToastController,
    public ubicacionService: UbicacionService,
    public tokenService: TokenNotifService,
    public clienteService: ClienteService,
    public platform: Platform,
  ) { }
  processLocation(location) {    
    if (location[1]) {
      for (let i = 0; i < location.length; i++) {
        if (location[i].types[0] === "locality") {
          this.ciudad = location[i].address_components[0].short_name;
          this.pais = location[i].address_components[3].long_name;
          this.ubicacionService.setCiudad(this.ciudad);
          this.ubicacionService.setPais(this.pais);
        }
      }
    }
  }
  ngOnInit() {
    this.iniciaValidaciones();
    this.platform.ready().then(() => {
      
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
      
      if(environment.isSesionPrueba){
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
                  if(!conductora.estado) {
                    this.navController.navigateRoot('/login');
                  }else {
                    this.navController.navigateRoot('/home');
                  }
                  
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
        })
        .catch(err => {
          console.log(err);
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
    });
  }
  iniciaValidaciones() {
    this.form = this.fb.group({
      vuser: ['', [
        Validators.required,
      ]],
      vpass: ['', [
        Validators.required,
      ]]
    });
  }
  get f(): any { return this.form.controls; }

  ingresar() {
    this.loadingService.present()
      .then(() => {
        this.authService.doLogin(this.user, this.pass)
        .then( res => {
          console.log("dologin");
          console.log(res);
          this.sesionService.login(this.user)
          .subscribe((cliente) => {
            /*if (cliente.estado) {*/
              console.log(cliente);
              cliente.ui = this.tokenService.get() ? this.tokenService.get() : null;
              console.log(cliente);
                if(cliente.ui!=null){
                  this.clienteService.crearCliente(cliente);
                }
              this.events.publish('user:login');
              this.navController.navigateRoot('/home');
            /*} else {
              this.alertService.present('Error',
              'Hubo un error al ingresar, el usuario no está activo, porfavor comuníquese con la administración de Mujeres al Volante.');
            }*/
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
        });
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
  outFocus() {
    this.user = this.user.trim();
    this.user = this.user.replace(' ', '');
  }
}