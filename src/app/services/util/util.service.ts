import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  /**
   * quita los campos undefinded de un objeto.
   * Utilizado en un objeto antes de actualizarlo en firebase
   * @param objeto Objeto a serailizar
   */
  serializar(objeto: any): any {
    return JSON.parse(JSON.stringify(objeto));
  }
}
