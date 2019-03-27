import { MdlCliente } from './../../modelo/mdlCliente';
import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  rootRef: firebase.database.Reference;
  constructor(public afDB: AngularFireDatabase) {
    this.rootRef = this.afDB.database.ref();
   }
   crearCliente(mdlCliente: MdlCliente): Promise<any> {
     if(!mdlCliente.id){
      mdlCliente.id = Date.now();
     }
    return this.afDB.database.ref('cliente/' + mdlCliente.id).set(mdlCliente);
  }

  getClienteSesion(): MdlCliente {
    return new MdlCliente(
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null);
  }

  getCliente(id: number) : Observable<MdlCliente>{
    return this.afDB.object<MdlCliente>('cliente/'+id).valueChanges();
  }
}
