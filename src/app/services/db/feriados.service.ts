import { MdlFeriado } from 'src/app/modelo/mdlFeriado';
import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { UtilService } from '../util/util.service';

@Injectable({
  providedIn: 'root'
})
export class FeriadosService {
  rootRef: firebase.database.Reference;
  constructor(
    public afDB: AngularFireDatabase,
    public utilService: UtilService) {
    this.rootRef = this.afDB.database.ref();
  }
  insertarFeriado(feriado: MdlFeriado): Promise<any> {
    if (!feriado.id) {
      feriado.id = Date.now();
    }
    return this.afDB.database.ref('feriado/' + feriado.id).set(this.utilService.serializar(feriado));
  }
  listaFeriados() {
    return this.afDB.list('feriado').valueChanges();
  }

}
