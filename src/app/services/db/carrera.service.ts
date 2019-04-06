import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { MdlCarrera } from 'src/app/modelo/mdlCarrera';

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
}
