import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MdlCliente } from '../modelo/mdlCliente';
import { ClienteService } from '../services/db/cliente.service';
import { LoadingService } from '../services/util/loading.service';
import { AlertService } from '../services/util/alert.service';
import { NavController } from '@ionic/angular';
import { SesionService } from '../services/sesion.service';

@Component({
  selector: 'app-detalle-cliente',
  templateUrl: './detalle-cliente.page.html',
  styleUrls: ['./detalle-cliente.page.scss'],
})
export class DetalleClientePage implements OnInit {

  frmCliente: FormGroup;
  public cliente: MdlCliente;
  public titulo: string;

  constructor(
    public fb: FormBuilder,
    public clienteService: ClienteService,
    public loadingServices: LoadingService,
    public alertService: AlertService,
    public navController: NavController,
    public sesionService: SesionService,
    public loadingService: LoadingService
    ) { console.log('constructor');
    this.sesionService.crearSesionBase()
        .then(() => {
        this.sesionService.getSesion()
            .then((cliente) => {
            if (cliente) {
                this.cliente = cliente;
                this.titulo = 'Editar Perfil';
            } else {
              this.cliente = this.clienteService.getClienteSesion();
              this.titulo = 'Crear nueva cuenta';
            }
            });
        });
  }

  get f() { return this.frmCliente.controls; }

  ngOnInit() {
    console.log('ngOnInit')
    this.iniciarValidaciones();
    //this.cliente = this.clienteService.getClienteSesion();
    
  }

  public iniciarValidaciones(){
    this.frmCliente = this.fb.group({
      vnombre: ['', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(50),
      ]],
      vci: ['', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(15),
      ]],
      vdireccion: ['', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(100),
      ]],
      vuser: ['', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(30),
      ]],
      vpass: ['', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(30),
      ]],
      vconfirmPass: ['',
       Validators.required],
      vtel: ['', [
        Validators.required,
        Validators.minLength(7),
        Validators.maxLength(7),
        Validators.pattern(/^[0-9]/),
      ]],
      vcel: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(15),
        Validators.pattern(/^[0-9]/),
      ]],
      vemail: ['', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(30),
        Validators.email,
      ]],
      vciudad: ['', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(30),
      ]],
      vpais: ['', [
        Validators.required,
        Validators.minLength(7),
        Validators.maxLength(30),
      ]],
    }, {
      validator: this.mustMatch('vpass', 'vconfirmPass')
    })
  }

  mustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            // return if another validator has already found an error on the matchingControl
            return;
        }

        // set error on matchingControl if validation fails
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: 'Las contraseñas no coinciden' });
        } else {
            matchingControl.setErrors(null);
        }
    }
}

  public grabar(){
    this.loadingServices.present();
      this.clienteService.crearCliente(this.cliente)
      .then(() => {
        this.loadingServices.dismiss();
        this.alertService.present('Información','Datos guardados correctamente.');
        this.ingresar();
      })
      .catch( error => {
        this.loadingServices.dismiss();
        console.log(error);
        this.alertService.present('Error','Hubo un error al grabar los datos');
        this.navController.navigateRoot('/home');
      })
  }

  public ingresar() {
    this.loadingService.present()
      .then(() => {
        this.sesionService.login(this.cliente.user, this.cliente.pass)
          .subscribe(() => {
            console.log('login exito : ' + this.sesionService.clienteSesionPrueba.nombre);
            this.navController.navigateRoot('/home');
            this.loadingService.dismiss();
            console.log('cliente::::: '+this.cliente.user);
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


}
