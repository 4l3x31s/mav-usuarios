import { MdlCliente } from './../../modelo/mdlCliente';
import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  rootRef: firebase.database.Reference;
  constructor(public afDB: AngularFireDatabase) {
    this.rootRef = this.afDB.database.ref();
   }
   crearCliente(mdlCliente: MdlCliente) {
    this.afDB.database.ref('/cliente' + mdlCliente.id).set(mdlCliente);
  }

}
