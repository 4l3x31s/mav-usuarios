import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MdlCliente } from '../modelo/mdlCliente';
import { ClienteService } from '../services/db/cliente.service';
import { LoadingService } from '../services/util/loading.service';
import { AlertService } from '../services/util/alert.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-detalle-cliente',
  templateUrl: './detalle-cliente.page.html',
  styleUrls: ['./detalle-cliente.page.scss'],
})
export class DetalleClientePage implements OnInit {

  frmCliente: FormGroup;
  public cliente: MdlCliente;

  constructor(
    public fb: FormBuilder,
    public clienteService: ClienteService,
    public loadingServices: LoadingService,
    public alertService: AlertService,
    public navController: NavController
    ) { }

  get f() { return this.frmCliente.controls; }

  ngOnInit() {
    this.iniciarValidaciones();
    this.cliente = this.clienteService.getClienteSesion();
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
      vtel: ['', [
        Validators.required,
        Validators.minLength(7),
        Validators.maxLength(7),
      ]],
      vcel: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(15),
      ]],
      vemail: ['', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(30),
        Validators.email,
      ]],
      vciudad: ['', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(30),
      ]],
      vpais: ['', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(30),
      ]],
    })
  }

  public grabar(){
    this.loadingServices.present();
      this.clienteService.crearCliente(this.cliente)
      .then(() => {
        this.loadingServices.dismiss();
        this.alertService.present('Info','Datos guardados correctamente.');
      })
      .catch( error => {
        this.loadingServices.dismiss();
        console.log(error);
        this.alertService.present('Error','Hubo un error al grabar los datos');
        this.navController.navigateRoot('/home');
      })
  }
}
