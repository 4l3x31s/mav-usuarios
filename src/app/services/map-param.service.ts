import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MapParamService {
  private geoLoc: any;
  constructor() { }

  public set(geoloc: any){
    this.geoLoc = geoloc;
  }
  public get() {
    return this.geoLoc;
  }
}
