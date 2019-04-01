import { Injectable } from '@angular/core';
import { SqliteService } from './sqlite.service';
import { MdlCliente } from '../modelo/mdlCliente';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class SesionService {

  clienteSesionPrueba: MdlCliente;

  constructor(
    public sqlite: SqliteService
  ) { }

  getSesion(): Promise<MdlCliente> {
    if(environment.isSesionPrueba){
      return Promise.resolve(this.clienteSesionPrueba);
    } else {
      return this.sqlite.getclienteSesion();
    }
  }
}
