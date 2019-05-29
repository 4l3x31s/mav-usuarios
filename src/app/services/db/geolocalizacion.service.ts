import { MdlGeoLocalizacion } from './../../modelo/mdlGeoLocalizacion';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { UtilService } from './../util/util.service';
@Injectable({
  providedIn: 'root'
})
export class GeolocalizacionService {
  rootRef: firebase.database.Reference;
  constructor(
    public afDB: AngularFireDatabase,
    public utilService: UtilService
  ) {
    this.rootRef = this.afDB.database.ref();
  }
  crearGeolocalizacion(mdlGeoLocalizacion: MdlGeoLocalizacion): Promise<any> {
    if (!mdlGeoLocalizacion.id) {
      mdlGeoLocalizacion.id = Date.now();
    }
   return this.afDB.database.ref('geolocations/' + mdlGeoLocalizacion.id).set(this.utilService.serializar(mdlGeoLocalizacion));
 }
 listarGeolocalizacion() {
  this.afDB.list('geolocations').snapshotChanges()
  return this.afDB.list('geolocations').valueChanges();
 }
 listarCambios() {
  return this.afDB.list('geolocations').valueChanges();
 }
}