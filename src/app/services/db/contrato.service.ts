import { MdlContrato } from './../../modelo/mdlContrato';
import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { UtilService } from '../util/util.service';

@Injectable({
  providedIn: 'root'
})
export class ContratoService {

  rootRef: firebase.database.Reference;
  constructor(
    public afDB: AngularFireDatabase,
    public utilService: UtilService
    ) {
    this.rootRef = this.afDB.database.ref();
  }
  insertarContrato(contrato: MdlContrato): Promise<any> {
    if (!contrato.id) {
      contrato.id = Date.now();
      contrato.estado = 0;
    }
    return this.afDB.database.ref('contrato/' + contrato.id).set(this.utilService.serializar(contrato));
  }
  listaContratosPorUsuario(idUsuario: number) {
    return this.afDB.list('contrato', ref =>
      ref.orderByChild('idUsuario').equalTo(idUsuario)).valueChanges();
  }

  listaContratosSolicitados(idUsuario: number) {
    return this.afDB.list('contrato', ref =>
      ref.orderByChild('idUsuario').equalTo(idUsuario)).valueChanges();
  }

  listaContratos() {
    return this.afDB.list('contrato').valueChanges();
  }
}
