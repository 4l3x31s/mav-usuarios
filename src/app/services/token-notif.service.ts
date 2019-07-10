import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenNotifService {
  private token: string;
  constructor() { }

  get() {
    return this.token;
  }
  set(token: string) {
    this.token = token;
  }
}
