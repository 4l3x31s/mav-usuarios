import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavParamService {
  public param: any;
  constructor() { }
  get () {
    return this.param;
  }
  set (param: any) {
    this.param = param;
  }
}
