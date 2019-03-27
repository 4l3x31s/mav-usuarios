import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-usuario',
  templateUrl: './login-usuario.page.html',
  styleUrls: ['./login-usuario.page.scss'],
})
export class LoginUsuarioPage implements OnInit {
  frmLogin: FormGroup;
  public txtUser: string;
  public txtPass: string;

  constructor( public fb: FormBuilder) { }

  ngOnInit() {
    this.iniciarValidaciones();
  }

  public iniciarValidaciones(){
    this.frmLogin = this.fb.group({
      vUser: ['', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(50),
      ]],
      vPass: ['', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(50),
      ]],
    })
  }

  get f() { return this.frmLogin.controls; }

  public pruebasFunc(){
    console.log(this.txtUser);
  }
}
