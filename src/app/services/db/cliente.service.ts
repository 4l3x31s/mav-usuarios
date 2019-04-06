import { MdlCliente } from './../../modelo/mdlCliente';
import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  rootRef: firebase.database.Reference;
  constructor(public afDB: AngularFireDatabase) {
    this.rootRef = this.afDB.database.ref();
   }
   crearCliente(mdlCliente: MdlCliente): Promise<any> {
     if(!mdlCliente.id){
      mdlCliente.id = Date.now();
     }
    return this.afDB.database.ref('cliente/' + mdlCliente.id).set(mdlCliente);
  }

  getClienteSesion(): MdlCliente {
    return new MdlCliente(
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null);
  }

  getCliente(id: number): Observable<MdlCliente>{
    return this.afDB.object<MdlCliente>('cliente/'+id).valueChanges();
  }

  getClientePorUserPass(user: string, pass: string) : Observable<MdlCliente[]> {
    return new Observable<MdlCliente[]>(observer => {
      this.afDB.list<MdlCliente>('cliente/',
        ref => ref.orderByChild('user').equalTo(user)).valueChanges()
        .subscribe(cliente=>{
          console.log('service',cliente);
          if(cliente.length > 0 && pass == cliente[0].pass){
            observer.next(cliente);
          } else {
            observer.next();
          }
          observer.complete();
        });
    });
  }
}
