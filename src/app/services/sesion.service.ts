import { Injectable } from '@angular/core';
import { SqliteService } from './sqlite.service';
import { MdlCliente } from '../modelo/mdlCliente';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ClienteService } from './db/cliente.service';


@Injectable({
  providedIn: 'root'
})
export class SesionService {

  clienteSesionPrueba: MdlCliente;
  

  constructor(
    public sqlite: SqliteService,
    public clienteService: ClienteService
  ) { }

  getSesion(): Promise<MdlCliente> {
    if(environment.isSesionPrueba){
      return Promise.resolve(this.clienteSesionPrueba);
    } else {
      return this.sqlite.getclienteSesion();
    }
  }

  crearSesionBase(): Promise<any> {
    if(environment.isSesionPrueba){
      return Promise.resolve()
    } else {
      return this.sqlite.crearBD();
    }
  }

  public login(user: string, pass: string) : Observable<any> {
    return new Observable<boolean>(observer => {
      this.clienteService.getClientePorUserPass(user, pass)
        .subscribe(cliente=>{
          if(cliente){
            if(environment.isSesionPrueba){
              this.clienteSesionPrueba = cliente[0];
              this.clienteSesionPrueba.nombre += '(PRUEBA)';
              console.log('bienvenido: ' + this.clienteSesionPrueba.nombre);
            } else {
              this.sqlite.setclienteSesion(cliente[0]);
            }
            observer.next();
          } else {
            observer.error({message:'Usuario y/o contraseña inválida'});
          }
          observer.complete();
        });
    });
  }
}
