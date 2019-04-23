import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { MdlCarrera } from 'src/app/modelo/mdlCarrera';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarreraService {
  rootRef: firebase.database.Reference;
  constructor(public afDB: AngularFireDatabase) {
    this.rootRef = this.afDB.database.ref();
   }

   crearCarrera(mdlCarrera: MdlCarrera): Promise<any> {
    if(!mdlCarrera.id){
      mdlCarrera.id = Date.now();
    }
   return this.afDB.database.ref('carrera/' + mdlCarrera.id).set(mdlCarrera);
 }

 getCarreraSesion(): MdlCarrera {
  return new MdlCarrera(
    null, null, null, null, null,
    null, null, null, null, null,
    null, null, null, null, null,
    null, null, null, null, null,
    null);
  }

  getCarrerasPorCliente(idConductora: number): Observable<MdlCarrera[]> {
    /*return this.afDB.list<MdlCarrera>('carrera', 
      ref => ref.orderByChild('idConductora').equalTo(idConductora)).valueChanges();*/
    return this.afDB.list<MdlCarrera>('carrera').valueChanges();
  }

}
