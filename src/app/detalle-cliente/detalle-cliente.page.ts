import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MdlCliente } from '../modelo/mdlCliente';

@Component({
  selector: 'app-detalle-cliente',
  templateUrl: './detalle-cliente.page.html',
  styleUrls: ['./detalle-cliente.page.scss'],
})
export class DetalleClientePage implements OnInit {

  frmCliente: FormGroup;
  public cliente: MdlCliente;

  constructor(public fb: FormBuilder) { }
  get f() { return this.frmCliente.controls; }

  ngOnInit() {
    this.iniciarValidaciones();
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
      ]],     
    })
  }

}
