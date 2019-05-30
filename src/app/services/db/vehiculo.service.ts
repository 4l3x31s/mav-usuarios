import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { MdlVehiculo } from 'src/app/modelo/mdlVehiculo';
import { Observable } from 'rxjs';
import { UtilService } from '../util/util.service';


@Injectable({
  providedIn: 'root'
})
export class VehiculoService {
  
  rootRef: firebase.database.Reference;
  constructor(
    public afDB: AngularFireDatabase,
    public utilService: UtilService
  ) {
    this.rootRef = this.afDB.database.ref();
  }

  getVehiculoPorConductora(idConductora: number): Observable<MdlVehiculo[]> {
    return this.afDB.list<MdlVehiculo>('vehiculo/',
      ref => ref.orderByChild('idConductora').equalTo(idConductora)).valueChanges();
  }

  /**
   * Para revisar datos:
   * https://mav-db.firebaseio.com/vehiculo.json
   */
  grabarVehiculo(vehiculo: MdlVehiculo): Promise<MdlVehiculo> {
    if (!vehiculo.id) {
      vehiculo.id = Date.now();
    }
    return this.afDB.database.ref('vehiculo/' + vehiculo.id)
      .set(this.utilService.serializar(vehiculo))
        .then(()=>{
          return Promise.resolve(vehiculo);
        })
        .catch(e=>{
          return Promise.reject(e);
        });
  }
  
}
