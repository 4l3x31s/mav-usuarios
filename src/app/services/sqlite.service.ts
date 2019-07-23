import { Injectable } from '@angular/core';
import { SQLiteObject, SQLite } from '@ionic-native/sqlite/ngx';
import { MdlCliente } from '../modelo/mdlCliente';
import { TokenNotifService } from './token-notif.service';

@Injectable({
  providedIn: 'root'
})
export class SqliteService {

  db: SQLiteObject;
  constructor(
    private sqlite: SQLite,
    private tokenService: TokenNotifService
  ) { }

  getDB(): Promise<SQLiteObject> {
    if (this.db == undefined) {
      return this.sqlite.create({
        name: 'datamav.db',
        location: 'default'
      })
        .then((db: SQLiteObject) => {
          this.db = db;
          return Promise.resolve(this.db);
        })
        .catch(e => {
          return Promise.reject(e);
        });
    } else {
      return Promise.resolve(this.db);
    }
  }

  setclienteSesion(cliente: MdlCliente): Promise<any> {
    return this.getDB()
      .then((db: SQLiteObject) => {
        try{
          let udpates=[];
          udpates.push([
            "delete from cliente_sesion"
          ]);
          udpates.push([
            "insert into cliente_sesion values(?)",
            [cliente.id]
          ]);
          return db.sqlBatch(udpates)
              .then(() => {
                return Promise.resolve();
              })
              .catch(e => {
                return Promise.reject(e);
              });
        } catch (error) {
          return Promise.reject(error);
        }
      });
  }

  getclienteSesion(): Promise<number> {
    return this.getDB()
      .then((db: SQLiteObject) => {
        return db.executeSql('select * from cliente_sesion', [])
          .then((data) => {
            let idCliente: number;
            if (data.rows.length > 0) {
              idCliente = data.rows.item(0).id;
            }
            return Promise.resolve(idCliente);
          })
          .catch(e => {
            return Promise.reject(e);
          });
      });
  }

  crearBD(): Promise<any> {
    return this.getDB()
      .then((db: SQLiteObject) => {
        let ddl=[];
        ddl.push([
          "create table IF NOT EXISTS cliente_sesion (id)", []
        ]);
        return db.sqlBatch(ddl)
          .then(() => {
            return Promise.resolve();
          })
          .catch(e => {
            return Promise.reject(e);
          });
      });
  }

  removeClienteSesion(): Promise<any> {
    return this.getDB()
      .then((db: SQLiteObject)=>{
        return db.executeSql('delete from conductora_sesion');
      })
      .catch(e=>{
        return Promise.reject(e);
      });
  }
  
}

