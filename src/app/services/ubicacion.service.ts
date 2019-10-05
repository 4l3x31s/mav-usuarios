import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UbicacionService {
  private pais: string;
  private ciudad: string;
  constructor() { }

  public getPais() {
    return this.pais;
  }
  public getCiudad() {
    return this.ciudad;
  }
  public setPais(pais: string) {
    this.pais = pais;
  }
  public setCiudad(ciudad: string) {
    this.ciudad = ciudad;
  }
}
