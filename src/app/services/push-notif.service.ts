import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PushNotifService {
  private headers: HttpHeaders;
  private URL = 'https://fcm.googleapis.com/fcm/send';
  private valor: any;
  private key: string = 'AIzaSyCyt9cl7CNOyBURIZNig8AURr-gSf7LxTA';
  constructor(private http: HttpClient) { }


  public postGlobal<Object>(object: any, url: string, token: string) {
    this.valor = JSON.stringify(object);
    if(token) {
      return this.http.post<Object>(this.URL + url, this.valor, {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/json')
          .set('Authorization', 'key=' + this.key)
      });
    } else {
      return this.http.post<Object>(this.URL + url, this.valor, {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/json')
      });
    }
  }
}
