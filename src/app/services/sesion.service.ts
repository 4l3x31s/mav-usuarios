import { Injectable } from '@angular/core';
import { SqliteService } from './sqlite.service';
import { MdlCliente } from '../modelo/mdlCliente';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ClienteService } from './db/cliente.service';
import { AlertController, NavController, Events } from '@ionic/angular';
import { LoadingService } from './util/loading.service';
import { AlertService } from './util/alert.service';


@Injectable({
  providedIn: 'root'
})
export class SesionService {

  clienteSesionPrueba: MdlCliente;
  constructor(
    public clienteService: ClienteService,
    public sqlite: SqliteService
  ) { }
  login(user: string) : Observable<MdlCliente> {
    return new Observable<MdlCliente>(observer => {
      this.clienteService.getClientePorUserPass(user)
        .subscribe(conductora=>{
          console.log(conductora);
          if(conductora){
            if(conductora[0].estado){
              if(environment.isSesionPrueba){
                this.clienteSesionPrueba = conductora[0];
                observer.next(this.clienteSesionPrueba);
                observer.complete();
              } else {
                this.sqlite.setclienteSesion(conductora[0])
                  .then(()=>{
                    observer.next(conductora[0]);
                    observer.complete();
                  })
                  .catch(e=>{
                    observer.error(e);
                    observer.complete();
                  });
              }
            } else {
              //observer.error({message:'Usuario no habilitado por el administrador'});
              observer.next(conductora[0]);
              observer.complete();
            }
            
          } else {
            observer.error({message:'Usuario y/o contraseña inválida'});
            observer.complete();
          }
        });
    });
  }

  getSesion() : Observable<MdlCliente>{
    return new Observable<MdlCliente>(observer => {
      if(environment.isSesionPrueba){
        observer.next(this.clienteSesionPrueba);
        observer.complete();
      } else {
        this.sqlite.getclienteSesion()
          .then(idConductora=>{
            this.clienteService.getCliente(idConductora)
              .subscribe(conductora => {
                observer.next(conductora);
                observer.complete();
              });
          });
      }
    });
  }

  crearSesionBase(): Promise<any> {
    if(environment.isSesionPrueba){
      return Promise.resolve()
    } else {
      return this.sqlite.crearBD();
    }
  }

  cerrarSesion(): Promise<any>{
    if(environment.isSesionPrueba){
      this.clienteSesionPrueba = undefined;
      return Promise.resolve()
    } else {
      return this.sqlite.removeClienteSesion();
    }
  }
}
