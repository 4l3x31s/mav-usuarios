import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SesionService } from '../services/sesion.service';
import { environment } from 'src/environments/environment';
import { LoadingService } from '../services/util/loading.service';
import { NavController, Events } from '@ionic/angular';
import { AlertService } from '../services/util/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  formLogin: FormGroup;
  public user: string;
  public pass: string;


  constructor(
    public fb: FormBuilder,
    public sesionService: SesionService,
    public loadingService: LoadingService,
    public navController: NavController,
    public alertService: AlertService,
    public events: Events

  ) { }

  ngOnInit() {
    this.iniciaValidaciones();
    if(environment.isSesionPrueba){
      //datos prueba
      this.user='pmorales';
      this.pass='123456';
    }
    this.sesionService.getSesion()
      .then((conductora)=>{
        if(conductora){
          this.navController.navigateRoot('/home');
        }
      });
  }

  iniciaValidaciones() {
    this.formLogin = this.fb.group({
      vuser: ['', [
        Validators.required,
      ]],
      vpass: ['', [
        Validators.required,
      ]]
    });
  }
  get f() { return this.formLogin.controls; }

  ingresar() {
    this.loadingService.present()
      .then(() => {
        this.sesionService.login(this.user, this.pass)
          .subscribe(() => {
            console.log('login exito : ' + this.sesionService.clienteSesionPrueba.nombre);
            this.events.publish('user:login');
            this.navController.navigateRoot('/home');
            this.loadingService.dismiss();
          }, error => {
            console.log('error-login', error);
            if (error.message) {
              this.alertService.present('Error', error.message);
            } else {
              this.alertService.present('Error', 'Hubo un error al ingresar.');
            }
            this.loadingService.dismiss();
          });
      })
  }


  public irRegistrarCliente(){
    this.navController.navigateRoot('/detalle-cliente');
  }
}
